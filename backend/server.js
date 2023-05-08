const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/users/login', userRoutes);

const port = process.env.PORT || 3000;

const mongoURI = "mongodb://localhost:27017/ProjetoEniac";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
