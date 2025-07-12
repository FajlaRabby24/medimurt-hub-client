import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-349px)]">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
