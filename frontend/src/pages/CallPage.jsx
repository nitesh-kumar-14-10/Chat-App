import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();
  const navigate = useNavigate();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="card w-full max-w-5xl shadow-xl bg-base-200">
        <div className="card-body p-4 sm:p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Live Video Call</h2>

          {client && call ? (
            <div className="w-full h-[75vh] rounded-lg overflow-hidden">
              <StreamVideo client={client}>
                <StreamCall call={call}>
                  <CallContent />
                </StreamCall>
              </StreamVideo>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-center text-base-content">
              <p>Could not initialize call. Please refresh or try again later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  return (
    <StreamTheme>
      <div className="w-full h-full flex flex-col">
        <div className="flex-grow">
          <SpeakerLayout />
        </div>
        <div className="border-t border-base-300 pt-2">
          <CallControls />
        </div>
      </div>
    </StreamTheme>
  );
};

export default CallPage;
