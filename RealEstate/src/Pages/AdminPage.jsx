// AdminPage.js
import React from "react";
import { SlideForm } from "./SlideForm";
import { ProjectForm } from "./ProjectForm"; // Adjust path if needed

const AdminPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-indigo-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
          Admin Panel
        </h1>

        {/* Slide Form Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-700 border-b pb-2 mb-6">
            Add New Slide
          </h2>
          <div className="p-6 bg-indigo-50 rounded-lg shadow-inner">
            <SlideForm />
          </div>
        </section>

        {/* Project Form Section */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-700 border-b pb-2 mb-6">
            Add New Project
          </h2>
          <div className="p-6 bg-indigo-50 rounded-lg shadow-inner">
            <ProjectForm />
          </div>
        </section>
      </div>
    </div>
  );
};



export default AdminPage;