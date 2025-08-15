// src/components/MainSection.jsx
import React, { useState, useEffect } from "react";
import "./main-section.css";
import { useLocation } from "react-router-dom";
export default function MainSection({ children }) {
  const [fadeClass, setFadeClass] = useState("");
  const location = useLocation(); // detectează schimbarea rutei

  useEffect(() => {
    setFadeClass(""); // scoate animația
    const timer = setTimeout(() => {
      setFadeClass("fade-in"); // repornește animația
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]); // se declanșează la orice schimbare de URL, inclusiv reroute pe aceeași pagină

  return (
    <main className={`main-section ${fadeClass}`}>
      {children}
    </main>
  );
}