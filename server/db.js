const mongoose = require("mongoose");
const product=require('./models/product')
module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        await mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to the database successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};