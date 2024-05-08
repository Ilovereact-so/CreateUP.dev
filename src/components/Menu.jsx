import React, { useState } from 'react'
import Header from './Header'
import { useScroll, useTransform, motion } from 'framer-motion'

const Menu = () => {
  localStorage.setItem("getting_started","open")

  const Menu = [
    {
      "title" : "Getting started",
      "option" : ["Introduction", "Overview"],
    },
    {
      "title" : "Nigga started",
      "option" : ["Ntroduction", "Nigerview"]
    }
  ]

  const { scrollYProgress} = useScroll({
    target: "#startTarget",
    offset: ["start end", "end start"],
  });

  const opacity= useTransform(
      scrollYProgress,
      [0.44, 0.55],   //    [0.64, 0.65],[0,  1]
      [0,  1]
  );
  const openT = useTransform(
    scrollYProgress,
      [0.5, 0.57],   //    [0.64, 0.65],[0,  1]
      [0,  200]
  )
  const paddingLeft = useTransform(
    scrollYProgress,
      [0.76, 0.88],   //    [0.64, 0.65],[0,  1]
      [0,  70]
  )
  const paddingRight = useTransform(
    scrollYProgress,
      [0.76, 0.88],   //    [0.64, 0.65],[0,  1]
      [0,  70]
  )

  const OptionCard = ({index,item})=>{
    const [isMotiv, setMotiv] = useState(false)
    const stan = localStorage.getItem("getting_started")
    const handleclick = ()=>{
      //localStorage.setItem("getting_started","close")
      setMotiv(!isMotiv)
    }
    return(
      <ul key={index} className='ml-4 mt-10 px-12 w-max flex flex-col'>
        <motion.p style={{opacity}} onClick={()=> handleclick()} className='font-bold mb-4 cursor-pointer'>{item.title}</motion.p>
        <motion.div style={{maxHeight:openT}} className={`w-auto overflow-hidden ease-in-out duration-300 h-auto ${
            isMotiv === true ? "h-auto max-h-[200px]" : "max-h-0"
          }`}>
          {item.option.map((item,index)=>(
              <li key={index} className='text-[17px] mb-2 ml-2'>{item}</li>
          ))}
        </motion.div>
      </ul>
    )
  }

  return (
    <motion.div style={{paddingLeft, paddingRight}} className='text-white font-Poppins text-[19px] h-[100vh] bg-[#090b10dc] fixed top-0 left-0 z-20'> {/**border-solid border-white border-[2px] */}
        <Header/>
        {Menu.map((item, index)=>(
          <OptionCard item={item} index={index}/>
        ))}
    </motion.div>
  )
}

export default Menu