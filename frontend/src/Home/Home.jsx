import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="home-content">
        <h1 className="title">Welcome to CodeTracker</h1>
        <p className="description">Track your coding progress and stay ahead with upcoming contests.</p>
      </div>
    </motion.div>
  );
}
