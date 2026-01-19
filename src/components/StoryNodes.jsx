import React from "react";
import { motion } from "framer-motion";

// Import your images
import Img1 from "../assets/d1.png";
import Img2 from "../assets/d2.png";
import Img3 from "../assets/d3.png";

const storyData = [
  {
    title: "The Beginning",
    text: "Vybrant Care Services was born from a vision to transform home care, bringing together professional expertise and genuine compassion to provide personalised support that truly improves lives.",
    image: Img1,
  },
  {
    title: "Building Trust",
    text: "We realised excellent care goes beyond basic support. It’s about empowering people to live life on their own terms, in the comfort and familiarity of their own homes, with dignity and independence.",
    image: Img2,
  },
  {
    title: "Expanding Horizons",
    text: "Our journey is shaped by countless moments of making a real difference, one life at a time, as we continue to grow and bring compassionate care to more people and homes.",
    image: Img3,
  },
];

export default function StoryCardsSection() {
  return (
    <section className="w-full rounded-2xl bg-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-pink-600 mb-4">
          Our Journey
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          From humble beginnings to becoming a trusted name in care, our story reflects dedication,
          compassion, and the pursuit of excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {storyData.map((story, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold text-pink-600 mb-3">
                {story.title}
              </h3>
              <p className="text-gray-700">{story.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
