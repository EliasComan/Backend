const productsModel = require("../../model/collections/collections.model");
const express = require("express");
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('public', 'uploads', 'images'))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.fieldname}.png`)
    }
})
const upload = multer({
    storage: storage
})

const adminController = express.Router()
adminController.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        let collectionsDatabase;
        productsModel.find()
            .then(res => {
                collectionsDatabase = res
            })
            .finally(() => {
                res.render(path.resolve('./src/views/admin.ejs'), {
                    collections: collectionsDatabase,
                    user: true
                })
            })

    } else {
        res.redirect('/')
    }
})

adminController.get('/addcollection', (req, res) => {
    let user = false
    req.isAuthenticated() ? user = true : user = false;
    res.render(path.resolve('./src/views/admin.ejs'), {
        collections: false,
        addcollection: true,
        user: user,
        upload: false
    })
})

adminController.post('/addcollection', upload.single('collectionImage'), async (req, res, next) => {
    if (req.isAuthenticated()) {
        let user = true
            try {
                let upload = false;
                console.log(req.file)
                let newCollection = {
                    name: req.body.collectionName,
                    description: req.body.collectionDescription,
                    image: 'http://localhost:8080/uploads/images/' + req.file.filename,
                    price:req.body.collectionPrice,

                }
                productsModel.insertMany(newCollection)
                    .finally(() => {
                        upload = true;
                        res.render(path.resolve('./src/views/admin.ejs'), {
                            collections: false,
                            addcollection: true,
                            user: user,
                            upload: upload
                        })

                    })
            } catch (error) {
                res.status(400).json({
                    msg: 'error'
                })
            }
    } else {
        res.redirect('/')

    }
})
adminController.post('/delete', async (req, res, next) => {
    if (req.isAuthenticated()) {
        try {
            const { id }  = req.body
          await productsModel.deleteOne({id:id})
            res.json({msg:'done'})
           } catch (error) {
            res.status(400).send(error)
        }
    } else {
        res.send('No tienes autorizacion para hacer esto')
    }
})




module.exports = adminController