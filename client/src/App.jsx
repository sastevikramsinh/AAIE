import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import BackToTopButton from "./components/BackToTopButton.jsx";
import { EASINGS } from "./utils/animationPreferences.js";

export default function App() {
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: EASINGS.gentle }}
    >
      <CustomCursor />
      <BackToTopButton />
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 1 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.02 },
          },
        }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0 } }}>
          <Navbar />
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.main
            key={window.location.pathname}
            className="pt-16 md:pt-[72px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASINGS.gentle }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

