// npm i dotenv
// npm i mongoose
// gdy korzystamy z mongoose nie ma potrzeby instalowania mongo
require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_CONNECTION;

// definicja schematu kolecji bazodanowej
// const TaskSchema = new mongoose.Schema(
//   {
//     task: String,
//     description: String,
//     completed: {
//       type: Boolean,
//       default: false, // wartość domyślna
//     },
//     createdTime: {
//       type: Date,
//       default: new Date(), // wartość domyślna
//     },
//     value: {
//       type: Number,
//       // walidacja
//       min: 10,
//       max: 100,
//       required: true,
//     },
//   },
//   { timestamps: true } // automatyczne dodawanie włąściwości z czasem utworzenia i modyfikacji dokumentu w bazie
// );

// middleware/hook wykonywany przed zapisam dokumentu
// TaskSchema.pre("save", function () {
//   console.log("task is going to be saved");
// });

// middleware/hook wykonywany po zapisie dokumentu
// TaskSchema.post("save", function () {
//   console.log("task saved");
// });

// tworzenie modelu danych dla konkretnej kolekcji na podstawie uprzednio stworzonego schematu
// const TaskModel = mongoose.model("mongooseTasks", TaskSchema); // pierwszy parametr to nazwa kolekcji w bazie danych

async function main() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  //   const newTask = new TaskModel({
  //     task: "my new mongoose task 2",
  //     description: "task description 2",
  //     value: 20,
  //   });

  //   let result = await newTask.save(); // zapis do bazy nowego dokumentu
  //   console.log(result);

  //   newTask.completed = true;
  //   result = await newTask.save(); // aktualizacja wcześniej zapisanego dokumentu
  //   console.log(result);

  //   const tasks = await TaskModel.find(); // pobranie wszystkich dokumentów z kolekcji
  //   tasks.forEach((task) => {
  //     console.table(task);
  //   });

  //   await TaskModel.deleteMany({ completed: "true" }); // usunięcie z bazy wszystkich dokumentów z właściwością completed = true
}

main().catch((err) => console.log(err));
