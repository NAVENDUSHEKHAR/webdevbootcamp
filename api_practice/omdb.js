var app=require("express")();
var request=require("request");
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("search");
});


app.get("/results",function(req,res){
      console.log(req.query.search);
      var search  = req.query.search;
      var url= "http://www.omdbapi.com/?s="+search+"&apikey=thewdb";
   request(url,function(error,response,body){
       if(!error && res.statusCode==200){
           var data=JSON.parse(body);
              res.render("results",{data:data});
              console.log(data["Search"]["Title"]);
       }
   }); 
  
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("movie app is started");
    
});