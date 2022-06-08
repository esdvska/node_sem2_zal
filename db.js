// npm i dotenv
// npm i mongoose
// gdy korzystamy z mongoose nie ma potrzeby instalowania mongo
require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_CONNECTION;

// definicja schematu kolecji bazodanowej
const AdvertismentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    completed: {
      type: Boolean,
      default: false, // wartość domyślna
    },
    createdTime: {
      type: Date,
      default: new Date(), // wartość domyślna
    },
    category: String,
    labels: [],
    price: Number,
    owner: {
      phoneNumber: String,
      createdTime: {
        type: Date,
        default: new Date(),
      },
      lastActivity: Date,
      valuation: {
        type: Number,
        // walidacja
        min: 0,
        max: 100,
        required: true,
      },
      email: String,
    },
    comments: [],
    location: {
      address: String,
      geo: {
        lat: Number,
        lng: Number,
      },
    },
    display: Number,
    valuation: {
      type: Number,
      // walidacja
      min: 0,
      max: 100,
      required: true,
    },
  },
  { timestamps: true } // automatyczne dodawanie włąściwości z czasem utworzenia i modyfikacji dokumentu w bazie
);

// middleware/hook wykonywany przed zapisam dokumentu
// TaskSchema.pre("save", function () {
//   console.log("task is going to be saved");
// });

// middleware/hook wykonywany po zapisie dokumentu
// TaskSchema.post("save", function () {
//   console.log("task saved");
// });

// tworzenie modelu danych dla konkretnej kolekcji na podstawie uprzednio stworzonego schematu
const AdvertismentModel = mongoose.model(
  "mongooseAdvertisments",
  AdvertismentSchema
); // pierwszy parametr to nazwa kolekcji w bazie danych

const main = async () => {
  mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const dbTest = mongoose.connection;
  dbTest.on("error", console.error.bind(console, "connection error:"));

  dbTest.once("open", function () {
    console.log("Connection Successful!");
  });
};

//   newTask.completed = true;
//   result = await newTask.save(); // aktualizacja wcześniej zapisanego dokumentu
//   console.log(result);

//   const tasks = await TaskModel.find(); // pobranie wszystkich dokumentów z kolekcji
//   tasks.forEach((task) => {
//     console.table(task);
//   });

//   await TaskModel.deleteMany({ completed: "true" }); // usunięcie z bazy wszystkich dokumentów z właściwością completed = true

const addNewAdvertisment = async (newAdvertisment) => {
  try {
    // const newAdvertisment = new AdvertismentModel({
    //   title: "Lorem ipsum",
    //   description: "Lorem ipsum",
    //   completed: false,
    //   createdTime: new Date(),
    //   category: "clothing",
    //   labels: ["test", "2022"],
    //   price: 24,
    //   owner: {
    //     phoneNumber: "+48 673 329 233",
    //     createdTime: new Date(),
    //     lastActivity: new Date(),
    //     valuation: 89,
    //     email: "halo@halo.pl",
    //   },
    //   comments: ["great"],
    //   location: {
    //     address: "Brukowa 4",
    //     geo: {
    //       lat: 98,
    //       lng: 67,
    //     },
    //   },
    //   display: 980,
    //   valuation: 100,
    // });
    // const newAdd = new AdvertismentSchema({ ...newAdvertisment });
    let result = await newAdvertisment.save((err, data) => {
      if (err) throw err;
      res.json(data);
    }); // zapis do bazy nowego dokumentu
    console.log(result + "WYNIK!!!!!");
  } catch {
    (err) => console.log(err + "COŚ NIE DZIAŁA");
  }
};
module.exports = {
  main,
  addNewAdvertisment,
};
