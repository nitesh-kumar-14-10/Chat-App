import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-[#0A1128] border-r border-black hidden lg:flex flex-col h-screen sticky top-0 text-[#F5F5F5]">
      <div className="p-5 border-b border-black">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-[#00A8E8] to-[#1C77C3] tracking-wider">
            BrainVerse
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case text-[#F5F5F5] ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-white opacity-80" />
          <span>Home</span>
        </Link>

        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case text-[#F5F5F5] ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 text-white opacity-80" />
          <span>Friends</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case text-[#F5F5F5] ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-white opacity-80" />
          <span>Notifications</span>
        </Link>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 border-t border-black mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-[#00A8E8] ring-offset-2 ring-offset-[#0A1128]">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-white">{authUser?.fullName}</p>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="size-2 rounded-full bg-green-400 inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
