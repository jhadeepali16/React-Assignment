import React from 'react';
import PropTypes from "prop-types";

class Input extends React.Component {
  render(){
    return (  
      <div className="element">
        <input name={this.props.name} id={this.props.name} type={this.props.inputType} required={this.props.required} onChange={this.props.controlFunc} onBlur={this.props.validateFunc} value={this.props.content} className={this.props.isError? 'error': null} />
        <label htmlFor={this.props.name} className={this.props.isActive? 'active': null}>{this.props.title}</label>
        <span className='error'>{this.props.isError? this.props.errMsg : null}</span>
      </div>
    );
  }
} 
  Input.propTypes = {  
    inputType: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    validateFunc: PropTypes.func,
    controlFunc: PropTypes.func,
    content: PropTypes.string,
    required: PropTypes.string
  };
  
  export default Input; 