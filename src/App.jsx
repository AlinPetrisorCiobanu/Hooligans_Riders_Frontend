import React from "react";
import { Body } from "./pages/Body/Body";
import { Header } from "./common/Header/Header";
import { Footer } from "./common/Footer/Footer";
import { useLocation } from "react-router-dom";
import "./App.scss";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <Body />
      ) : (
        <>
          <Header />
          <Body />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
