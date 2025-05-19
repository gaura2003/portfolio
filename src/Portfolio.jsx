import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

// Import components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Clients from "./components/Clients";
import Testimonials from "./components/Testimonials";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GitHubStats from "./components/GitHubStats";
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;

export default function Portfolio() {
  const [repos, setRepos] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = "gaura2003";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();
        setUserData(userData);

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=6&sort=updated`);
        if (!reposResponse.ok) throw new Error("Failed to fetch repos");
        const reposData = await reposResponse.json();
        if (Array.isArray(reposData)) setRepos(reposData);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-900 text-white transition-colors duration-500 ease-in-out relative">
      <Navbar />
      
      <AnimatePresence>
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-screen"
          >
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero userData={userData} />
            <About />
            <Skills />
            <Projects repos={repos} />
            <Clients />
            <GitHubStats username={username} />
            <Testimonials />
            <Certifications />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

<div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
  <a
    href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
    title="Chat on WhatsApp"
  >
    <FaWhatsapp className="text-xl" />
  </a>
  <a
    href={`tel:${phoneNumber}`}
    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
    title="Call Me"
  >
    <FaPhoneAlt className="text-xl" />
  </a>
</div>

    </div>
  );
}