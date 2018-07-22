import React from "react";
import PropTypes from "prop-types";

class DateSelect extends React.Component{
  render(){
    return (  
      <div className={`element ${this.props.toggleClass}`}>
        <input name={this.props.name} id={this.props.name} type={this.props.inputType} value={this.props.value} className={this.props.isError? 'error': null} onFocus={this.props.onFocus} onChange={this.props.handleChange} onBlur={this.props.onBlur} disabled={this.props.disabled? 'disabled' : ''} />
        <label htmlFor={this.props.name} className={this.props.value? 'active': null}>{this.props.title}</label>
        <span className='error'>{this.props.isError? this.props.errMsg : null}</span>
      </div>
    );
  }
}
DateSelect.propTypes = {  
  inputType: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  onBlur: PropTypes.func
};

export default DateSelect;