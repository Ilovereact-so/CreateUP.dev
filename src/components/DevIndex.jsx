import React, { useEffect, useRef, useState } from 'react'
import { motion,  useAnimation, animate, useScroll, useTransform } from 'framer-motion'
import $ from 'jquery'
import Hero from './Hero';
import Section3D from './Section3D';
import Header from './Header';
import Overview from './Overview';
import Menu from './Menu';
import MenuOptions from './MenuOptions';


const DevIndex = ({element}) => {
  
  const { scrollYProgress} = useScroll({
    target: "#startTarget",
    offset: ["start end", "end start"],
});

const opacity= useTransform(
    scrollYProgress,
    [0.4, 0.5],   //    [0.64, 0.65],[0,  1]
    [0,  1]
);
  if(element < 1){
    return (
      <div id='GT' className='bg-[#090909] w-full h-auto relative flex flex-col '>
        <Hero/> 
        <Section3D/>
        <motion.div style={{opacity}} className='generalbg flex w-full h-auto relative niger'>
          <Menu elements={element}/>
          
          <div className='w-full'>  
            <MenuOptions elemets={element}/>
          </div>
        </motion.div>
  
      </div>
    )
  }else{
    return (
      <div id='GT' className='bg-[#090909] w-full min-h-[100vh] h-auto relative flex flex-col '>
        <motion.div className='generalbg flex w-full h-auto relative'>
          <Menu elements={element}/>
          <div className='w-full min-h-[100vh] ml-[310px]'>  
            <MenuOptions elemets={element}/>
          </div>
        </motion.div>
      </div>
    )
  }
  
}

export default DevIndex