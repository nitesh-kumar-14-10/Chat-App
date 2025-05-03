import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";
import { FiVideo, FiMoreVertical } from "react-icons/fi";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();
        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });
      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Chat client={chatClient}>
        <Channel channel={channel} LoadingIndicator={ChatLoader}>
          <div className="flex flex-col h-full">
            {/* Custom Channel Header */}
            <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-600 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden shadow-md">
                  {channel.state.members[targetUserId]?.user?.image && (
                    <img
                      src={channel.state.members[targetUserId].user.image}
                      alt={channel.state.members[targetUserId].user.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-200">
                    {channel.state.members[targetUserId]?.user?.name || "User"}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {channel.state.members[targetUserId]?.user?.online
                      ? "Online"
                      : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleVideoCall}
                  className="p-2 rounded-full hover:bg-gray-700 text-gray-200 hover:text-blue-500 transition-colors shadow-md"
                  aria-label="Start video call"
                >
                  <FiVideo className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-gray-700 text-gray-200 transition-colors shadow-md"
                  aria-label="More options"
                >
                  <FiMoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 overflow-hidden bg-gray-900">
              <Window hideOnThread>
                <MessageList
                  disableDateSeparator={false}
                  messageActions={["react", "reply", "edit", "delete"]}
                  additionalMessageInputProps={{
                    emojiPicker: true,
                  }}
                />
                <MessageInput
                  focus
                  additionalTextareaProps={{
                    placeholder: "Type your message...",
                    rows: 1,
                  }}
                  className="bg-gray-800 text-white border-t border-gray-600 focus:ring-2 focus:ring-blue-600 shadow-md"
                />
              </Window>
              <Thread />
            </div>
          </div>
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
