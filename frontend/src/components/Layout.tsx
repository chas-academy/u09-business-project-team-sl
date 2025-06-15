import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col items-center bg-[url('/background.png')] bg-cover bg-center min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />

      <main className="w-full flex-1 p-20 md:p-16 px-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
