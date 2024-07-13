import React, { useRef } from 'react'
import { Createuplogo } from '../assets'
import { useScroll, motion, useTransform } from 'framer-motion';

const Header = ({containerM}) => {

  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    target: "#menutarget",
    container: containerM
  });
  
  const opacity = useTransform(
    scrollYProgress,
    [0.4, 0.44],
    [0,  1]
  )
  

  return (
    <motion.div className='mt-8 ml-8 fixed flex flex-col w-[310px] pr-16 z-20'>
        <div className='text-white font-Poppins text-[19px] font-bold flex justify-start items-center'>
            <img src={Createuplogo} className='invert scale-75 mr-3'/>
            CreateUP
        </div>
        <motion.div style={{opacity}} className='mt-[20px] w-full h-[30px] rounded-full bg-gradient-to-t from-[rgba(31,31,31,0.5)] to-[rgba(0,0,0,0.5)] backdrop-blur-[2px] border-b-2 border-white'>

        </motion.div>
    </motion.div>
  )
}

export default Header