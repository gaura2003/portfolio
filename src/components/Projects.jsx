import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects({ repos }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="projects" className="max-w-5xl mx-auto px-4 py-16">
      <div ref={ref}>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-12 text-center"
        >
          Projects
        </motion.h2>
        
        {repos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-40"
          >
            <div className="animate-pulse text-gray-400">Loading projects...</div>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid gap-8 md:grid-cols-2"
          >
            {repos.map((repo) => (
              <motion.div
                key={repo.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-400">{repo.name}</h3>
                  <p className="mb-4 text-gray-300 h-16 overflow-hidden">
                    {repo.description || "No description provided."}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 text-sm text-gray-400 mb-4">
                    {repo.language && (
                      <span className="bg-gray-700 px-2 py-1 rounded">{repo.language}</span>
                    )}
                    <span className="bg-gray-700 px-2 py-1 rounded">⭐ {repo.stargazers_count}</span>
                    <span className="bg-gray-700 px-2 py-1 rounded">🍴 {repo.forks_count}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                    >
                      <FaGithub /> GitHub
                    </a>
                    
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-400 hover:text-green-300 inline-flex items-center gap-1"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a 
            href={`https://github.com/${repos[0]?.owner?.login || 'gaura2003'}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full transition-colors"
          >
            <FaGithub /> View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}