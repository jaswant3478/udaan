import React from 'react';

const input = (props)=>{

    let inputElement = null;

    switch(props.elementType){

        case ('input'):
            inputElement = <input 
            
            {...props.elementConfig}
            value = {props.value}
            onChange={props.changed}
        />
        break;


    }

    return (
            <div>
                    <label>{props.elementConfig.label}</label>
                    {inputElement}


            </div>


    )
}

export default input;