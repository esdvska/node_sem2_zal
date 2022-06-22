const express = require("express");
const router = express.Router();
const Advertisment = require("../models/Advertisment");
const UserModel = require("../models/UserModel");
const status = require("http-status");
const _ = require("lodash");

//dodawanie ogłoszenia
router.post("/advertisments", async (req, res) => {
  const newAdd = new Advertisment({ ...req.body });
  const result = await newAdd.save((err, result) => {
    if (err) {
      res.statusCode = status.INTERNAL_SERVER_ERROR;
    } else {
      res.statusCode = status.CREATED;
      res.send(result);
    }
  });
});

//heartbeat
router.get("/heartbeat", (req, res) => res.send(new Date()));

//wyszukiwanie wszystkich ogloszeń
router.get("/advertisments", async (req, res) => {
  const adds = await Advertisment.find();
  res.send(adds);
});

router.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
});

router.delete("/users", async (req, res) => {
  const users = await UserModel.deleteMany({ haslo: "haslo1" });
  res.send(users);
});
//wyszukiwanie ogłoszenia po id
router.get("/advertisments/:id", async (req, res) => {
  try {
    const advertisment = await Advertisment.findOne({ _id: req.params.id });

    if (advertisment) {
      res.status(200).send(advertisment);
    } else {
      return res.status(404).send({ error: "Advertisment doesn't exist!" });
    }
  } catch {
    res.statusCode = status.INTERNAL_SERVER_ERROR;
    res.send();
  }
});

//usuwanie ogłoszenia
router.delete("/advertisments/:id", async (req, res) => {
  try {
    const advertisment = await Advertisment.findOne({ _id: req.params.id });
    if (advertisment) {
      await Advertisment.deleteOne({ _id: req.params.id });
      res.status(204).send();
    } else {
      res.status(404);
      res.send({ error: "Advertisment doesn't exist!" });
    }
  } catch {
    res.statusCode = status.INTERNAL_SERVER_ERROR;
    res.send();
  }
});

//aktualizacja ogłoszenia
router.patch("/advertisments/:id", async (req, res) => {
  try {
    // const advertisment = await Advertisment.findOne({ _id: req.params.id });
    await Advertisment.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true,
    });
    res.statusCode = status.NO_CONTENT;
    res.send();
  } catch {
    res.statusCode = status.INTERNAL_SERVER_ERROR;
    res.send();
  }
});

router.get("/advertisment", async (req, res) => {
  try {
    if (!req.query) {
      res.statusCode = status.UNPROCESSABLE_ENTITY;
      res.send({ error: "Required query params missing" });
    } else {
      const advertisments = [];

      const {
        title,
        description,
        createdFrom,
        createdTo,
        priceFrom,
        priceTo,
        ownerName,
      } = req.query;
      if (title) {
        advertisments.push(
          await Advertisment.find({
            title: { $regex: "^" + title, $options: "i" },
          })
        );
      }

      if (description) {
        advertisments.push(
          await Advertisment.find({
            description: { $regex: "^" + description, $options: "i" },
          })
        );
      }

      if (ownerName) {
        advertisments.push(
          await Advertisment.find({
            "owner.name": { $regex: "^" + ownerName, $options: "i" },
          })
        );
      }
      if (createdFrom && createdTo) {
        let datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

        if (datePattern.test(createdFrom) && datePattern.test(createdTo)) {
          advertisments.push(
            await Advertisment.find({
              createdTime: {
                $gte: `${createdFrom}T00:00:00.978Z`,
                $lt: `${createdTo}T23:59:59.978Z`,
              },
            })
          );
        } else {
          res.statusCode = status.UNPROCESSABLE_ENTITY;
          res.send({
            error:
              "Wrong date format,date parameter should be in this format: YYYY/MM/DD",
          });
        }
      }

      if (priceFrom && priceTo) {
        console.log(parseFloat(priceTo));
        if (!isNaN(parseFloat(priceFrom)) && !isNaN(parseFloat(priceTo))) {
          advertisments.push(
            await Advertisment.find({
              price: {
                $gte: priceFrom,
                $lt: priceTo,
              },
            })
          );
        } else {
          res.statusCode = status.UNPROCESSABLE_ENTITY;
          res.send({
            error: "Price should be of type number",
          });
        }
      }
      if (advertisments.length > 0) {
        res.status(200).send(advertisments);
      } else {
        return res
          .status(404)
          .send({ error: "Advertisments with this criteria don't exist." });
      }
    }
  } catch {
    res.statusCode = status.INTERNAL_SERVER_ERROR;
    res.send();
  }
});
module.exports = router;
