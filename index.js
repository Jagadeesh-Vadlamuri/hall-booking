const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 9000;

//Creation of an array with all the Room and Booking Information
var RoomCreation = [
    {
        "seats": 12,
        "ameneties": {
            "amenity1": "swimming pool",
            "amenity2": "air-Conditioner",
            "amenity3": "heater"
        },
        "priceperhour": 1200,
        "customername": "Jagadeesh",
        "Date": "12-08-2020",
        "StartTime": "10:00 AM",
        "EndTime": "09:00 PM",
        "Roomname": "deluxe",
        "RoomID": 120,
        "bookedstatus": "Pending"
    },
    {
        "seats": 22,
        "ameneties": {
            "amenity1": "swimming pool",
            "amenity2": "gym",
            "amenity3": "heater"
        },
        "priceperhour": 2000,
        "customername": "Teja",
        "Date": "22-07-2020",
        "StartTime": "11:00 AM",
        "EndTime": "08:00 PM",
        "Roomname": "suit",
        "RoomID": 121,
        "bookedstatus": "Booked"
    },
    {
        "seats": 30,
        "ameneties": {
            "amenity1": "3D-painting",
            "amenity2": "gym",
            "amenity3": "snookers"
        },
        "priceperhour": 3500,
        "customername": "Vamsi",
        "Date": "30-05-2020",
        "StartTime": "07:00 AM",
        "EndTime": "08:30 PM",
        "Roomname": "luxury-suit",
        "RoomID": 122,
        "bookedstatus": "Awaiting Payment"
    },
    {
        "seats": 20,
        "ameneties": {
            "amenity1": "music",
            "amenity2": "park",
            "amenity3": "bedlights"
        },
        "priceperhour": 5000,
        "customername": "Kiran",
        "Date": "02-02-2021",
        "StartTime": "12:00 PM",
        "EndTime": "11:30 PM",
        "Roomname": "luxury-deluxe",
        "RoomID": 123,
        "bookedstatus": "Booked"
    },
    {
        "seats": 40,
        "ameneties": {
            "amenity1": "flowers",
            "amenity2": "aerobics",
            "amenity3": "mapplewood-flooring"
        },
        "priceperhour": 2800,
        "customername": "Ashok",
        "Date": "22-04-2021",
        "StartTime": "07:30 AM",
        "EndTime": "06:30 PM",
        "Roomname": "General",
        "RoomID": 124,
        "bookedstatus": "Pending"
    }
];

//Fetch the created data 
app.get('/', (req, res)=>{
    res.send(RoomCreation);
})

//Post the new data and fetch the same and show error for the already booked room
app.post('/', async(req, res)=>{
    let filterData = RoomCreation.filter(item=> item.RoomID==req.body.RoomID);
    if(filterData.length>0){
        if(filterData[0].RoomID==req.body.RoomID ){   
            res.send({
                statusCode: 400,
                message: "Room already booked on this day with the same time"
            })   
        }
    }
    else{
        RoomCreation.push(req.body)
        res.send({
            statusCode: 200,
            message: "Room created Successfully",
            RoomCreation
        });
    }
});

//Fetching all the Room data
let Roomdata = [];
for(let i in RoomCreation){
    Roomdata.push({
        roomName: RoomCreation[i].Roomname, 
        bookedstatus: RoomCreation[i].bookedstatus,
        customerName: RoomCreation[i].customername,
        date: RoomCreation[i].Date,
        startTime: RoomCreation[i].StartTime,
        endTime: RoomCreation[i].EndTime
    })
}

app.route('/room-data').get((req, res)=>{
    for(let i=0; i<RoomCreation.length; i++){
        res.send(Roomdata)
    }
})

//Fetching all the Customerdata
let Customerdata = [];
for(let i in RoomCreation){
    Customerdata.push({
        customerName: RoomCreation[i].customername,
        roomName: RoomCreation[i].Roomname, 
        date: RoomCreation[i].Date,
        startTime: RoomCreation[i].StartTime,
        endTime: RoomCreation[i].EndTime
    })
}
app.route('/customer-data').get((req, res)=>{
    for(let i in RoomCreation){
        res.send(Customerdata)
    }
})

app.listen(PORT, ()=>{
    console.log("Server Up", PORT)
})