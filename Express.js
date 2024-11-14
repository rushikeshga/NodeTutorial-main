const express = require("express");
const data = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require('mongoose')
const { Types } = require('mongoose');

let app = express();
const PORT = 8000;
// schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name:{
    type: String,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  gender:{
    type: String,
    required: true,
  },
  job_title:{
    type: String,
  }

},{timestamps:true})
const User = mongoose.model('user', userSchema)

//connection
mongoose.connect('mongodb://localhost:27017/uses-info')
.then(()=> console.log('mongodb connected'))
.catch((err)=>console.log('mongo error occurred', err))

app.use(express.urlencoded({extended:false}))

app.use((req, res, next)=>{
  console.log("Hello from middleare 1")
  next();
  // res.json({status: "found nothing"})
})

app.use((req, res, next)=>{
  console.log("Hello from middleare 2")
  next();
  // res.json({status: "found nothing"})
})

app.get("/", (req, res) => {
  res.send("home page");
});

app.post("/api/users/",async (req, res) => {
  let body = req.body;
  let addedbody={id:data.length+1, ...body}
  let wholeData = [...data, addedbody]
  if(!body || !body.first_name){
    return res.status(401).json({status:"Error", msg: "fist name is required"})
  }
  let insertData = await User.create(body)
  // fs.writeFile('MOCK_DATA.json', JSON.stringify(wholeData), (req,data2)=>{
  //   res.status(201).json({status:"done", id: data.length+1})
  // })
  return res.status(201).json({status:"done"})
  
  
})

app
  .route("/api/users/:id")
  .get(async(req, res) => {
    // let id = parseInt(req.params.id);
    let specData = await User.findById(req.params.id);
    // let data = await User.find({});
    // console.log(id);
    res.setHeader("X-userName", "Rushikesh")
    // let specData = data.filter((i) => {
    //   // console.log(i)
    //   return i.id == id;
    // });
    if(specData.length == 0){
      return res.status(404).json({status:"Error", msg: "ID not found"})
    }
    // console.log(specData)
    res.json(specData);
  })
  .delete((req, res) => {
    let body = req.body;
    let recNotFound = true;
    for(let i=0; i< data.length;i++){
      let obj = data[i];
      // console.log(obj.id,body.id)
      if(obj.id == body.id){
        recNotFound = false;
        // console.log("found")
        data.splice(i,1)
        break;
      }
    }
    if(recNotFound){
      res.json({status:"Not Found", msg: "recod not found"})
    }
    else{
      fs.writeFile('MOCK_DATA.json', JSON.stringify(data), (req,data2)=>{
        res.json({status:"Deleted", id: body.id})
      })
    }
    // res.json({status:"pending"}
    // )
  })
  .patch(async (req, res) => {
    let body = req.body;
    console.log(Types)
    if(Types.ObjectId.isValid(req.params.id)){
     return res.json({status:"Not Found", msg: "recod not found"})
    }
    let specData = await User.findByIdAndUpdate(req.params.id, body);
    console.log(specData)
    // let specId = await User
    // let body = req.body;
    // let recNotFound = false;
    // for(let i=0; i< data.length;i++){
    //   let obj = data[i];
    //   // console.log(obj.id,body.id)
    //   if(obj.id == body.id){
    //     recNotFound = false;
    //     console.log("found")
    //     obj.emailId = body.emailId;
    //     obj.first_name = body.first_name;
    //     obj.last_name = body.last_name;
    //     obj.gender = body.gender;
    //     obj.job_title = body.job_title;
    //     break;
    //   }
    // }
    // if(recNotFound){
    //   res.json({status:"Not Found", msg: "recod not found"})
    // }
    // else{
      // fs.writeFile('MOCK_DATA.json', JSON.stringify(data), (req,data2)=>{
        res.json({status:"updated"})
      // })
    // }
    
    
  });

// app.get("/api/users/:id", (req, res) => {
//   // let id = parseInt(req.params.id);

//   console.log(id);
//   let specData = data.filter((i) => {
//     // console.log(i)
//     return i.id == id;
//   });
//   // console.log(specData)
//   res.json(specData);
// });

app.get("/api/getAllusers/",async (req, res) => {
  let data = await User.find({});
  // let id = parseInt(req.params.id);
  // console.log(id);
  // let specData = data.filter((i) => {
  //   // console.log(i)
  //   return i.id == id;
  // });
  // console.log(specData)
  res.json(data);
});

app.get("/users/",async (req, res) => {
  let data = await User.find({})
  const html = `
    <ul>
        ${data
          .map((obj) => {
            return `<li> ${obj.first_name}</li>`;
          })
          .join("")}
    </ul>
    `;
  res.send(html);
});

// app.post();

app.listen(PORT, () => console.log("Server started succcessfully"));
