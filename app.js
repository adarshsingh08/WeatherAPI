const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const query=req.body.cityName;
    const key="67df968451ddd1e4e5906cd76f4c958c";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const wetherData=JSON.parse(data)
            const temp=wetherData.main.temp;
            const wethetDescription=wetherData.weather[0].description;
            const icon=wetherData.weather[0].icon;
            const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>Wether is "+wethetDescription+"</p>");
            res.write("<h1>The temperature in "+ query+ " is "+temp+" in degree Celcius.</h1>");
            res.write("<img src=" +imageurl +">");
            res.send();
        });
    }); 
})
/*

*/
app.listen(3000,function(){
    console.log("Server is runing");
});