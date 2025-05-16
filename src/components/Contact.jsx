import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const [state, handleSubmit] = useForm("xldbzlop");

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="contact" className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-12 text-center"
        >
          Get In Touch
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl mx-auto"
        >
          {state.succeeded ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-800 text-green-100 p-6 rounded text-center"
            >
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p>Thanks for reaching out. I'll get back to you soon.</p>
            </motion.div>
          ) : (
            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none transition-all duration-300"
                  whileFocus="focus"
                  variants={inputVariants}
                  required
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none transition-all duration-300"
                  whileFocus="focus"
                  variants={inputVariants}
                  required
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <motion.textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none transition-all duration-300"
                  whileFocus="focus"
                  variants={inputVariants}
                  required
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>

              <motion.button
                type="submit"
                disabled={state.submitting}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow transition w-full flex justify-center items-center ${state.submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.97 }}
                variants={itemVariants}
              >
                {state.submitting ? (
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {state.submitting ? "Sending..." : "Send Message"}
              </motion.button>
              
              <ValidationError errors={state.errors} className="text-red-500 text-center mt-2" />
            </motion.form>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12 text-gray-400"
        >
          <p>Prefer to reach out directly?</p>
          <a href="mailto:gauravprajapat2305@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
            gauravprajapat2305@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
