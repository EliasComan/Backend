const express = require("express");
const path = require("path");
const productsModel = require("../../model/collections/colecctions.dao");

const routerproducts = express.Router();

routerproducts.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await productsModel.getByid(id.slice(1)).then((response) => {
      const product = response[0];
      if (req.isAuthenticated()) {
        res.render(path.resolve("./src/views/layouts/itemDetail.ejs"), {
          product,
          user: true,
        });
      } else {
        res.render(path.resolve("./src/views/layouts/itemDetail.ejs"), {
          product,
          user: false,
        });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
});
routerproducts.post("/", (req, res) => {
  try {
    products.save(req.body).then(() => {
      res.status(200).send({
        done: true,
      });
    });
  } catch (error) {
    res.status(500).send("Error");
  }
});

module.exports = routerproducts;
