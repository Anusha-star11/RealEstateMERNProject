import React from "react";
import Header from "./Components/Header"
import { Home, Overview, Highlights, Amenities, Contact } from './Components/Sections'

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Overview />
      <Highlights />
      <Amenities />
      <Contact />
    </div>
  );
}

export default App;
