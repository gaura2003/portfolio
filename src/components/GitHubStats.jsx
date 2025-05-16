import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function GitHubStats({ username }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [stats, setStats] = useState({ stars: 0, followers: 0, public_repos: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (res.ok) {
          const data = await res.json();
          setStats({
            stars: data.public_gists, // or sum of stars from repos if you want (complex)
            followers: data.followers,
            public_repos: data.public_repos,
          });
        }
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [username]);

  const statItems = [
    { label: "Followers", value: stats.followers, icon: "👥" },
    { label: "Repositories", value: stats.public_repos, icon: "📁" },
    { label: "Gists", value: stats.stars, icon: "⭐" },
  ];

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="social-proof" className="max-w-4xl mx-auto py-16 px-4 text-center">
      <div ref={ref}>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-12"
        >
          GitHub Stats
        </motion.h2>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-pulse w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-wrap justify-center gap-8"
          >
            {statItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                className="bg-gray-800 p-6 rounded-lg shadow-lg w-40"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  {item.value.toLocaleString()}
                </div>
                <div className="text-gray-400">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8"
        >
          <a 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
          >
            View Full GitHub Profile
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}