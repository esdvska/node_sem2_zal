require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const status = require("http-status");
const routes = require("./api/routes");
// const bodyParser = require("body-parser");
const Advertisment = require("./models/Advertisment");
const UserModel = require("./models/UserModel");
const uri = process.env.MONGODB_CONNECTION;
mongoose.set("setDefaultsOnInsert", false);
mongoose
  .connect(
    uri,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    console.log(`DB running on ${uri}`)
  )
  .then(async () => {
    const admin1 = new UserModel({ email: "admin1@o2.pl", password: "haslo1" });
    const admin2 = new UserModel({ email: "admin2@o2.pl", password: "haslo2" });
    const admin3 = new UserModel({ email: "admin3@o2.pl", password: "haslo3" });
    const users = await UserModel.find();
    if (users.length === 0) {
      UserModel.create(admin1, admin2, admin3);
    }
    const app = express();
    app.use(express.json());
    app.use("/api", routes);
    // app.post("/advertisments", async (req, res) => {
    //   // const newTask = req.body;

    //   // // warto dodać sprawdzenie czy newTask posiada odpowiednie właściwości, gdy nie to zwracać kod 400 bez dodawania do bazy

    //   // const newAdd = new Advertisment({ ...req.body });
    //   // const result = await newAdd.save((err, result) => {
    //   //   if (err) {
    //   //     res.statusCode = status.INTERNAL_SERVER_ERROR;
    //   //   } else {
    //   //     res.statusCode = status.CREATED;
    //   //   }
    //   // });

    //   // res.send();
    // });
    app.listen(process.env.PORT, () => console.log("server started"));
  });

// main()
//   .then(() => {
//     app.get("/heartbeat", (req, res) => res.send(new Date()));

//     app.post("/advertisments", async (req, res) => {
//       const newAdvertisment = req.body;
//       // console.log(newAdvertisment);

//       // res.json({ requestBody: req.body });
//       // warto dodać sprawdzenie czy newAdvertisment posiada odpowiednie właściwości, gdy nie to zwracać kod 400 bez dodawania do bazy

//       await addNewAdvertisment(newAdvertisment);
//       // console.log(result);
//       // if (result) {
//       //   res.statusCode = status.CREATED;
//       // } else {
//       //   res.statusCode = status.INTERNAL_SERVER_ERROR;
//       // }

//       res.send();
//     });
//   })
//   .finally(() => {
//     app.get("/heartbeat", (req, res) => {
//       res.send(new Date());
//     });
//   });
