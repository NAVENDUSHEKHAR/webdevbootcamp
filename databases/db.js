var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name:String,
    age:Number,
    temprament:String
    
});

var Cat = mongoose.model("Cat",catSchema);

Cat.create({
    name:"lucy",
    age:2,
    temprament:"cute"
},function(err,cat){
    if(err){
        console.log("shit happens");
    
    }
    else console.log(cat);
});