import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/gaurav-prajapat", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/gauravkumar07", label: "LinkedIn" },
    { icon: <FaEnvelope />, url: "mailto:gauravprajapat2305@gmail.com", label: "Email" }
  ];

  return (
    <footer className="bg-gray-900 py-10 px-4 border-t border-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <h3 className="text-xl font-bold text-white">Gaurav Prajapat</h3>
            <p className="text-gray-400">Full-Stack Web Developer</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-6 text-2xl"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                whileHover={{ scale: 1.2, color: "#60a5fa" }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm"
        >
          <p>© {currentYear} Gaurav Prajapat. All rights reserved.</p>
          <p className="mt-2">
            Built with React, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}