import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Portfolio() {
  const [repos, setRepos] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = "gaura2003";

  // Fetch GitHub user info
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
    <div className="min-h-screen bg-gray-900 text-white transition-colors duration-500 ease-in-out">
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
    </div>
  );
}
