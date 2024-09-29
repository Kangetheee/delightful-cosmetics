import React, { useState } from 'react';
import { MdCategory, MdContacts, MdHomeFilled, MdShop2 } from 'react-icons/md';

export function NavBar({ containerStyles }) {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className={`${containerStyles} flex justify-center space-x-6 md:space-x-10`}>
      <a
        href="#home"
        onClick={() => handleTabClick("home")}
        className={`flexCenter gap-x-1 ${activeTab === "home" ? "active-link" : ""}`}
      >
        <MdHomeFilled />
        Home
      </a>
      <a
        href="#shop"
        onClick={() => handleTabClick("shop")}
        className={`flexCenter gap-x-1 ${activeTab === "shop" ? "active-link" : ""}`}
      >
        <MdCategory />
        Shop
      </a>
      <a
        href="#app"
        onClick={() => handleTabClick("app")}
        className={`flexCenter gap-x-1 ${activeTab === "app" ? "active-link" : ""}`}
      >
        <MdShop2 />
        Get App
      </a>
      <a
        href="#contact"
        onClick={() => handleTabClick("contact")}
        className={`flexCenter gap-x-1 ${activeTab === "contact" ? "active-link" : ""}`}
      >
        <MdContacts />
        Contact
      </a>
    </nav>
  );
}
