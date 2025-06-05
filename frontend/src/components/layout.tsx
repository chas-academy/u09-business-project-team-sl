import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col items-center bg-[url('/background.png')] bg-cover bg-center min-h-screen">
      <Navbar isLoggedIn={true} />

      <main className="w-full flex-1 p-20 md:p-16 px-4">
        <Outlet />
      </main>

      {/* Footer here */}
    </div>
  );
};

export default Layout;
