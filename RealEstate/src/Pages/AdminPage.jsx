// AdminPage.js
import React from "react";
import { SlideForm } from "./SlideForm";
import {ProjectForm} from "./ProjectForm"; // Adjust path if needed

const AdminPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel</h1>
      
      {/* Slide Form Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Add New Slide</h2>
        <SlideForm />
      </section>

      {/* Project Form Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
        <ProjectForm />
      </section>
    </div>
  );
};

export default AdminPage;
