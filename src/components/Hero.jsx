import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";

export default function Hero({ userData }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="text-center py-20 px-4 bg-gradient-to-br from-gray-800 to-gray-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center mb-6"
        >
          {userData && (
            <>
              <motion.img
                src={userData.avatar_url}
                alt={`${userData.login} avatar`}
                className="w-24 h-24 rounded-full mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20 
                }}
              />
              <motion.h3 variants={itemVariants} className="text-2xl font-bold">
                {userData.name || userData.login}
              </motion.h3>
              <motion.p variants={itemVariants}>@{userData.login}</motion.p>
              <motion.div 
                variants={itemVariants}
                className="flex gap-4 text-gray-300 text-sm mt-2"
              >
                <span>Public Repos: {userData.public_repos}</span>
                <span>Followers: {userData.followers}</span>
              </motion.div>
            </>
          )}
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Hi, I'm a Full-Stack Web Developer
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-300"
        >
          I build modern, responsive full-stack applications using the MERN stack, MySQL, Tailwind CSS, and more.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex justify-center gap-6 items-center"
        >
          <motion.a
            href="https://github.com/gaura2003"
            target="_blank"
            rel="noreferrer"
            className="text-2xl hover:text-gray-300 transition-colors"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub />
          </motion.a>
          
          <motion.a
            href="https://linkedin.com/in/gauravkumar07"
            target="_blank"
            rel="noreferrer"
            className="text-2xl hover:text-blue-500 transition-colors"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin />
          </motion.a>
          
          <motion.a
            href=""
            target="_blank"
            rel="noreferrer"
            download
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full inline-flex items-center gap-2 text-sm shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload /> Resume
          </motion.a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12"
        >
          <motion.a
            href="#about"
            className="inline-block animate-bounce"
            whileHover={{ scale: 1.2 }}
          >
            <svg 
              className="w-8 h-8 text-blue-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}