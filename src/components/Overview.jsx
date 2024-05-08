import React, { useRef } from 'react'
import { arrowV, codeOverview01, codeOverview02, codeOverview03 } from '../assets'
import { useScroll, useTransform, motion } from 'framer-motion';

const Overview = () => {

  const target = useRef(null)
  const { scrollYProgress} = useScroll({
    target: target,
    offset: ["start end", "end start"],
  });

  const x= useTransform(
      scrollYProgress,
      [0.3, 0.45, 0.5],  
      ["30%",  "-2%", "20%"]
  );
  const x2= useTransform(
    scrollYProgress,
    [0.3, 0.45, 0.5],  
    ["-30%",  "2%", "-20%"]
  );
  const opacity= useTransform(
    scrollYProgress,
    [0.4, 0.46, 0.6, 0.7],   
    [0.2,  1, 1, 0.6]
  );
  const top = useTransform(
    scrollYProgress,
    [0.6, 0.74],   
    [64,  -500]
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [0.64, 0.74],  
    [0,  1]
  );
  const maxHeight = useTransform(
    scrollYProgress, (pos)=>{
      return pos >= 0.7 ? 200 : 0
    }
  )
  const opacity5= useTransform(
    scrollYProgress,
    [0.83, 0.88],  
    [0,  1]
  );

  const opacity6= useTransform(
    scrollYProgress,
    [0.89, 0.96],  
    [0,  1]
  );
  
  return (
    <div ref={target} className='w-full h-[200vh] flex flex-col p-8 pl-[300px] relative top-[-120vh]'>
      <div className='relative z-10'>
        <div id='overview' className='flex h-auto min-h-[300vh] w-full'>
          <motion.div style={{x}} id='codebox' className='w-[40vw] h-[80vh] bg-[rgba(15,17,26,0.7)] rounded-[40px] border-white border-[1px] sticky top-24'>
            <img src={codeOverview03}/>
          </motion.div>
          <motion.div style={{x:x2, opacity, top}} id='codebox2' className='w-[40vw] h-[80vh] bg-[#0F111A] rounded-[40px] opacity-70 border-white border-[1px] sticky top-16 flex flex-col'>
            <img src={codeOverview03}/>
            <motion.div style={{opacity:opacity2}} className='font-Poppins text-white flex flex-col w-full items-end relative mt-6'>
              <p className='font-bold text-[55px]'>Nowe Perspektywy</p>
              <p className='text-[25px]'>na strony internetowe</p>
              <motion.div style={{maxHeight}} className="pt-8 tracking-[1.5px] ease-in-out duration-[1s] h-auto  overflow-hidden">
                <p className='font-bold text-[21px]'>Dowiesz sie tutaj:</p>
                <ul className='font-Poppins text-[15px] flex'>
                  <ul className='flex flex-col m-4'>
                    <li className='mb-2'>jak działamy z klientami</li>
                    <li className='mb-2'>kim jesteśmy</li>
                    <li className='mb-2'>co potrafimy</li>
                  </ul>
                  <ul className='flex flex-col m-4'>
                    <li className='mb-2'>jak radzimy sobie z problemami</li>
                    <li>pokażemy ci ramy naszych usług</li>
                  </ul>
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
      </div>
      <div className='generalbg h-[120vh] w-[100vw] left-0 absolute top-[0] z-0'> {/**top section */}
      </div>
      <motion.div style={{opacity:opacity5}} className='fixed top-0 left-0 bg-[#00000093] w-full h-[100vh] z-[11] flex justify-center items-center'>
        <motion.div id='overviewlight' style={{opacity: opacity6}} className='mt-24 flex justify-center items-center'>
          <div className=' h-[60px] w-[60px] overflow-hidden scale-150'>
            <img src={arrowV} className='invert rotate-90 w-[60px] h-[60px] translate-x-[-30px]' />
          </div>
          <div className='font-Poppins text-[20px] text-white'><span className='font-bold text-[35px]'>Skorzystaj z menu nawigacyjnego </span> <br/> by wybrać to czego szukasz</div>    
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Overview