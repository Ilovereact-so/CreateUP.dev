import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import AceEditor from 'react-ace';
import { HexColorPicker } from "react-colorful";
// Importowanie motywu i trybu składni dla HTML
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-chaos';
import 'ace-builds/src-noconflict/theme-pastel_on_dark';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/webpack-resolver';
// Konfiguracja Ace Editor
import ace from 'ace-builds/src-noconflict/ace';

// Ustawianie ścieżek do workerów z CDN
//ace.config.setModuleUrl('ace/mode/html_worker', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/worker-html.js');
//ace.config.setModuleUrl('ace/mode/css_worker', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/worker-css.js');


const Review = () => {
  useEffect(() => {
    ace.config.set('basePath', '/static/js/');
  }, []);

  return (
    <div className='w-full min-h-[100vh] h-auto text-white flex flex-col'>
      <div className='w-full flex flex-col items-center mt-[70px] font-Poppins'>
        <p className='text-[48px]'><span className='font-bold'>Zobacz</span> jak działamy</p>
        <p className='text-[17px]'><span className='font-bold'>Przegląd</span> to strzeszczenie wszytkich dostępnych opcji z elementami interaktywnymi</p>
      </div>
      <div className='font-Poppins mt-20 mx-24'>
        <p className='font-bold text-[32px] mb-2'>System CMS</p>
        <p className='text-[22px]'>Wszelakie podstrony z newsami, blogi i panele administratora</p>
        <div className='flex items-start mt-12'>
          <CMS/>
        </div>
        <p className='font-bold text-[17px] mt-20 mb-8'>Modyfikuj używając HTML, CSS bądź motywu domyślnego </p>
        <div className='font-bold text-[20px] px-14 py-4 rounded-full border-solid border-[#707070] border-[1px] bg-[#000000d2] flex justify-center items-center w-fit'>Przejdz do CMS</div>
        <p className='font-bold text-[32px] mt-20'>Urzytkownicy</p>
      </div>
    </div>
  )
}

export const CMS = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditView, setEditView] = useState(false);
  const [content, setContent] = useState("<p id='p1'>Przykladowy tekst</p>\n<div id='d1'>Przycisk</div>\n<p id='p2'>NNNnnn</p>");
  const [isChoose, setChoose] = useState('')
  const [option, setOption] = useState({font:"Poppins", font_styleB:false, font_styleI:false, font_styleU:false,font_size:17, font_color:"" })
  const [isRef, setRef] = useState()
  const [isfontState, setfontState] = useState(7)

const fonts = [
  ['Courier New', 'Courier'],
  ['Franklin Gothic Medium', 'Arial Narrow'],
  ['Gill Sans', 'Gill Sans MT'],
  ['Lucida Sans', 'Lucida Sans Regular'],
  ['Segoe UI', 'Tahoma'],
  ['Times New Roman', 'Times'],
  ['Trebuchet MS', 'Lucida Sans Unicode'],
  ['Poppins', 'sans-serif']
]



  const toggleEditing = () => {
    setIsEditing(!isEditing);
    localStorage.setItem("content",content)
    SetStyles()
    
  };

  const SetStyles = ()=>{
    const applyStyles = () => {
      const children = $("#ItemsContent").children();
      children.each(function() {
        const id = $(this).attr("id");
        if (id) {
          const styles = localStorage.getItem(id);
          if (styles) {
            $(this).attr("style", styles);
          }
        }
      });
    };

    const checkChildren = setInterval(() => {
      const children = $("#ItemsContent").children();
      if (children.length > 0) {
        clearInterval(checkChildren);
        applyStyles();
      }
    }, 100);
  }

  const handleInputChange = (newValue) => {
    setContent(newValue);
  };

  // const MouseOver =(e)=>{
  //   if(isEditView){
  //     $(e.target).css('background-color',"#4d7097")
  //     console.log(isEditView)
  //   }
  // }
  // const MouseOut=(n)=>{
  //   $(n.target).css('background-color',"")
  //   console.log(isEditView) 
  // }
    //$('#ItemsContent').children().on('mouseover',(e)=> MouseOver(e)).on('mouseout',(n)=> MouseOut(n))

  const MouseOver = (e) => {
    //console.log('Mouse over event:', e.target);
    $(e.target).css('backdrop-filter',"contrast(0.6)").css("cursor","pointer")
  }

  const MouseOut = (e) => {
      //console.log('Mouse out event:', e.target);
      $(e.target).css('backdrop-filter',"").css("cursor","default")
  }
  const MouseClick = (e) =>{
    //console.log('Mouse click event:', e);
    const content = e.target.textContent
    const shortenedContent = content.slice(0, 2) + '...';
    setChoose(e.target.outerHTML.replace(/ style="[^"]*"/g, '').replace(content, shortenedContent))
    setRef(e.target)
    console.log(e.target)
  }
  useEffect(()=>{
    const r = $(isRef)
    r.css("font-size",parseInt(option.font_size)).css("font-style","bold")
    r.css("color",option.font_color)
    //$(isRef).css("font-family",fonts[isfontState])
    r.css("font-family",fonts[isfontState])
    console.log(fonts[isfontState])
    if(option.font_styleB){
      r.css("font-weight","bold")

    }else{
      r.css("font-weight","normal")
    }
    if(option.font_styleU){
      r.css("text-decoration","underline")
    }else{
      r.css("text-decoration","none")
    }
    if(option.font_styleI){
      r.css("font-style","italic")
    }else{
      r.css("font-style","normal")
    }
    var id = r.attr('id')

    //const backdropFilterRegex = /backdrop-filter:\s*[^;]+;/gi; .replace(backdropFilterRegex, '')
    if(isRef !== undefined){
      const style = $(isRef).attr("style")
      localStorage.setItem(id,removeBackdropFilter(style))

      const Rstyle = localStorage.getItem($(isRef).attr("id"))
      const formattedStyles = formatStylesWithNewlineAndNbsp(Rstyle);
      setCSS("#"+$(isRef).attr("id")+"{\n"+formattedStyles+"\n}")

    }else{
      setContent(localStorage.getItem("content"))
      console.log(localStorage.getItem("content"))
    }

    
  },[option, isfontState])

  const removeBackdropFilter = (styles) => {
    const backdropFilterRegex = /backdrop-filter:\s*[^;]+;/gi;
  const cursorRegex = /cursor:\s*[^;]+;/gi;

  // Usuń backdrop-filter
  let cleanedStyles = styles.replace(backdropFilterRegex, '');

  // Usuń cursor
  cleanedStyles = cleanedStyles.replace(cursorRegex, '');

  return cleanedStyles.trim();
  };

  const formatStylesWithNewlineAndNbsp = (styleString) => {
    return styleString.split(';')
      .map(style => style.trim())
      .filter(style => style)
      .map(style => `  ${style}`)
      .join(';\n');
  };

  useEffect(()=>{
    var r = $(isRef)
   
    if(isRef != null ){
      const Rstyle = localStorage.getItem(r.attr("id"))
      const formattedStyles = formatStylesWithNewlineAndNbsp(Rstyle);
      setCSS("#"+r.attr("id")+"{\n"+formattedStyles+"\n}")

      setOption({
        font:r.css("font-family"),
        font_size:parseInt(r.css("font-size").replace("px","")),
        font_styleB: r.css("font-weight") === "700" ? true : false,
        font_styleU: r.css("text-decoration").includes('underline') ? true : false,
        font_styleI: r.css("font-style") === "italic" ? true : false,
        font_color: r.css("color")
      })
      console.log(r.css("font-style"))

    
    const optionFont = parseFontString(r.css("font-family"));
    const index = fonts.findIndex(font => font[0] === optionFont.font[0] && font[1] === optionFont.font[1]);
    console.log(r.css("font-family"),optionFont,index)
    setfontState(index)
    }else{
      SetStyles()
    }
  },[isRef])
  
  useEffect(() => {
    const itemsContent = document.getElementById('ItemsContent');

    if (itemsContent && isEditView) {
      const itemsChildren = itemsContent.children;

      // Dodajemy zdarzenia do każdego dziecka
      Array.from(itemsChildren).forEach((child) => {
        child.addEventListener('mouseover', MouseOver);
        child.addEventListener('mouseout', MouseOut);
        child.addEventListener('click', MouseClick);
      });

      // Czyszczenie zdarzeń po odmontowaniu komponentu lub zmianie isEditView
      return () => {
        Array.from(itemsChildren).forEach((child) => {
          child.removeEventListener('mouseover', MouseOver);
          child.removeEventListener('mouseout', MouseOut);
          child.removeEventListener('click', MouseClick);
        });
      };
    }
  }, [isEditView, isEditing]);

  const [width, setWidth] = useState(0);
  const span = useRef();
  useEffect(() => {
    setWidth(span.current.offsetWidth);
  }, [isRef, option]);

  const changeHandler = evt => {
    setOption({...option,font_size:evt.target.value})
  };

  const PrevFHandler = () =>{
    if(isfontState == 0){
      setfontState(fonts.length-1)
    }else{
      setfontState(isfontState - 1)
    }
    console.log("fontstate", isfontState)
  }
  const NextFHandler = () => {
    if(fonts.length -1 === isfontState){
      setfontState(0)
    }else{
      setfontState(isfontState + 1)
    }
    console.log("fontstate", isfontState)
  }
  useEffect(()=>{
    const selectedFontArray = fonts[isfontState];
    const fontString = selectedFontArray.join(', ');
    setOption({ ...option, font: fontString });
  },[isfontState])

  function parseFontString(fontString) {
    const cleanedString = fontString.replace(/"/g, '');
    const fontArray = cleanedString.split(',').map(item => item.trim());
    return { font: fontArray };
  }

  const [isFColor,setFColor] = useState(false);
  const [isVWcss, setVWcss] = useState(false);

  const [isCSS, setCSS] = useState("")

  const extractStyles = (cssString) => {
    const styleBlock = cssString.match(/{([^}]*)}/); // Znajdź tekst między { i }
    if (!styleBlock) return [];
    
    return styleBlock[1].split(';') // Podziel na poszczególne właściwości
      .map(style => style.trim())   // Usuń nadmiarowe białe znaki
      .filter(style => style);      // Usuń puste elementy
  };

  const extractStylesG = (styleString) => {
    if (!styleString) return [];
  
    return styleString.split(';') // Podziel na poszczególne właściwości
      .map(style => style.trim())   // Usuń nadmiarowe białe znaki
      .filter(style => style);      // Usuń puste elementy
  };
  const[isActual, setActual] = useState(true)
  const arraysAreEqual = (arr1, arr2) => {
    // Sprawdź długość tablic
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    // Sprawdź każdy element tablicy
    return arr1.every((value, index) => {
      return value === arr2[index];
    });
  };

  useEffect(()=>{
    if(isRef !== undefined){
      const r = $(isRef)
      const ACEvalue = extractStyles(isCSS)
      const Actualstyle = extractStylesG(removeBackdropFilter(r.attr("style")))
      
      setActual(arraysAreEqual(ACEvalue, Actualstyle))
      //console.log(arraysAreEqual(ACEvalue, Actualstyle), ACEvalue, Actualstyle)
    }
  },[isCSS, isRef])

  const AproveNewCSS = () =>{
    setActual(true)

    const startIndex = isCSS.indexOf('{');
    const endIndex = isCSS.lastIndexOf('}');
    
    if (startIndex !== -1 && endIndex !== -1) {
      // Wyodrębnij tylko tekst znajdujący się między nawiasami {}
      const cssProperties = isCSS.substring(startIndex + 1, endIndex).trim();
      $(isRef).attr("style",cssProperties)
    } else {
      console.error('Nie można znaleźć nawiasów klamrowych {}.');
    }
    var id = $(isRef).attr('id')
    const style = $(isRef).attr("style")
    localStorage.setItem(id,removeBackdropFilter(style))

    console.log(isCSS)
  }

  const [isAddingE, addElement] = useState(false)

  return (
    <div className='flex justify-start'>
      <div className='bg-[#0000003a] border-solid border-[#707070] border-[1px] p-5 rounded-[25px] w-min min-w-[40vw] flex justify-between items-end h-min max-w-[50vw] relative max-h-[30vh]'>
        {isEditing ? (
          <AceEditor
            mode="html"
            theme="pastel_on_dark"
            name="html_editor"
            onChange={handleInputChange}
            value={content}
            editorProps={{ $blockScrolling: true }}
            fontSize={16}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showGutter: false
            }}
            width='100%'
            id="ACEeditor"
            className="h-auto bg-transparent max-h-[200px]"
        />
        ) : (
          <div id='ItemsContent' className='max-h-[25vh] overflow-auto duration-300 ease-in-out' dangerouslySetInnerHTML={{ __html: content }}></div>
        )}
        <button onClick={()=>setEditView(!isEditView)} className='ml-4 duration-300 ease-in-out'>
          <div className='tooltip'>
            <div className='tooltiptext'>{isEditView ? "Zamknij" : "Edytuj"}</div>
            <i className={`${isEditView ? "gg-close" : "gg-pen"} `}></i>
          </div>
          
        </button>
        <div className='bg-[#161616dc] w-full h-full absolute top-0 right-0 rounded-[25px] flex flex-col p-4'>
          <div className='bg-black text-white p-1 px-3 w-min text-[14px] mb-2'>tekst</div>
          <textarea className='bg-[#000000b6] h-full mx-2 p-2 rounded-[10px]'></textarea>
        </div>
      </div>
      <div className='tooltip'>
        <i className='gg-info mx-3 min-w-[20px]'></i>
        <div className='tooltiptext'>Zmiany zostaną zachowane w pamięci lokalnej</div>
      </div>
      <div className='flex flex-col'>
        <div className={`bg-[#0000003a] border-solid border-[#707070] rounded-[25px] flex flex-col ease-in-out duration-300 h-min ${
          isEditView ? "w-full max-w-[400px]  p-5 px-6 pt-0 border-[1px] " : "w-0 p-0 px-0 border-[0px]"
        }`}>
          <div className={`h-[40px] relative mb-2 top-[-20px] flex justify-center`}>
            <div className={`rounded-full NNscroll border-solid border-[#707070] bg-black h-full ease-in-out duration-100 whitespace-nowrap flex items-center max-w-[270px] overflow-x-auto overflow-y-hidden  ${
            isEditView ? "border-[1px] w-full text-white px-3" : " border-[0px] w-0 text-black overflow-x-hidden px-0"
          }`}><p className='text-center w-full'>{isChoose}</p></div>{/*isChoose*/}
        </div>
          <div className={`flex ${isEditView ? "":"overflow-hidden"}`}>
            <div className='flex flex-col'>
              <div className='flex justify-center items-center'>
                <div className='tooltip'>
                  <div className='tooltiptext'>Poprzednia</div>
                  < i onClick={PrevFHandler} class="gg-chevron-left cursor-pointer"></i>
                </div>
                <div className='p-2 px-8 rounded-full bg-[#CBCBCB] text-black text-[15px]'>{option.font}</div>
                <div className='tooltip'>
                  <div className='tooltiptext'>Nastepna</div>
                  <i onClick={NextFHandler} class="gg-chevron-right cursor-pointer"></i>
                </div>
              </div>
              <div className='flex justify-evenly w-full items-center mt-2 px-2 scale-[0.8]'>
                <div className='relative flex justify-center items-center'>
                  <i className={`gg-format-italic ${
                    option.font_styleI ? "text-[#4593db]" : ""
                  }`}></i>
                  <input type='checkbox' onChange={(e)=> setOption({...option, font_styleI :e.target.checked})} className='absolute w-max h-max cursor-pointer opacity-0'/>
                </div>
                <hr className='bg-[#707070] w-[1px] h-[30px]'/>
                <div className='relative flex justify-center items-center'>
                  <i className={`gg-format-underline ${
                    option.font_styleU ? "text-[#4593db]" : ""
                  }`}></i>
                  <input type='checkbox' onChange={(e)=> setOption({...option, font_styleU :e.target.checked})} className='absolute w-max h-max cursor-pointer opacity-0'/>
                </div>
                <hr className='bg-[#707070] w-[1px] h-[30px]'/>
                <div className='relative flex justify-center items-center'>
                  <i className={`gg-format-bold ${
                    option.font_styleB ? "text-[#4593db]" : ""
                  }`}></i>
                  <input type='checkbox' onChange={(e)=> setOption({...option, font_styleB :e.target.checked})} className='absolute w-max h-max cursor-pointer opacity-0'/>
                </div>
              </div>
            </div>
            <div className='ml-3 flex items-center h-min'>
              <div className='w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center text-center'>
                <span className='absolute opacity-0 z-[-100] whitespace-pre pointer-events-none' ref={span}>{option.font_size}</span>
                <input style={{ width }} autoFocus className='h-full bg-transparent min-w-[1px] text-black text-[12px] flex items-center justify-center text-right' id='font_s_input' type='number' onChange={changeHandler} value={option.font_size}></input>
                <p className='text-[12px] text-black'>px</p>
              </div>
              <div className='tooltip'>
                <div className='tooltiptext'>Kolor tekstu</div>   
                <i onClick={()=>setFColor(!isFColor)} style={{color:option.font_color}} className={`gg-format-color ml-7 mr-2 cursor-pointer ease-in-out duration-200 ${
                  isFColor ? "scale-150":"scale-125"
                }`}></i>
              </div>
            </div>
          </div>
          <div className={`w-full flex justify-between mt-4 pt-2 items-end ${isEditView ? "" :"overflow-hidden"}`}>
            <div className='flex justify-between w-[60px]'>
              <div className='tooltip'>
                <div className='tooltiptext'>Modyfikuj budowe elementów</div>
                <i onClick={toggleEditing} className="gg-desktop scale-90 cursor-pointer"></i>
              </div>
              <div className='tooltip'>
                <div className='tooltiptext'>Dodaj element</div>
                <i onClick={()=>addElement(true)} className="gg-add scale-90 cursor-pointer"></i>
              </div>
            </div>
            <div className='flex w-[50px] justify-between'>
              <div className='tooltip'>
                <div className='tooltiptext'>Modufikuj Style (CSS)</div>
                <i onClick={()=> setVWcss(!isVWcss)} class="gg-code-slash mt-2 cursor-pointer"></i>
              </div>
              <i className="gg-attachment scale-90"></i>  
            </div>
          </div>
          <div className={`flex justify-center items-end w-full ease-in-out duration-300 h-full overflow-hidden  ${
            isFColor ? "max-h-[300px] p-4 " : "max-h-0 p-0"
          }`}>
            <HexColorPicker color={option.font_color} onChange={(e)=>setOption({...option, font_color: e })} />
          </div>
        </div>
        <div className={`flex justify-center items-center w-full`}>
          <div className={`border-solid border-[#707070] bg-[#0000005b]  w-full h-[300px] rounded-[20px] ease-in-out duration-300 mt-5 p-4 relative ${
            isVWcss && isEditView ? "border-[1px] max-w-[400px] max-h-[250px] " : "border-[0px] max-w-[0] max-h-[0]"
          }`}>
            <AceEditor
            mode="css"
            theme="pastel_on_dark"
            name="css_editor"
            onChange={setCSS}
            value={isCSS}
            editorProps={{ $blockScrolling: true }}
            fontSize={16}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showGutter: false,
              enableEmmet: true  
            }}
            
            width='100%'
            height='220px'
            id="ACEeditorCSS"
            className="h-auto bg-transparent"
            />
            <div className={`w-[7px] h-[7px] bg-white rounded-full absolute top-4 z-[100] ${
              isActual ? "opacity-[0]":"opacity-1"
            } ${
              $("#css_editor > .ace_scrollbar").css("display") == "block" ? "right-11":"right-4"
            }`}></div>
            <div onClick={AproveNewCSS} className={`bg-white rounded-full w-[20px] h-[20px] flex justify-center items-center absolute bottom-4  z-[100] cursor-pointer ${
              $("#css_editor > .ace_scrollbar").css("display") == "block" ? "right-11":"right-4"
            } ${
              isActual ? "opacity-[0]":"opacity-1"
            }`}>
              <i className="gg-check-o border-transparent text-black"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Review