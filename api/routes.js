const express = require("express");
const router = express.Router();
const Advertisment = require("../models/Advertisment");
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
    }
    if (req.query.title) {
      console.log(req.query.title);
      const advertisments = await Advertisment.find({
        title: req.query.title,
      });

      if (advertisments.length > 0) {
        res.status(200).send(advertisments);
      } else {
        return res
          .status(404)
          .send({ error: "Advertisments with this title don't exist!" });
      }
    }
    res.statusCode = status.NO_CONTENT;
    res.send();
  } catch {
    res.statusCode = status.INTERNAL_SERVER_ERROR;
    res.send();
  }
});
module.exports = router;
