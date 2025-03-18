import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  // Inline styles
  const styles = {
    homeContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      backgroundColor: "#1e1e1e", // Black background
    },
    title: {
      fontSize: "3.5rem",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "20px",
    },
    description: {
      fontSize: "1.5rem",
      color: "#ddd",
      lineHeight: "1.6",
    },
    codeBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      zIndex: 1,
    },
    codeSpan: (i) => ({
      position: "absolute",
      top: "-10px",
      left: `${Math.random() * 100}vw`,
      color: "rgb(14, 255, 14)",
      fontSize: "2rem",
      fontFamily: "monospace",
      animation: `matrix-fall ${Math.random() * 3 + 2}s linear infinite`,
    }),
  };

  return (
    <motion.div style={styles.homeContainer}>
      {/* Background Graphics */}
      <div style={styles.codeBackground}>
        {[...Array(30)].map((_, i) => (
          <span key={i} style={styles.codeSpan(i)}>{"</>"}</span>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      >
      <div style={{ marginTop: "-200px" }}>
        <h1 className="title" style={{ fontSize: "3.5rem", fontWeight: "bold", color: "#fff", marginBottom: "20px" }}>
          Welcome to CodeTracker
        </h1>
        <p className="description" style={{ fontSize: "1.5rem", color: "#fff", lineHeight: "1.6" }}>
          Code smarter, track better, and never miss a contest!        </p>
      </div>
      </motion.div>

      {/* Inject CSS Animation */}
      <style>
        {`
          @keyframes matrix-fall {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
        `}
      </style>
    </motion.div>
  );
}
