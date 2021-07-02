import React, {useState} from  "react";
import "./button.css";

function Button(props){

    const [clickEffect, setClickEffect] = useState(false);

    React.useEffect(() => {
      if(props.keyDownStyle === props.value){
        setClickEffect(true);
        setTimeout(() => {
          setClickEffect(false);
          props.nullKeyDownStyle();
        }, 110);

      }

    },[props.keyDownStyle]);

    return(
        <button  className="button" id={clickEffect?"on-click":null} style={props.style} onClick={() =>{
          setClickEffect(true);
          {props.handleClick(props.name);}
          setTimeout(() => {setClickEffect(false);}, 110);
          
        }} >{props.name}</button>
    );
}

export default Button;