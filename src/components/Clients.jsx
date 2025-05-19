import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Clients() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const clients = [
    {
      name: "Nationwide Gym Access Platform",
      client: "As enterprises",
      description:
        "Built a gym platform where users can access multiple gyms across India with a single membership. Users select gyms based on their plan, with check-ins, membership tracking, and gym analytics for owners.",
      icon: "🏋️",
      url: "https://featuresgym.com" 
    },
    {
      name: "Modern E-commerce Store",
      client: "Azhar Sheikh",
      description:
        "Developed a professional e-commerce platform with product management, user cart, online payments, admin dashboard, and real-time inventory updates.",
      icon: "🛍️",
      url: "https://profitmarts.com" 
    },
    {
      name: "ShubhPooja Booking Portal",
      client: "Kratik Sharma",
      description:
        "An online platform to book Pandits for online and offline pooja and havan services, with schedule management, multilingual support, and detailed Pandit profiles.",
      icon: "🕉️",
      url: "https://shubhpooja.vercel.app/" 
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
          className="text-3xl font-semibold text-center mb-12 text-white"
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
            <motion.a
              key={index}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
              }}
              className="bg-gray-700 rounded-lg p-6 shadow-lg transition-all duration-300 block"
            >
              <div className="text-4xl mb-4">{client.icon}</div>
              <h3 className="text-xl font-bold mb-1 text-blue-400">
                {client.name}
              </h3>
              <p className="text-sm italic text-gray-400 mb-2">
                Client: {client.client}
              </p>
              <p className="text-gray-300">{client.description}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
