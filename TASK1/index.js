// // const express = require("express");

// // const mongoose = require("mongoose");


// // const bodyParser = require("body-parser");


// // const dotenv = require("dotenv");

// // const app = express();

// // dotenv.config();


// // const port =  process.env.port || 3000


// // const username = process.env.MONGODB_USERNAME;


// // mongoose.connect("mongodb+srv://<username>:pFS5HjCUE8dEFxr9@cluster0.cqkthe3.mongodb.net/registrationFormDB" ,{
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true

// // });


// // //REGISTRATION FORM

// // const registrationSchema = new mongoose.Schema({

// //     name :String,


// //     email :String,

// //     password:String
// // })

// // const Registration = mongoose.model("Registration" ,registrationSchema);

// // app.use(bodyParser.urlencoded({extended :true}));


// // app.use(bodyParser.json());


// // app.post("/register" , async(req,res)=>{
    
// //     try{

// //         const {name , email , password} = req.body;


// //         const registrationData = new Registration({

// //             name :String,
        
        
// //             email :String,
        
// //             password:String
// //         });


// //         await registrationData.save();

// //         res.redirect("/success");
// //     }

// //     catch(error){

// //         console.log(error);

// //         res.redirect("error");


// //     }
// // })

// // app.get("/success" , (req,res)=>{
// //     res.sendFile(__dirname + "/pages/success.html");
// // })

// // app.get("/error" , (req,res)=>{
// //     res.sendFile(__dirname + "/pages/error.html");
// // })

// // app.listen(port , ()=>{
// //     console.log(`server is running on port ${port}`);
// // })

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");

// const app = express();
// dotenv.config();

// const port = process.env.PORT || 3000;
// const username = process.env.MONGODB_USERNAME;

// mongoose.connect(`mongodb+srv://${username}:pFS5HjCUE8dEFxr9@cluster0.cqkthe3.mongodb.net/registrationFormDB`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const registrationSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String
// });

// const Registration = mongoose.model("Registration", registrationSchema);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const registrationData = new Registration({ name, email, password });
//     await registrationData.save();
//     res.redirect("/success");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/error");
//   }
// });

// app.get("/success", (req, res) => {
//   res.sendFile(__dirname + "/pages/success.html");
// });

// app.get("/error", (req, res) => {
//   res.sendFile(__dirname + "/pages/error.html");
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const username = process.env.MONGODB_USERNAME;

mongoose.connect(`mongodb+srv://${username}:pFS5HjCUE8dEFxr9@cluster0.cqkthe3.mongodb.net/registrationFormDB`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "views"))); // Serve static files from the "views" directory
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const registrationData = new Registration({ name, email, password });
    await registrationData.save();
    res.redirect("/success");
  } catch (error) {
    console.log(error);
    res.redirect("/error");
  }
});

app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "success.html"));
});

app.get("/error", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "error.html"));
});

// Route to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
