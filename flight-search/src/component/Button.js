import React from 'react';
import PropTypes from "prop-types";
const Button = (props) => (  
    <div className="element">
        <button className={props.class} id={props.name} type={props.inputType} onClick={props.controlFunc}>{props.content}</button>
    </div>
);
  
Button.propTypes = {  
    inputType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    controlFunc: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired
};

export default Button; 