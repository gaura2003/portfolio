import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const certifications = [
    {
      name: "Web Developer",
      issuer: "PMKKY",
      year: 2024,
      logo: "https://cdn.worldvectorlogo.com/logos/amazon-web-services-1.svg",
      link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    },
    {
      name: "Basketball Coordinator",
      issuer: "Malwa Institute of Science and Technology, Indore",
      year: 2025,
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      link: "https://www.meta.com/certificates/react-developer",
    },
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
    <section id="certifications" className="max-w-5xl mx-auto px-4 py-16">
      <div ref={ref}>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-12 text-center"
        >
          Certifications & Awards
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          {certifications.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
              }}
              className="bg-gray-800 p-6 rounded-lg flex items-center gap-4 transition-all duration-300"
            >
              <div className="bg-gray-700 p-3 rounded-lg">
                <img src={cert.logo} alt={`${cert.name} logo`} className="w-16 h-16 object-contain" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-blue-400">{cert.name}</h3>
                <p className="text-gray-300">{cert.issuer}</p>
                <p className="text-gray-400 text-sm">{cert.year}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}