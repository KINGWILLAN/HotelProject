import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import { createContext, useState } from "react";
import ServicePage from "./pages/ServicePage";
import "react-toastify/dist/ReactToastify.css";
import Service from "./pages/service/Service";
import CreateService from "./pages/service/CreateService";
import NotFound from "./pages/NotFound";

export const AppContext = createContext();

function App() {
  const [current, setCurrent] = useState("");
  const [toggleDate, setToggleDate] = useState(false);
  const [toggleGuest, setToggleGuest] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  function handleOpenAuthModal() {
    setOpenAuthModal((cur) => !cur);
  }

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  return (
    <AppContext.Provider
      value={{
        current,
        setCurrent,
        toggleDate,
        setToggleDate,
        toggleGuest,
        setToggleGuest,
        guests,
        setGuests,
        openAuthModal,
        handleOpenAuthModal,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/services/:serviceId" element={<ServicePage />} />
            <Route path="/service" element={<Service />} />
            <Route path="/service/create" element={<CreateService />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
