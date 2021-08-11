import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [booking, setBooking] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBooking(data));
    }, [])
    
    return (
        <div>
            <p>Total Booking: {booking.length}</p>
            {
                booking.map(book =>
                    <div>
                        <h2>Name: {book.name}</h2>
                        <h5>Email: {book.email}</h5>
                        <p>Check In: {book.CheckIn}</p>
                        <p>Check Out: {book.CheckOut}</p>
                    </div>
                )
            }
        </div>
    );
};

export default Booking;