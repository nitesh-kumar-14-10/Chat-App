import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-[#0A1128] border-b border-black sticky top-0 z-30 h-16 flex items-center text-[#F5F5F5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-[#00A8E8] to-[#1C77C3] tracking-wider">
                  BrainVerse
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-white opacity-80" />
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full ring ring-[#00A8E8] ring-offset-2 ring-offset-[#0A1128]">
              <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
            </div>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-white opacity-80" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
