import express from "express";

const noteRoute = express.Router()

noteRoute.get("/", (req, res) => {

    const obj = {
        a : 'notes',
        number : 34
    };
    res.json (obj)
})

export {noteRoute};