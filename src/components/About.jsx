import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
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
    <section id="about" className="max-w-4xl mx-auto px-4 py-16">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          variants={itemVariants} 
          className="text-3xl font-semibold mb-8 text-center"
        >
          About Me
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-gray-300 mb-6 leading-relaxed"
        >
          I'm a passionate web developer with hands-on experience in the MERN stack, EJS templating, and MySQL.
          I also understand version control with Git and deployment on modern hosting platforms.
          I love solving real-world problems through code.
        </motion.p>
        
        <motion.p 
          variants={itemVariants}
          className="text-gray-300 mb-6 leading-relaxed"
        >
          Over the years, I have built full-stack applications incorporating React, Node.js, Express, MongoDB, and MySQL. 
          I prioritize clean, maintainable code and responsive UI using Tailwind CSS and Bootstrap. 
          I'm comfortable with RESTful APIs, Git version control, and modern deployment pipelines.
        </motion.p>
        
        <motion.p 
          variants={itemVariants}
          className="text-gray-300 leading-relaxed"
        >
          My mission is to deliver scalable and user-friendly solutions that help businesses grow, 
          improve efficiency, and delight users.
        </motion.p>
      </motion.div>
    </section>
  );
}
