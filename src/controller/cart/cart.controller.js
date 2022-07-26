const express = require("express");
const path = require("path");
const userModel = require("../../model/users/users.model");
const productsModel = require("../../model/collections/collections.model");

const cartRouter = express.Router();

cartRouter.get("/", async (req, res, next) => {
    if (req.isAuthenticated()) {
        const getCart = await userModel.findById(req.user.id);
        if (getCart.cart[0] === undefined) {
            res.render(path.resolve("./src/views/layouts/cart.ejs"), {
                user: req.user,
                cart: false,
            });
        } else {
            res.render(path.resolve("./src/views/layouts/cart.ejs"), {
                user: req.user,
                cart: getCart.cart,
            });
        }
    } else {
        res.status(400).json("Necesitas estar logeado para acceder");
    }
});
cartRouter.post("/", async (req, res, next) => {
    if (req.isAuthenticated()) {
        try {
            const idProduct = req.body.id;
            const qnty = req.body.qnty;
            const {
                cart
            } = await userModel.findById(req.user.id);
            const product = await productsModel.findById(idProduct);
            const {
                id,
                name,
                image
            } = product;
            const filterCart = cart.filter((product) => product._id != id);
            await userModel
                .updateMany({
                    _id: req.user.id
                }, {
                    cart: [
                        ...filterCart,
                        {
                            _id: id,
                            name: name,
                            qnty: qnty,
                            image: image,
                        },
                    ],
                })
                .then(() => res.json({
                    msg: "Done"
                }));
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        res.json("No tienes autorizacion para hacer esto");
    }
});

cartRouter.post("/delete", async (req, res, next) => {
    if (req.isAuthenticated()) {
        try {
            const {
                id
            } = req.body;
            const {
                cart
            } = await userModel.findById(req.user.id);
            const newCart = cart.filter((product) => product._id != id);
            await userModel
                .updateMany({
                    _id: req.user.id
                }, {
                    cart: newCart
                })
                .then(() => {
                    res.json("donde");
                });
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        res.json("No tienes autorizacion para hacer esto");
    }
});

module.exports = cartRouter;