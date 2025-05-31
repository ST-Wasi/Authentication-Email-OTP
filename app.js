const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");
app.use(express.json());
app.use(routes);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});


