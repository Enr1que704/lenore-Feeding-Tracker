// Entry point file
import express, { query, Request, Response } from "express";
import cors from "cors";
import { pgquery } from "../dbConnection";
import pool from "../dbConfig";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/db/getAll", async(req: Request, res: Response) => {
    let result = await pool.query("SELECT * FROM feeds");
    res.json(result.rows);
});

app.post("/db/addEntry", async(req: Request, res: Response) => {
    let id = crypto.randomUUID();
    let { date, time, amount, medicine, probiotic } = req.body;
    let result = await pool.query("INSERT INTO feeds (id, date, time, amount, medicine, probiotic) VALUES ($1, $2, $3, $4, $5, $6)", [id, date, time, amount, medicine, probiotic]);
    res.json(result.rows);
});



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
