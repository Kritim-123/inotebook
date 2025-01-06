import express from "express";

const authRoute = express.Router()

authRoute.get("/", (req, res) => {

    const obj = {
        a : 'thios',
        number : 34
    };
    res.json (obj)
})

export {authRoute};