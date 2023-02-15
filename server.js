require("dotenv").config();
require("./config/database");
const path = require("path");

const cors = require("cors");
const passport = require("passport");
const Router = require("./routes/routes");
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.static(path.join(__dirname, "storage")));
app.use(fileUpload());
app.use(express.json());
app.use(passport.initialize());
app.use("/api", Router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("SERVIDOR CORRIENDO EN PUERTO " + PORT);
});
