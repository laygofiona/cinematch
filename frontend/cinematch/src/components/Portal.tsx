import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useLockBodyScroll } from "@uidotdev/usehooks";

const Portal = () => {
  // Locks scrolling in the body
  useLockBodyScroll();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar: 15% of viewport height */}
      <div className="flex-none ">
        <NavBar />
      </div>
      <div className="flex flex-col justify-center h-screen bg-black">
        <main className="h-[100vh] bg-[#2a1e3f]">
          <Outlet />
        </main>
      </div>

      {/* Footer: 10% of viewport height */}
      <div className="flex-none ">
        <Footer />
      </div>
    </div>
  );
};

export default Portal;
