import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import noteRoutes from "./routes/note.routes.js";
import taskRoutes from "./routes/task.routes.js";
import eventRoutes from "./routes/event.routes.js";

const app = express();
const port = 3000;

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "16mb" }));
app.use(cors());

// db connection from mongodb atlas
try {
    mongoose.connect(process.env.DATABASE);
    console.log("mongodb connected successfully");
} catch (error) {
    console.error(error);
}

// routes
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/user", userRoutes);
app.use("/note", noteRoutes);
app.use("/task", taskRoutes);
app.use("/event", eventRoutes);

// server.listen(port, () => {
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
