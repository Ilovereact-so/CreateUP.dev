import React, { useEffect, useRef } from 'react'
import { Model } from '../3D/Scene';
import { useScroll, useTransform, motion } from 'framer-motion';
import { LayoutCamera, MotionCanvas } from 'framer-motion-3d';
import { extend } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three'

const Section3D = () => {

    useMemo(() => extend(THREE), []);

    const targetRef = useRef(null)
    const { scrollYProgress} = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });
    
    const scale = useTransform(
        scrollYProgress,
        [0, 0.4, 0.75, 1],
        [1, 1.2, 1.1, 1]
      );

    const modelRotation = useTransform(
        scrollYProgress,
        [0, 0.2, 0.3],
        [0,  0.4, 0.6]
    );
    const chairRotation = useTransform(
        scrollYProgress,
        [0.1, 0.3],
        [Math.PI / 2, 3.2]
    );
    const cameraScale = useTransform(
        scrollYProgress,
        [0, 0.4, 0.6],
        [0,  0.4, 0.6]
    );
    const modelPositionX= useTransform(
        scrollYProgress,
        [0, 0.1, 0.5],
        [0,  0, -7.4]
    );
    const modelPositionY= useTransform(
        scrollYProgress,
        [0, 0.1, 0.5],
        [0,  0, 0.68]
    );
    const modelPositionZ= useTransform(
        scrollYProgress,
        [0, 0.1, 0.5],
        [0,  0, 5.4]
    );
    const textOpacity= useTransform(
        scrollYProgress,
        [0, 0.15, 0.22, 0.4],
        [0, 0,  1, 0]
    );
    const textPositionL= useTransform(
        scrollYProgress,
        [0, 0.2, 0.4],
        ["25%",  "25%", "0%"]
    );


  return (
    <div ref={targetRef} id='startTarget' className='h-[200vh]'>
        <motion.div style={{scale, translateY: -500}} className="h-[100vh] top-[500px] sticky w-[100vw] flex justify-center origin-left">
            <MotionCanvas>
                <Model modelRotation={modelRotation} chairRotation={chairRotation} modelX={modelPositionX} modelY={modelPositionY} modelZ={modelPositionZ}/>
                <LayoutCamera name="Camera001" makeDefault={true} far={1000} near={0.1} fov={22.895} position={[-6.949, 2.004, 4.145]} rotation={[-0.237, -0.987, -0.189]} />
            </MotionCanvas>
            <motion.div style={{opacity:textOpacity, left:textPositionL}} className='font-Poppins text-[13px] text-white absolute top-[25%] left-[25%] flex '>
                <p className='mr-2 font-bold text-[15px]'>*</p>
                <p>
                    <span className='font-bold text-[15px]'>Rzeczywista kontrola obiektów 3D</span> <br/>
                    Framer Motion 3D | threejs
                </p> 
            </motion.div>
        </motion.div>
    </div>
  )
}

export default Section3D