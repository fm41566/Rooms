import React, { useState, useEffect } from 'react'
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from 'moment';

function Bookingscreen({ match }) {
    const [room, setroom] = useState();
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    const roomid = match.params.roomid
    const fromdate = moment(match.params.fromdate, 'DD-MM-YYYY')
    const todate = moment(match.params.todate, 'DD-MM-YYYY')


    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1
    const totalamount = totaldays * room.rentperday

    useEffect(async () => {

        try {
            setloading(true)
            const data = await (await axios.post("/api/rooms/getroombyid", { roomid: match.params.roomid })).data;

            setroom(data)
            setloading(false);

        } catch (error) {
            setloading(false);
            seterror(true);
        }

    }, []);


    return (
        <div className='m-5'>
            {loading ?
                (<Loader />) : room ? (<div>
                    <div className="row justify-content-center md-5 bs">
                        <div className="col-md-6">
                            <h1>{room.name}</h1>
                            <img src={room.imageurls[0]} className="bigimg" />

                        </div>

                        <div className="col-md-6">
                            <div style={{ textAlign: 'right' }}>

                                <h1>Booking Details</h1>
                                <hr />

                                <b>
                                    <p>Name : </p>
                                    <p>From Date :{match.params.fromdate}</p>
                                    <p>To Date :{match.params.todate}</p>
                                    <p>Max Count : {room.maxcount}</p>
                                </b>

                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <b>
                                    <h1>Amount</h1>
                                    <hr />
                                    <p>Total days :{totaldays}</p>
                                    <p>Rent per day {room.rentperday}</p>
                                    <p>Total Amount : {totalamount}</p>
                                </b>
                            </div>
                            <div style={{ float: 'right' }}>
                                <button className="btn btn-primary">Pay Now</button>
                            </div>

                        </div>
                    </div>


                </div>) : (<Error />)}
        </div>
    )
}

export default Bookingscreen;
