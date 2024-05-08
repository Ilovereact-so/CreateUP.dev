import React from 'react'
import { Createuplogo } from '../assets'
import { useScroll, motion, useTransform } from 'framer-motion';

const Header = () => {



  return (
    <motion.div className='mt-8 ml-8 mb-24'>
        <div className='text-white font-Poppins text-[19px] font-bold flex justify-start items-center'>
            <img src={Createuplogo} className='invert scale-75 mr-3'/>
            CreateUP
        </div>
    </motion.div>
  )
}

export default Header