import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Clients() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const clients = [
    {
      name: "E-commerce Startup",
      description: "Developed a full-featured e-commerce website with product management, payment gateway integration, and admin/user dashboards.",
      icon: "🛒"
    },
    {
      name: "Gym Chain Owner",
      description: "Built a gym membership and management system with detailed owner analytics and user visit tracking.",
      icon: "💪"
    },
    {
      name: "Local Pandit Service",
      description: "Created an online booking platform for pandits with support for offline and online pooja services.",
      icon: "🙏"
    }
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="clients" className="bg-gray-800 py-16 px-4">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-center mb-12"
        >
          Clients
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
              }}
              className="bg-gray-700 rounded-lg p-6 shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{client.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">{client.name}</h3>
              <p className="text-gray-300">{client.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
