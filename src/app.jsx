import * as React from 'react';
import { useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import Keyboard from 'react-simple-keyboard';

import './App.css';
import { channels } from './shared/constants';
//const { api } = window;

const Console = () => {
    const [inputs, setInputs] = React.useState({});
    const [displayLengthValue, setDisplayLengthValue] = useState("");
    const [displayNumberValue, setDisplayNumberValue] = useState("");
    const [pressedButton, setPressedButton] = useState("");
    const [btnText, setBtnText] = useState("GO");
    const keyboard = useRef();

    const layout = {
        default: ["1 2 3", "4 5 6", "7 8 9", ". 0 {enter}"]
    };

    const sendTest = () => {
        console.log("in render");
        console.log(displayLengthValue);
        const result = api.sendData({ length: displayLengthValue });
        console.log(result);
    }
    const testEvent = async () => {
        const result = await api.testApi({ length: displayLengthValue });
        console.log(result);
        setBtnText(result)
    };

    const onChange = inputs => {
        setInputs({ ...inputs });
        console.log("inputs are: ", inputs);
    };
    const onKeyPress = button => {
        console.log(" Button: " + button + " Pressed.");
        if (button === "{enter}" && pressedButton !== "") {
          console.log("number entered is - ", inputs);
          if (pressedButton === "length") {
            setDisplayLengthValue(inputs['default']);
          }
          if (pressedButton === "number") {
            setDisplayNumberValue(inputs['default']);
          }
          setInputs({});
          keyboard.current.setInput();
        }
    };

    return (
        <div className='container'>
            <div >
                <div >
                    <button 
                        className='length'
                        onClick={() => setPressedButton("length")}>
                        <div>Length</div> 
                        <div>{displayLengthValue}</div>  
                    </button>
                </div>
                <div >
                    <button 
                        className='number'
                        onClick={() => setPressedButton("number")}> 
                        <div>Number</div> 
                        <div>{displayNumberValue}</div>
                    </button>
                </div>
                <div className='numbers'>
                    <div className='numFormat'>{inputs['default']}</div>
                </div>
                <div className='keypad'>
                    <Keyboard 
                        keyboardRef={r => (keyboard.current = r)}
                        layout={layout}
                        onChangeAll={onChange}
                        onKeyPress={onKeyPress}
                    />
                </div>
            </div>
            <div className='display'>
                <button 
                    className='goButton'
                    onClick={async () => {
                        const result = await window.api.stepApi({ length: displayLengthValue, number: displayNumberValue });
                        console.log(result);
                        setBtnText(result.btnText);
                    }}
                > {btnText} </button>
                <button 
                    className='homeButton'
                    > HOME </button>
                <button className='stopButton'> STOP </button>
            </div>
        </div>
    )
};

function render() {
  ReactDOM.render(<Console />, document.body);
}

render();