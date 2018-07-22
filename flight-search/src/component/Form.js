import React from 'react';
import form from '../data/form.json';
import DatePicker from 'react-datepicker';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import DateSelect from './DateSelect';
import PropTypes from "prop-types";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Form extends React.Component{
    isFieldActive(fieldName){
        return !!this.props.fieldId[fieldName];
    }
    isErrorActive(fieldName){
        return !!this.props.error[fieldName];
    }
    render(){
        return(
            <section className="form">
                <Input inputType={'text'} title={form.label.city_origin} name={'origin'} controlFunc={this.props.handleChange} validateFunc={this.props.validateOnChange} content={this.props.origin} required={"true"} isActive={this.isFieldActive('origin')} isError={this.isErrorActive('origin')} errMsg={this.props.errMsg} />
                <Input inputType={'text'} title={form.label.city_destination} name={'destination'} controlFunc={this.props.handleChange} validateFunc={this.props.validateOnChange} content={this.props.destination} required={"true"} isActive={this.isFieldActive('destination')} isError={this.isErrorActive('destination')} errMsg={this.props.errMsg} />
                <DatePicker customInput={<DateSelect isError={this.isErrorActive('departureDate')} errMsg={this.props.errMsg} />} dateFormat="DD MMM YYYY" selected={this.props.departureDate} onChange={this.props.departureOnChange} inputType={'text'} title={form.label.date_departure} name={'departureDate'} handleChange={this.props.handleChange} onBlur={this.props.validateOnChange} minDate={moment()} showDisabledMonthNavigation />
                <DatePicker customInput={<DateSelect toggleClass={this.props.toggleClass} isError={this.isErrorActive('returnDate')} errMsg={this.props.errMsg} />} dateFormat="DD MMM YYYY" selected={this.props.returnDate} onChange={this.props.returnOnChange} inputType={'text'} title={form.label.date_return} name={'returnDate'} disabled={this.props.disabled} onBlur={this.props.handleChange} minDate={moment()} showDisabledMonthNavigation />
                <Select title={form.label.passengers} controlFunc={this.props.handleChange} selectedOption={this.props.passenger} name={'passenger'} options={form.passenger} required={"true"} isActive={this.isFieldActive('passenger')} isError={this.isErrorActive('passenger')} errMsg={this.props.errMsg} validateFunc={this.props.validateOnChange} />
                <Button controlFunc={this.props.handleSubmit} content={'Search'} class={'btn-search'} name={'search'} inputType={'submit'} />
            </section>
        );
    }
}
Form.propTypes = {
    selected: PropTypes.object,
    selectedOption: PropTypes.string
};
export default Form;