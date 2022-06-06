// Wykorzystując bazę danych MongoDB, stwórzmy aplikację typu lista zadań (todo list), wykonaną w podejściu REST API. Aplikacja powinna pozwalać na:

// dodanie nowego dokumentu do naszej bazy w postaci:
// {
// 	"task": "naprawić samochód",
// 	"description": "coś stuka po lewej",
// 	"isCompleted": false,
// 	"createdTime": "05-05-2022"
// }
// zmodyfikowanie zadania - poprzez określenie czy dane zadanie zostało wykonane
// {
// 	"isCompleted": true
// }
// usunięcie zadania
// pobranie wszystkich zadań
// pobranie pojedynczego zadania

require("dotenv").config();

const express = require("express");
const status = require("http-status");

const { main, addNewAdvertisment } = require("./db");
const app = express();

app.use(express.json());

main()
  .then(() => {
    app.get("/heartbeat", (req, res) => res.send(new Date()));

    app.post("/advertisments", async (req, res) => {
      const newAdvertisment = req.body;

      // warto dodać sprawdzenie czy newAdvertisment posiada odpowiednie właściwości, gdy nie to zwracać kod 400 bez dodawania do bazy

      const result = await addNewAdvertisment(newAdvertisment);

      if (result.insertedCount === 1) {
        res.statusCode = status.CREATED;
      } else {
        res.statusCode = status.INTERNAL_SERVER_ERROR;
      }

      res.send();
    });
  })
  .finally(() => {
    app.get("/heartbeat", (req, res) => {
      res.send(new Date());
    });

    app.listen(process.env.PORT, () => console.log("server started"));
  });
