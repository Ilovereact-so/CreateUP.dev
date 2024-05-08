import React, { useEffect, useRef, useState } from 'react'
import { motion,  animate, useScroll, useTransform } from 'framer-motion'
import $ from 'jquery'

const Hero = () => {
    const targetRef = useRef(null)
    const [isUseMouse, SetUseMouse] = useState(true)
    useEffect(()=>{
        targetRef.current.style.setProperty("--color",'rgb(255 42 0)')

        const updateMousePosition = (event)=>{
        if(!targetRef.current) return;
        const { clientX, clientY } = event;
        targetRef.current.style.setProperty("--x", `${clientX}px`);
        targetRef.current.style.setProperty("--y", `${clientY}px`);
        }

        if(isUseMouse){
        window.addEventListener("mousemove", updateMousePosition);
        }else{
        window.removeEventListener("mousemove", updateMousePosition);
        }

        return () => {
        window.removeEventListener("mousemove", updateMousePosition);
        };
    },[isUseMouse])

    const colorvariation = (e)=>{
        if(e == "over"){
        //targetRef.current.style.setProperty("--color",'#fff')
        animate(targetRef.current, {"--color":'#fff'}, {duration:1, type:"spring"})

        }else{
        //targetRef.current.style.setProperty("--color",'#ff6a00')
        animate(targetRef.current, {"--color":'rgb(255 42 0)'}, {duration:1, type:"spring"})
        //{ color: localpallete[3].color}, {duration: 2, type: "spring"}
        }
        console.log("nn")
    }
    const UXContorlMouse = () =>{
        SetUseMouse(false)
        const y = window.innerHeight
        animate(targetRef.current, {"--y":`${y}px`}, {duration:1, type:"tween",ease:"circIn"})  
    }

    const header = useRef(null)
    const min = 0.1;
    const max = 0.8;
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    return (

    <motion.section
    ref={targetRef}
    style={{opacity}}
    className="relative mb-[8rem] h-screen py-16 ease-in-out duration-300 text-white before:pointer-events-none before:fixed before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_var(--color)_0%,_transparent_100%)] before:opacity-100"
    >
    <motion.div style={{scale}} className='fixed top-0 w-full h-[100vh] flex font-Poppins text-white mt-[20vh] items-center z-10 flex-col origin-top'>
        <p className='text-[40px] font-bold'>Developer Room</p>
        <p>Prezentacja wlaściwości stron</p>
        <div id='scrollBTN' onMouseOverCapture={()=>colorvariation("over")} onMouseLeave={()=>colorvariation("leave")} onClick={()=>UXContorlMouse()} className='p-4 bg-white cursor-pointer text-black text-[16px] font-bold rounded-full mt-5 duration-300 ease-out relative overflow-hidden' >
            <p>Scroll</p>
            <i className="gg-arrow-down absolute top-0 left-[50%] translate-x-[-50%]"/>
        </div>
    </motion.div>
    </motion.section>
    

  )
}

export default Hero