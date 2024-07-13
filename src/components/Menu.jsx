import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import { useScroll, useTransform, motion } from 'framer-motion'
import $ from 'jquery'
import { tab } from '@testing-library/user-event/dist/tab'
import { useNavigate } from 'react-router-dom'

const Menu = ({elements}) => {
  const Menu = [
    {
      "title" : "Na początek",
      "option" : [{"option":"Wprowadzenie", "id":0,"link":"/"},{"option":"Przegląd", "id":1,"link":"/review"}]
    },
    {
      "title" : "System CMS",
      "option" : [{"option":"Oprawa graficzna","id":2,"link":"/niger"}, {"option":"Bazy danych","id":3,"link":"/"}, {"option":"Dostęp i zabezpieczenia","id":4,"link":"/"}]
    },
    {
      "title" : "Urzytkownicy",
      "option" : [{"option":"Bazy danych","id":5,"link":"/"}, {"option":"Dedykowany pulpit","id":6,"link":"/"}, {"option":"Dostęp i zabezpieczenia","id":7,"link":"/"}]
    },
    {
      "title" : "Animacje",
      "option" : [{"option":"Gif i CSS | JS ","id":8,"link":"/"},{"option": "Render 3D","id":9,"link":"/"}]
    },
    {
      "title" : "Development",
      "option" : [{"option":"O Mnie","id":10,"link":"/"},{"option": "Portfolio","id":11,"link":"/"}]
    },
    {
      "title" : "Tłumaczenie",
      "option" : [{"option":"Wielo-językowość","id":12,"link":"/"},{"option": "Elementy tłumaczenia","id":13,"link":"/"}]
    },
    {
      "title" : "Czas Rzeczywisty",
      "option" : [{"option":"Eventy JS","id":14,"link":"/"},{"option": "Dostęp do cookie","id":15,"link":"/"}, {"option": "Automatyczny podział","id":16,"link":"/"}]
    },
    {
      "title" : "Responsywność",
      "option" : [{"option":"Automatyczne","id":17,"link":"/"},{"option": "Dopasowanie","id":18,"link":"/"}, {"option": "Urządzenia Mobilne","id":19,"link":"/"}]
    },
    {
      "title" : "Komunikacja",
      "option" : [{"option":"Kontakt","id":20,"link":"/"},{"option": "Pełny wgląd","id":21,"link":"/"}]
    }

  ]
 
  const [target, setTarget] = useState("#startTarget")
  useEffect(()=>{
    elements === 0 ? setTarget('') : setTarget("#startTarget")
  })
  const { scrollYProgress} = useScroll({
    target: target,
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
      [0,  25]
  )
  const paddingRight = useTransform(
    scrollYProgress,
      [0.76, 0.88],   //    [0.64, 0.65],[0,  1]
      [0,  70]
  )

  const menuContainer = useRef()
  
  
  const OptionCard = ({Gindex,item})=>{
    const [isMotiv, setMotiv] = useState(true)
    const [test, setTest]= useState(false)
    const handleclick = ()=>{
      //localStorage.setItem("getting_started","close")
      setMotiv(!isMotiv)
    }


    const gettingStarted_R = useRef()
    const CMS_R = useRef()
    const Users_R = useRef()
    const Animation_R = useRef()
    const Development_R = useRef()
    const Translate_R = useRef()
    const InRealTime_R = useRef()
    const Responsibility_R = useRef()
    const Komunikation_R = useRef()
   
    
    const refTab = [gettingStarted_R, CMS_R, Users_R, Animation_R, Development_R, Translate_R, InRealTime_R, Responsibility_R, Komunikation_R]


    const { scrollYProgress:PullY } = useScroll({
      offset: ["start end", "end start"],
      target: refTab[Gindex],
      container: menuContainer
    });
    
    // const opacity = useTransform(PullY,  (pos) => {
    //   console.log(pos)
    //     if($(window).width() > 1160){
    //       return pos >= 0.8  ? "0" : "1"; 
    //     }else{
    //       return pos >= 0.8  ? "0" : "1"; 
    //     }
    // })
    const opacity = useTransform(
      PullY,
      [0.77, 0.8],   //    [0.64, 0.65],[0,  1]
      [1,  0]
    )

    const TextOption = ({Tindex, item})=>{
    
      // dd = dd.concat(item)
      // const tableMap = dd.length/2
      // const [tm, settm] = useState(null)

      // useEffect(()=>{
      //   if(tm===null){
      //     settm(tableMap)
      //   }
      // })
      // // useEffect(()=>{
      // //   setTableMap(dd.length/2)
      // //   console.log(dd.length/2, tableMap)
      // // })
      // //console.log(dd.length/2)
      // //setTableMap(dd.length/2)
      const navigate = useNavigate()
      const handleclick_option = () =>{
        navigate(item.link)
      }
      console.log(item.id)
      
      return(
        <li key={Tindex} onClick={()=> handleclick_option()} className={`text-[15px] mb-2 ml-2 cursor-pointer ${
          item.id === elements ? "text-blue-300 font-bold": ""
        }`}>{item.option}</li>
      )
    }


    return(
      <motion.ul key={Gindex} style={{opacity}} ref={refTab[Gindex]} className={`ml-4 mt-10 px-12 w-max flex flex-col ${
        Gindex === 0 ? "mt-[166px]" : ""
      } ${
        Gindex === Menu.length - 1 ? "mb-[60px]" : ""
      } ${
        Gindex === 0 && isMotiv === false ? "mt-[180px]" : ""
      }`}>
        <motion.p onClick={()=> handleclick()} className='font-bold mb-4 cursor-pointer'>{item.title}</motion.p>
        <motion.div style={elements === 0 && isMotiv === true ? {maxHeight: openT} : {maxHeight: ""}} className={`w-auto overflow-hidden ease-in-out duration-300 h-auto ${
            isMotiv === true ? "h-auto max-h-[200px]" : "max-h-0"
          }`}>
          {item.option.map((item, index)=>(
              <TextOption item={item} Tindex={index} />
          ))}
        </motion.div>
      </motion.ul>
    )
  }
  

  return (
    <motion.div id='menuContainer' ref={menuContainer} style={elements === 0 ? {paddingLeft, paddingRight} : ""} className='text-white font-Poppins text-[17px] h-[100vh]  fixed top-0 left-0 z-20 overflow-y-scroll'> {/**border-solid border-white border-[2px] bg-[#090b10dc] */}
        <Header containerM={menuContainer}/>
        <div id='menutarget' className='min-h-[110vh]'>
        {Menu.map((item, index)=>(
          <OptionCard item={item} Gindex={index}/>
        ))}
        </div>
    </motion.div>
  )
}

export default Menu