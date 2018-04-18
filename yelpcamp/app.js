var app= require("express")();
var request=require("request");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/yelpcamp");  // it willmake a db of name yelpcamp

var campSchemma= new mongoose.Schema({
    name:String,
    img :String,
    des :String
});

var camp=mongoose.model("camp",campSchemma);

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");



app.get("/",function(req,res){
    
    res.render("home");
});

app.get("/camp",function(req,res){
   
   camp.find({},function(err,camp){
      if(err){
          console.log(err);
      } 
      else res.render("index",{camp:camp});
   });

     
});

app.post("/camp",function(req,res){
    var name=req.body.name;
    var img=req.body.img;
    var des=req.body.des;
    var newCamp = {name:name,img:img,des:des};
    camp.create(newCamp,function(err,newly){
        if(err){
            console.log(err);
        }
        
        else res.redirect("/camp");
        
    });
    
});

app.get("/new",function(req,res){
    res.render("new.ejs");
});


app.get("/camp/:id",function(req,res){
    camp.findById(req.params.id,function(err,camp){
        if(err){
            console.log(err);
        }
        
        else res.render("show.ejs",{camp:camp});
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("it's yelpcamp baby");
});