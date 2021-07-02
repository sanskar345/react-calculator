import React, {useState} from "react";
import "./app.css";
import Input from "./Input/Input";
import Button from "./Button/Button";
import btnArray from "../buttons";
import * as math from "mathjs";


function App() {

  const [input,setInput] = useState("");
  const [useFont, setUseFont] = useState({});
  const [calculate, setCalculate] = useState(false);
  const [keyDownStyle,setKeyDownStyle] = useState();

  const handleKeyDown = (event) => {
    const key = event.key;
    setKeyDownStyle(key);

    switch(key){
            case "0":
            addInput(key);
            
            break; 
            case "1":
              addInput(key);
            break;  
            case "2":
              addInput(key);
            break; 
            case "3":
              addInput(key);
            break; 
            case "4":
              addInput(key);
            break; 
            case "5":
              addInput(key);
            break; 
            case "6":
              addInput(key);
            break; 
            case "7":
              addInput(key);
            break; 
            case "8":
              addInput(key);
            break; 
            case "9":
              addInput(key);
            break;
            case "+":
              addInput(key);
            break; 
            case "-":
              addInput(key);
            break; 
            case "*":
              addInput("x");
            break;
            case "/":
              addInput(key);
            break;  
            case "Backspace":
              backInput();
            break; 
            case "c":
              setInput("");
            break; 
            case "=":
              setCalculate((prev) => {
                return(!prev);
              })
            break;
            case "Enter":
              setCalculate((prev) => {
                return(!prev);
              })
            break;
            case ".":
              addInput(key);
            break;
            case "p":
              evaluatePercentage();
            break;
            case "m":
              changeMinusPlus();
            break;
            
          }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // For Calculation

  React.useEffect(() => {

    if(input === ""){
      setInput("");
    }else{
      calculateInput();
    }

  },[calculate]);

  //For Changing The Font of Input

  React.useEffect(() => {
    if(input.length > 23 && input.length < 32){
      setUseFont({fontSize: "30px"});
    }else if(input.length > 31 && input.length < 48){
      setUseFont({fontSize: "20px"});
    }else if(input.length > 47){
      setInput("Invalid Input");
    }else{
      setUseFont({});
    }
  },[input]);

  function addInput(value){

    setInput((prev) => {
      if(prev === "Invalid Input"){
        return("");
      }else{
        return(prev + value);
      }
      
    })
    
  }

  function backInput(){
    setInput((prev) => {
      if(prev === "Invalid Input"){
        return("");
      }else{
        const length = prev.length
        return(prev.substring(0, length-1));
      }
      
    });
  }

  function calculateInput(){
    try{
      const change = input.replaceAll("x", "*");
      const str = math.evaluate(change).toString();
      setInput(str);
     }
     catch(err){

       setInput("Invalid Input");
       
     }
  }

  function nullKeyDownStyle(){
    setKeyDownStyle();
  }

  function changeMinusPlus(){
    
           setInput((prev) => {
             if(prev === "Invalid Input"){
              return("");
             }else{
              if(prev.length !== 0){
                let index = prev.search("-");
                if(index !== 0){
                  return("-" + prev);
                }else{
                  if(prev.charAt(0) === "-"){
                    return(prev.substring(1,prev.length));
                  }else{
                    return(prev);
                  }
                
              }
              }else{
                return("");
              }
              
             }
             
           });
        
  }

  function evaluatePercentage(){
     setInput((prev) =>{
      const onePercent = math.evaluate(prev/100).toString();  
      if(isNaN(onePercent)){
        return("Invalid Input");
       }else{
         return(onePercent);
       }
     });
  }

  function handleClick(value){
   switch(value){
     case "C":
        setInput("");
     break;
     case "+/-":
      changeMinusPlus();
        
     break;
     case "%":
       evaluatePercentage();
     break;

     case "=":
      setCalculate((prev) => {
        return(!prev);
      })

     break;
     case "back":
       backInput();
        
     break; 

     default:
      addInput(value);  
   }

  }
  return (
    <div className="calculator-box">
      <Input input={input} useFont={useFont} />
      {btnArray.map((x) => {
        return <Button key={x.id} name={x.name} style={x.style} value={x.value} keyDownStyle={keyDownStyle} handleClick={handleClick} nullKeyDownStyle={nullKeyDownStyle}  />;
      })}
    </div>
  );
}

export default App;
