import React from "react";
import Header from "./Components/Header"
import { Home, Overview, Achievements,  Contact, Projects } from './Components/Sections'

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Projects/>
      <Overview />
      <Achievements />
      <Contact />
    </div>
  );
}

export default App;
