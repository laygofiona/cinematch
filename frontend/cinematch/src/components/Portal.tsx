import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Portal = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {/* Outlet renders whatever route is active */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Portal;
