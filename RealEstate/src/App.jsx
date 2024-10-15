import React from "react";
import Header from "./Components/Header"
import { Home, Overview, Achievements,  Contact, Projects } from './Components/Sections'
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Projects/>
      <Overview />
      <Achievements />
      <Contact />
      <Footer/>
    </div>
  );
}

export default App;
