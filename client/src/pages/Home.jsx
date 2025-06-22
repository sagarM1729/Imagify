import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import Header from '../components/Header';
import Steps from '../components/Steps';
import Description from '../components/Description';
import Testimonial from '../components/Testimonial';
import Generatebtn from '../components/Generatebtn';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <Steps />
      <Description />
      <Testimonial />
      <motion.div 
        onClick={() => navigate('/result')} 
        className="cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Generatebtn />
      </motion.div>
    </motion.div>
  )
}

export default Home