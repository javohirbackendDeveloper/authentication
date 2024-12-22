const express = require("express");
const cors = require("cors");
const connectDB = require("./db/config");
const crudRouter = require("./router/crud.routes");
const authRouter = require("./router/auth.routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// routers
app.use(crudRouter);
app.use(authRouter);

connectDB();
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log("server is running on the http://localhost:" + PORT);
});
