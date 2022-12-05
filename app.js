const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/calender");

const dayNameShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const month31 = [0, 2, 4, 6, 7, 9, 11];

const holidaySchema = mongoose.Schema({
    date:{
        day: Number,
        month: Number,
        year: Number,
    },
    timeStart: Number,
    timeEnd: Number,
    type: Number,
    message: String
});

const Holiday = mongoose.model("holiday", holidaySchema);

app.get("/", function(req, res){
    res.render("header", {Period:"Week"});
});

var time = new Date;
let arr = [];
let check = false;

function is6(d, m , day){
    let is31 = false;
    for(let i=0; i<7; i++){
        if(arr[2] === month31[i]){
            is31 = true;
        }
    }
    if((day === 5 && date === 1 && is31) || (day === 6 && date === 1)){
        return true;
    }
    return false;
}

app.post("/:period", function(req, res){
    let str = req.body.date;
    const period = req.params.period;
    arr = str.split(",");
    check = false;
    if(period === "Month"){
        check = is6(arr[0], arr[1], arr[2]); // date, day, month.
    }
    res.redirect("/"+period);
});

app.get("/:period", function(req,res){
    const period = req.params.period;
    res.render("header", {Period:period, day:dayNameShort[arr[1]], date:arr[0], month:arr[2], year:arr[3], check:check});
});

app.listen(3000, function(req, res){
    console.log("localhost: 3000");
});