const app = require("express")();
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectToDb = require("./config/ConnectDB");
const errorHandler = require("./Middlewares/ErrorHandler");

app.use(cors());

const PORT = process.env.PORT || 5000;
connectToDb();
app.use(require("express").json());

app.use("/api/songs", require("./Routes/SongRoute"));

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
