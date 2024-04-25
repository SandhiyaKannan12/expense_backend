// //To print a helloworld message by sending a req to server
// //for handling routes express is used and static files can be read automatically


// var http = require('http'); //import http module
// var module = require("./newModule");
// var url = require('url')
// var fs = require('fs')

// http.createServer((req,res)=>{
//     // //res.write(req.url)// to pass the parameter from the url
//     // var queryObj = url.parse(req.url, true).query;
//     // //console.log({queryObj})
//     // var add = module.add(parseInt(queryObj.a),parseInt(queryObj.b));
//     // var sub = module.sub(parseInt(queryObj.a),parseInt(queryObj.b));
//     // var mul = module.mul(parseInt(queryObj.a),parseInt(queryObj.b));
//     // var div = module.div(parseInt(queryObj.a),parseInt(queryObj.b));
//     // res.write("Sum:"+String(add)+"\n")
//     // res.write("Diff:"+String(sub)+"\n")
//     // res.write("Mul:"+String(mul)+"\n")
//     // res.write("Div:"+String(div)+"\n")//to print sum of 2 numbers

//     /*===== For read =====*/
//     /*fs.readFile("demo.html",(err,data)=>{
//         res.write(data)
//         res.end()//end() method is used to end the response and send the data to the client
//     })*/


//     /* ===== For write ===== */ 
//     data = "Welcome to KIT"
//     fs.writeFile("test.txt",data,function(err){
//         console.log(err)
//     });
//     /* ===== To append a new one ===== */
//     fs,fs.appendFile("test.txt","Appended new data",(err)=>{
//         if(err) throw err;
//     });
//     fs.unlink("test2.txt",()=>{
//         console.log("file deleted");
//     });
//     res.end();
// }).listen(8081 ,  () =>{
//     console.log("Server Started...")
// })

const mongoose=require('mongoose')

var express=require("express");
var cors=require('cors');
var app=express();

mongoose.connect('mongodb+srv://21ita43:dhiya_12@cluster0.utlmij8.mongodb.net/expense-tracker').then(console.log("connected"))

const expenseSchema=new mongoose.Schema({
    date:{type:String,required:true},
    category:{type:String,required:true},
    amount:{type:Number,required:true},
})

let Expenses=mongoose.model("Expenses",expenseSchema)

var arr=[{name:"dhiya"},{name:"sandy"},{name:"vichu"}];

app.use(express.json())
app.use(cors());

app.get('/api', async (req,res)=>{
    // console.group(req.query);
    // res.send(arr);
    const expenses=await Expenses.find();
    res.json(expenses)
})

app.post('/api',(req,res)=>{
    // let id=req.body.id;
    // let name=req.body.name;
    // if(id>=0&&id<arr.length){
    //     arr.splice(id,0,name);
    //     res.send(arr);
    // }
    // let a=req.body.num1
    // let b=req.body.num2
    // res.send(String(a+b))
    const {category,amount}=req.body;
    const newItem=new Expenses({date:new Date().toLocaleDateString(),category,amount});
    newItem.save();
    res.status(200).json(newItem);
})

app.put('/api/:id',async(req,res)=>{
    // let id=parseInt(req.params.id);
    // if(id>=0&&id<arr.length){
    //     let name=req.body.name;
    //     arr[id].name=name;
    //     console.log(arr);
    //     res.send(arr[id]);
    // }
    // else{
    //     res.send("error");
    // }
    let _id=req.params.id;
    const newItem=await Expenses.findByIdAndUpdate(_id,req.body);
    if(!newItem) return res.status(404).send("no item found");
    res.status(200).send("content modified");


})

app.delete('/api/:id',async(req,res)=>{
    let _id=req.params.id;
    const Item=await Expenses.findByIdAndDelete(_id);
    if(!Item) return res.status(404).send("not deleted");
    res.status(200).send("content deleted");

})


app.listen(8000,()=>{
    console.log("server started")
})

/*cors--->Cross-Origin-Resource-Sharing

if we try to connect react and express it gives cors error*/
