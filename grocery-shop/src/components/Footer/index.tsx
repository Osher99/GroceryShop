import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-3 px-6 text-center text-sm">
      © {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;