import express from "express";
import cors from "cors";
import mainRouter from "./routers";
import dotenv from "dotenv";
dotenv.config();
const app= express();
app.use(cors());
app.use(express.json());


app.use("/api/v1",mainRouter);

const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`App is listening on the port ${PORT}`);
})
