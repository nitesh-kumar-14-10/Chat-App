import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen bg-[#0A1128] text-white flex">
      {showSidebar && <Sidebar />}

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 bg-[#0A1128]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
