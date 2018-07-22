import React from 'react';
import Tabs from './Tabs';
import Form from './Form';
class FlightSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: { min: this.props.minPrice, max: this.props.maxPrice }
        };
    }
    render(){
        return(
            <section>
                <section>
                    <div className="element">
                        <Tabs id={"one-way"} text={'One way'}  isTabActive={this.props.activeTab === "one-way"} onClick={this.props.selectTrip} />
                        <Tabs id={"return-way"} text={'Return way'} isTabActive={this.props.activeTab === "return-way"} onClick={this.props.selectTrip} isRetrunTrip={this.props.isRetrunTrip} />
                    </div>
                    <Form validateOnChange={this.props.validateOnChange} departureOnChange={this.props.departureOnChange} toggleFocus={this.props.toggleFocus} returnOnChange={this.props.returnOnChange} onClickOutSide={this.props.onClickOutSide} selectDate={this.props.selectDate} fieldActiveClass={this.props.fieldActiveClass} removeCalendar={this.removeCalendar} value={this.props.value} isToCalendarOpen={this.props.isToCalendarOpen} isFromCalendarOpen={this.props.isFromCalendarOpen} departureDate={this.props.departureDate} returnDate={this.props.returnDate} handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange} fieldId={this.props.fieldId} error={this.props.error} isRetrunTrip={this.props.isRetrunTrip} toggleClass={this.props.toggleClass} activeClass={this.props.activeClass} isFocused={this.props.isFocused} disabled={this.props.disabled} errMsg={this.props.errMsg} origin={this.props.origin} destination={this.props.destination} passenger={this.props.passenger} />
                </section>  
            </section>
        );
    }
} 

export default FlightSearch;