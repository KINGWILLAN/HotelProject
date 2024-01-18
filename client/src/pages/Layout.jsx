import { useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { AppContext } from "../App";
export default function Layout() {
  const { setCurrent } = useContext(AppContext);
  return (
    <div
      onClickCapture={() => {
        setCurrent("");
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
