import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaNodeJs, FaReact, FaDatabase, FaGitAlt,
  FaHtml5, FaCss3Alt, FaJs, FaBootstrap
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiMysql, SiTailwindcss } from "react-icons/si";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const skills = [
    { icon: <SiMongodb />, name: "MongoDB", color: "text-green-600 hover:text-green-500" },
    { icon: <SiExpress />, name: "Express.js", color: "text-gray-300 hover:text-gray-100" },
    { icon: <FaReact />, name: "React", color: "text-cyan-400 hover:text-cyan-300" },
    { icon: <FaNodeJs />, name: "Node.js", color: "text-lime-500 hover:text-lime-400" },
    { icon: <SiMysql />, name: "MySQL", color: "text-blue-600 hover:text-blue-500" },
    { icon: <FaGitAlt />, name: "Git", color: "text-orange-500 hover:text-orange-400" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", color: "text-sky-400 hover:text-sky-300" },
    { icon: <FaHtml5 />, name: "HTML5", color: "text-orange-600 hover:text-orange-500" },
    { icon: <FaCss3Alt />, name: "CSS3", color: "text-blue-500 hover:text-blue-400" },
    { icon: <FaJs />, name: "JavaScript", color: "text-yellow-400 hover:text-yellow-300" },
    { icon: <FaBootstrap />, name: "Bootstrap", color: "text-purple-600 hover:text-purple-500" },
    { icon: <FaDatabase />, name: "Database", color: "text-rose-500 hover:text-rose-400" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section id="skills" className="bg-gray-800 py-16 px-4">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-center mb-12 text-white"
        >
          Skills & Technologies
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-center text-4xl"
        >
          {skills.map(({ icon, name, color }, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { type: "spring", stiffness: 300 },
              }}
              className={`flex flex-col items-center transition duration-300 ${color} cursor-pointer`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: i * 0.05 + 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {icon}
              </motion.div>
              <span className="text-base text-white mt-2">{name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-gray-400 mt-12 max-w-2xl mx-auto"
        >
          Experienced with tools and technologies like MongoDB, Express.js, React, Node.js, MySQL, Git,
          Tailwind CSS, HTML5, CSS3, JavaScript, Bootstrap, and relational/non-relational databases.
        </motion.p>
      </div>
    </section>
  );
}
