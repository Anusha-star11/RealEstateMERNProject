import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import { Home, Overview, Achievements, Contact, Projects } from './Components/Sections';
import Footer from "./Components/Footer";
import ProjectDetails from "./Pages/ProjectDetails"; // Import the ProjectDetails component
import AdminPage  from "./Pages/AdminPage.jsx"; 
import EditSlide from "./Pages/EditSlide.jsx";// Import SlideForm component
import SlideForm from "./Pages/SlideForm.jsx";
import ProjectForm from "./Pages/ProjectForm.jsx";
import EditProject from "./Pages/EditProject.jsx";

function App() {
  return (
    <Router>
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

          {/* Admin Slide management page */}
          <Route path="/admin" element={<AdminPage />} />
          
          {/* Route to Add a new Slide */}
          <Route path="/add-slide" element={<SlideForm />} />

          {/* Route to Edit an existing Slide */}
          <Route path="/edit-slide/:id" element={<SlideForm />} />

          {/* Route to view and manage all slides (EditSlide page) */}
          <Route 
            path="/edit" 
            element={
              <>
                <EditSlide />
                <EditProject projectId="your_project_id_here" /> {/* Replace with actual project ID if needed */}
              </>
            } 
          />
        </Routes>
        {/* Footer is shown on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;