import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
mongoose.set("strictQuery", true);
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const url =
  "mongodb+srv://oussama:aTgSBeXcUVQdZqvB@pfe.au3swy0.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected..."))
  .catch((error) => console.log("Error connecting to MongoDB: ", error));

app.use("/", routes);
app.get("/", (req, res) => {
  res.send("hello server !");
});
const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`app listening at http://localhost:${5000}`)
);
