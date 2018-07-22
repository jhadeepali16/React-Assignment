import React, { Component } from 'react';
import FlightSearch from './component/FlightSearch';
import FlightSearchResult from'./component/FlightSearchResult';
import InputRange from 'react-input-range';
import PropTypes from "prop-types";
import 'react-input-range/lib/css/index.css';
import './App.css';

const url = 'http://localhost:3000/data';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        requestFailed: false,
        isLoading: false,
        initialState: false,
        isRetrunTrip: false,
        isFocused: false,
        disabled: true,
        showError: false,
        noResult: false,
        data: '',
        filterData: '',
        pricefilterData: '',
        origin: '',
        destination: '',
        passenger:'',
        departureDate: null,
        returnDate: null,
        fieldActiveClass: '',
        toggleClass: 'inactive',
        activeElement: 'one-way',
        fieldId:{},
        error:{},
        maxPrice: 0,
        minPrice: 0,
        value: { min: '', max: '' },
        errMsg: 'Please fill the required field'
    }
  }
  getData = (filterItem) => {
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw Error("Network request failed")
        }
        return response
    })
    .then(d => d.json())
    .then(d => {
        this.setState({
            data: d,
            initialState: true,
            showError: false
        })
        this.searchData(filterItem);
    }, () => {
        this.setState({
            requestFailed: true
        })
    });
}
searchData = (filterItem) => {
    let result = [], ticketPrice, maxPrice, minPrice;
    if(this.state.initialState) {
        result = this.state.data;
        let show = result.filter(function(item){
            for(var key in filterItem){
                if(item[key] === undefined || item[key] !== filterItem[key])
                    return false;
            }
            return true;
        });
        if(show.length){
            ticketPrice = show.map(p => p.price);
            maxPrice = Math.max(...ticketPrice);
            minPrice = Math.min(...ticketPrice);
            this.setState({
                noResult: false,
                filterData: show,
                pricefilterData: show,
                maxPrice: maxPrice,
                minPrice: minPrice
            })
        }
        else this.setState({ noResult: true })
    }
}

isEmpty = (error) => {
    for(var key in error){
        if(error.hasOwnProperty(key))
            return false;
    }    
    return true;
}

validateField = () => {
    if(!this.state.disabled) {
        if(!this.state.origin && !this.state.destination && !this.state.returnDate && !this.state.departureDate && !this.state.passenger){
            this.setState({
                error : { ...this.state.error, origin: true, destination: true, returnDate: true, departureDate: true, passenger: true },
                errMsg: 'Please fill the required field'
            })
        }
        else {
            this.setState({
                error : { ...this.state.error, origin: false, destination: false, returnDate: false, departureDate: false, passenger: false },
                errMsg: ''
            })
        }
    }
    else {
        if(!this.state.origin && !this.state.destination && !this.state.departureDate && !this.state.passenger){
            this.setState({
                error : { ...this.state.error, origin: true, destination: true, departureDate: true, passenger: true },
                errMsg: 'Please fill the required field'
            })
        }
        else {
            this.setState({
                error : { ...this.state.error, origin: false, destination: false, departureDate: false, passenger: false },
                errMsg: ''
            })
        }
    }
}


handleSubmit = (event, key) => {
    let filterItem = {},
        error = {...this.state.error},
        keyValue = Object.values(error);
    
    this.validateField();
    event.preventDefault();
    if(Object.keys(error).length && keyValue.includes(false)) {
        filterItem["origin"] = this.state.origin;
        filterItem["destination"] = this.state.destination;
        this.getData(filterItem);
    }
    else this.setState({ showError: true })
}
handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
        [name]: value
    })
}
validateOnChange = (event) => {
    const {name, value} = event.target;
    if(value !== ""){
        this.setState(() => ({
            fieldId: {...this.state.fieldId, [name]: true },
            error: {...this.state.error, [name]: false }
        }))
    }
    else {
        this.setState(() => ({
            fieldId: {...this.state.fieldId, [name]: false },
            error: {...this.state.error, [name]: true }
        }))
    }
}

departureOnChange = (value) => {
    if(value !== ""){
        this.setState({
            departureDate: value,
            activeClass: 'active'
        })
    }
}
returnOnChange = (value) => {
    this.setState({
        returnDate: value,
        activeClass: 'active'
    })
}

changedateformat = (value) => {
    let d = new Date(value);
    return [d.getDate(), d.getMonth()+1, d.getFullYear()].join('-');
}

selectTrip = (e, index) => {
    let target = e.target.id;
    if(target === 'return-way'){
        this.setState({
            isRetrunTrip: true,
            disabled: false,
            toggleClass: 'active'
        });
    }
    else if (target === 'one-way'){
        this.setState({
            isRetrunTrip: false,
            disabled: true,
            toggleClass: 'inactive'
        })
    }
    this.setState({
        activeElement: target,
        error: {},
        fieldId: {},
        origin:'',
        destination:'',
        departureDate:'',
        returnDate:'',
        passenger:0,
        data: '',
        initialState: '',
        pricefilterData: '',
        noResult: ''
    })
}

priceSlider = value => this.setState({ value });

refinePrice = (value, min, max) => {
    max = value.max;
    min = value.min;
    let filterData = this.state.pricefilterData;
    let show = filterData.filter(function(item){
        return item.price >= min && item.price <= max; 
    });
    this.setState({ 
        filterData: show,
    });
}

render() {
    return (
      <main className="App">
        <div className="heading">
            <h1>Flight Search Engine</h1>
        </div>
        <section className="c-search-engine">
            <section className="c-flight-search">
                <FlightSearch validateOnChange={this.validateOnChange} handleSubmit={this.handleSubmit} handleChange={this.handleChange} selectTrip={this.selectTrip} onClickOutSide={this.onClickOutSide} isRetrunTrip={this.state.isRetrunTrip} activeClass={this.state.activeClass} activeTab={this.state.activeElement} fieldActiveClass={this.state.fieldActiveClass} toggleClass={this.state.toggleClass} origin={this.state.origin} destination={this.state.destination} passenger={this.state.passenger} departureOnChange={this.departureOnChange} returnOnChange={this.returnOnChange} fieldId={this.state.fieldId} error={this.state.error} departureDate={this.state.departureDate} returnDate={this.state.returnDate} isFocused={this.state.isFocused} maxPrice={this.state.maxPrice} minPrice={this.state.minPrice} value={this.state.value} handleOnBlur={this.handleOnBlur} disabled={this.state.disabled} errMsg={this.state.errMsg} />
                {this.state.initialState && this.state.filterData ? 
                    <section className="price-slider">
                        <h2>Refine Flight Search</h2>
                        <InputRange maxValue={parseInt(this.state.maxPrice, 10)} minValue={parseInt(this.state.minPrice, 10)} value={this.state.value} onChange={this.priceSlider} onChangeComplete={this.refinePrice} />
                    </section> : null
                }
            </section>
          <FlightSearchResult showError={this.state.showError} data={this.state.filterData} initialState={this.state.initialState} origin={this.state.origin} destination={this.state.destination} departureDate={this.state.departureDate} returnDate={this.state.returnDate} isRetrunTrip={this.state.isRetrunTrip} noResult={this.state.noResult} requestFailed={this.state.requestFailed} />
        </section>
      </main>
    );
  }
}
App.propTypes = {
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    value: PropTypes.object
}
export default App;
