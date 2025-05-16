import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useForm, ValidationError } from '@formspree/react';

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Formspree form for submitting testimonials
  const [formState, handleSubmit] = useForm("xvgalqdp"); // Using the form ID you provided

  // Fetch testimonials from Formspree
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // First, load the default testimonials
        const defaultTestimonials = [
          {
            quote: "Gaurav delivered our e-commerce platform on time with excellent quality. The site is user-friendly and looks great on all devices.",
            author: "Azhr Sheikh",
            title: "CEO of Profitmarts Inc.",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5
          },
          {
            quote: "The gym membership system Gaurav built streamlined our business operations and increased customer satisfaction.",
            author: "Azhr Sheikh",
            title: "Gym Owner",
            avatar: "https://randomuser.me/api/portraits/men/41.jpg",
            rating: 5
          },
          {
            quote: "Professional, responsive, and very knowledgeable. Highly recommended for full-stack projects.",
            author: "Kratik Sharma",
            title: "Pandit Booking Service Founder",
            avatar: "https://randomuser.me/api/portraits/men/55.jpg",
            rating: 5
          }
        ];
        
        // Try to fetch submissions from Formspree
        try {
          const response = await fetch('https://formspree.io/forms/xvgalqdp/submissions', {
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            // Process the submissions and add them to testimonials
            const formspreeTestimonials = data.submissions.map(submission => {
              const formData = submission.data;
              return {
                quote: formData.testimonial || "Great work!",
                author: formData.name || "Anonymous",
                title: formData.company || "Client",
                avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 60)}.jpg`,
                rating: parseInt(formData.rating) || 5
              };
            });
            
            // Combine default and submitted testimonials
            setTestimonials([...defaultTestimonials, ...formspreeTestimonials]);
          } else {
            // If API fetch fails, just use the default testimonials
            setTestimonials(defaultTestimonials);
          }
        } catch (error) {
          console.error("Error fetching testimonials:", error);
          setTestimonials(defaultTestimonials);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);

  // Handle form submission success
  const handleFormSuccess = useCallback(() => {
    if (formState.succeeded) {
      // Get the form values
      const { name, company, testimonial, rating } = formState.values || {};
      
      // Create new testimonial object
      const newTestimonial = {
        quote: testimonial || "Great work!",
        author: name || "Anonymous",
        title: company || "Client",
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 60)}.jpg`,
        rating: parseInt(rating) || 5
      };
      
      // Add the new testimonial to the list
      setTestimonials(prev => [...prev, newTestimonial]);
      setShowForm(false);
    }
  }, [formState.succeeded, formState.values]);

  // Call the handler when form state changes
  useEffect(() => {
    handleFormSuccess();
  }, [handleFormSuccess]);

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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-600"}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="max-w-4xl mx-auto py-16 px-4">
      <div ref={ref}>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-12 text-center"
        >
          Testimonials
        </motion.h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="overflow-hidden">
              <motion.div 
                animate={{ x: `-${activeIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="flex"
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <motion.div 
                      variants={itemVariants}
                      className="bg-gray-700 p-6 rounded-lg shadow-lg"
                    >
                      <div className="flex items-center mb-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-blue-400">{testimonial.author}</h4>
                          <p className="text-sm text-gray-400">{testimonial.title}</p>
                        </div>
                      </div>
                      <p className="italic text-gray-300 mb-4">"{testimonial.quote}"</p>
                      <div className="flex justify-center mt-6">
                        {renderStars(testimonial.rating)}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeIndex === index ? "bg-blue-500" : "bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex justify-between mt-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                className="bg-gray-700 p-2 rounded-full"
                disabled={activeIndex === 0}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveIndex(Math.min(testimonials.length - 1, activeIndex + 1))}
                className="bg-gray-700 p-2 rounded-full"
                disabled={activeIndex === testimonials.length - 1}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
        
        {/* Add testimonial button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          {!showForm ? (
            <motion.button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Share Your Experience
            </motion.button>
          ) : formState.succeeded ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-800 text-green-100 p-4 rounded max-w-md mx-auto"
            >
              <p>Thank you for your testimonial!</p>
              <button
                onClick={() => {
                  // This will reset the form state by forcing a re-mount of the component
                  setShowForm(false);
                }}
                className="mt-3 bg-green-700 hover:bg-green-600 text-white px-4 py-1 rounded text-sm"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8"
            >
              <h3 className="text-xl font-semibold mb-4 text-center">Share Your Experience</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-white mb-1">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                  />
                  <ValidationError prefix="Name" field="name" errors={formState.errors} />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-white mb-1">Company/Position</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="testimonial" className="block text-white mb-1">Your Testimonial</label>
                  <textarea
                    id="testimonial"
                    name="testimonial"
                    rows="4"
                    required
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                  />
                  <ValidationError prefix="Testimonial" field="testimonial" errors={formState.errors} />
                </div>
                
                <div>
                  <label htmlFor="rating" className="block text-white mb-1">Rating</label>
                  <select
                    id="rating"
                    name="rating"
                    required
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                  >
                    <option value="5">5 Stars - Excellent</option>
                    <option value="4">4 Stars - Very Good</option>
                    <option value="3">3 Stars - Good</option>
                    <option value="2">2 Stars - Fair</option>
                    <option value="1">1 Star - Poor</option>
                  </select>
                  <ValidationError prefix="Rating" field="rating" errors={formState.errors} />
                </div>
                
                <div className="flex space-x-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                                        disabled={formState.submitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
                  >
                    {formState.submitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

