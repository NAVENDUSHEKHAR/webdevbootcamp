var express     =require("express"),
    app         =express(),
    mongoose    =require("mongoose"),
    bodyParser  =require("body-parser");
    
mongoose.connect("mongodb://localhost/blogs");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set("view engine","ejs");

var blogSchema = new mongoose.Schema({
    name:String,
    img:String,
    body:String,
    created:{type:Date ,default:Date.now }
});

var blog = mongoose.model("blog",blogSchema);



app.get("/blogs",function(req,res){
    
    blog.find({},function(err,blog){
        if(err){
            console.log("error!");
        }
        else res.render("index",{blog:blog});
    });
    
});

app.post("/blogs",function(req,res){
    blog.create(req.body.blog,function(err,newBlog){
        if(err){
            console.log(err);
            
        }
        
        else res.redirect("/blogs");
    });
});

app.get("/blogs/new",function(req,res){
    res.render("new");
});

app.get("/blogs/:id",function(req,res){
    blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log("error");
        }
        
        else res.render("show",{blog:foundBlog});
    });
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("you are on blog site");
});