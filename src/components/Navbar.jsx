import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Clients", href: "#clients" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" }
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`flex justify-between items-center px-6 py-4 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-lg" : "bg-gray-800"
      }`}
    >
      <motion.h1 
        variants={linkVariants}
        className="text-xl font-bold text-white"
      >
        Developer Portfolio
      </motion.h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-sm md:text-base text-white">
        {navLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            variants={linkVariants}
            whileHover={{ scale: 1.1, color: "#60a5fa" }}
            whileTap={{ scale: 0.95 }}
            className="hover:text-blue-400 transition-colors"
          >
            {link.name}
          </motion.a>
        ))}
      </div>

      {/* Mobile Hamburger Icon */}
      <motion.div 
        variants={linkVariants}
        className="md:hidden text-white text-2xl cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-gray-800 flex flex-col items-center py-4 md:hidden text-white space-y-4 shadow-lg"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, color: "#60a5fa" }}
                className="hover:text-blue-400 transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}