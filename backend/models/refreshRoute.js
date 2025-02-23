const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const refeshFunction = require("../routes-services/refreshStatus")

router.post("/refresh", async(req, res) => {
    try {
        refeshFunction()
    } catch (error) {
        res.status(400).json({"error": error})
    }
})

export default router
