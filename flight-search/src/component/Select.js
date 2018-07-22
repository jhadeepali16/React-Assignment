import React from 'react';
import PropTypes from "prop-types";

class Select extends React.Component{
  render(){
    return (  
      <div className="element">
        <select id={this.props.name} name={this.props.name} value={this.props.selectedOption} onChange={this.props.controlFunc} onBlur={this.props.validateFunc} required={this.props.required} className={this.props.isError? 'error': null}>
            {this.props.options.map((opt, index) => {
                return (
                    <option
                    key={index}
                    value={opt.id}>{opt.id}</option>
                );
            })}
        </select>
        <label htmlFor={this.props.name} className={this.props.isActive? 'active': null}>{this.props.title}</label>
        <span className='error'>{this.props.isError? this.props.errMsg : null}</span>
      </div>
    );
  }
}

Select.propTypes = {  
  name: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.array,
  selectedOption: PropTypes.string,
  validateFunc: PropTypes.func,
  controlFunc: PropTypes.func,
  required: PropTypes.string
};

export default Select;  