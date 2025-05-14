import React from "react";

const DashboardView = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          {/* Konten dashboard */}
          <h1 className="text-2xl font-bold">Selamat Datang di Dashboard</h1>
        </main>
      </div>
    </div>
  );
};

export default DashboardView;
