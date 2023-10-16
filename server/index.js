require('dotenv').config();
const express = require('express');
const app= express();
const cors = require('cors');
const connection = require('./db');
// const userRoutes = require("./routes/users");
// const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products")

connection();

app.use(express.json());
app.use(cors());

// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes)


app.use((err, req, res, next) => {
    // Handle and send error response
    console.error(err.stack); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  });


const port = process.env.PORT || 8080;
app.listen(port,()=> console.log(`Listening on port ${port}...`));
