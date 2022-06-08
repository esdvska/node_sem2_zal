const express = require("express");
const router = express.Router();
const Advertisment = require("../models/Advertisment");
const status = require("http-status");
const _ = require("lodash");
router.post("/advertisments", async (req, res) => {
  // console.log(req.body);

  const newAdd = new Advertisment({ ...req.body });
  const result = await newAdd.save((err, result) => {
    if (err) {
      res.statusCode = status.INTERNAL_SERVER_ERROR;
    } else {
      res.statusCode = status.CREATED;
    }
  });

  res.send();
});

router.get("/heartbeat", (req, res) => res.send(new Date()));

router.get("/advertisments", async (req, res) => {
  const adds = await Advertisment.find();
  res.send(adds);
});

router.get("/advertisments/:id", async (req, res) => {
  try {
    const advertisment = await Advertisment.findOne({ _id: req.params.id });
    console.log(advertisment + "hekj");
    if (advertisment) {
      res.status(200).send(advertisment);
    } else {
      res.status(204).send("Advertisment doesn't exist!");
    }
  } catch {
    res.statusCode = status.INTERNAL_SERVER_ERROR;
    res.send();
  }
});

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

router.patch("/advertisments/:id", async (req, res) => {
  try {
    const advertisment = await Advertisment.findOne({ _id: req.params.id });

    console.log(_.difference(req.body, advertisment));
    // if (req.body.title) {
    //   advertisment.title = req.body.title;
    // }

    // if (req.body.content) {
    //   advertisment.content = req.body.content;
    // }

    // await advertisment.save();
    // res.send(advertisment);
  } catch {
    res.statusCode = status.INTERNAL_SERVER_ERROR;
    res.send();
    console.log(res);
  }
});
module.exports = router;
