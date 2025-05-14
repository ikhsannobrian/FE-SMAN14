import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-info text-base-content p-4 rounded text-white">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - BK SMAN 14 BEKASI</p>
      </aside>
    </footer>
  );
};

export default Footer;
