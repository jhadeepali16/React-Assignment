import React from 'react';
let list;
class FlightSearchResult extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flightResult: this.props.data,
            initialState: this.props.initialState
        }
    }
    render(){
        if(this.props.data){
            list = this.props.data.map((ele, index) => {
                    return <section key={index} id={index} className="booking">
                        <section className="left-panel">
                            <section className="price">Rs. {ele.price}</section>
                            <section className="return-trip">
                                <section className="going-trip">
                                    <p>AI-202</p>
                                    <p>{ele.origin} > {ele.destination}</p>
                                    <p>Depart: {ele.depart_time}</p>
                                    <p>Arrive: {ele.arrival_time}</p>
                                </section>
                                {this.props.isRetrunTrip ?
                                    <section className="returning-trip">
                                        <p>AI-202</p>
                                        <p>{ele.destination} > {ele.origin}</p>
                                        <p>Depart: {ele.depart_time}</p>
                                        <p>Arrive: {ele.arrival_time}</p>
                                    </section>: null
                                }
                            </section>
                        </section>
                        <section className="right-panel">
                            <img alt="flight" src="https://vignette.wikia.nocookie.net/msfsx/images/9/98/CRJ-700White.jpg/revision/latest?cb=20100807235642" width="140" height="100" />
                            <button>Book this flight</button>
                        </section>
                    </section>
                }
            )
        }
        else{
            list = null;
        }
        if (this.props.requestFailed) return <section className="c-flight-search-result"><p className="no-flight">No Data found!</p></section>
        if (this.props.noResult) return <section className="c-flight-search-result"><p className="no-flight">No Flights available!!</p></section>
        return this.props.data && this.props.initialState ? (
            <section className="c-flight-search-result">
                <section className="trip">
                    <span><span>{this.props.origin} > {this.props.destination} </span> {this.props.isRetrunTrip ? <span> > {this.props.origin}</span>: null}</span>
                    <div className="date">
                        <p>Depart: {this.props.departureDate._d.toDateString()}</p>
                        {this.props.isRetrunTrip ? 
                            <p>Return: {this.props.returnDate === undefined ? '' : this.props.returnDate._d.toDateString()}</p> : null
                        }
                    </div>
                </section>
                <section className="result">
                    {list}
                </section>
            </section>
        ) : null
    }
}
export default FlightSearchResult;