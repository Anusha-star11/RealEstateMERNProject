import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import { Home, Overview, Achievements, Contact, Projects } from './Components/Sections';
import Footer from "./Components/Footer";
import ProjectDetails from "./Pages/ProjectDetails"; // Import the ProjectDetails component
import { SlideForm } from "./Pages/SlideForm.jsx"; // Import SlideForm component

function App() {
  return (
    <Router basename="/RealEstateApp">
      <div className="App">
        {/* Header is shown on all pages */}
        <Header />
        <Routes>
          {/* Main page with all sections */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <Projects />
                <Overview />
                <Achievements />
                <Contact />
              </>
            }
          />

          {/* Project Details page */}
          <Route path="/project/:id" element={<ProjectDetails />} />

          {/* Admin SlideForm page */}
          <Route path="/admin" element={<SlideForm />} />
        </Routes>
        {/* Footer is shown on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
