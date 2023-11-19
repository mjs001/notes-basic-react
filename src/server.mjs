import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import "dotenv/config";
import cors from "cors";
const app = express();
// NEED TO FINISH
// get cors error to go away
// get rid of issues with axios and get it to save to db and pull from db
app.use(cors({ credentials: true }));
const port = 8000;

const db = new pg.Client(process.env.DATABASE_URL);
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var todos = [];

app.get("/health", (req, res) => {
  res.sendStatus(200);
});

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM notesreact");
    todos = result.rows;
    res.send(todos);
  } catch (err) {
    console.error(err);
  }
});

app.post("/add", async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO notesreact (title, content) VALUES ($1, $2)",
      [title, content]
    );
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log("ID in server", id);
  try {
    const result = await db.query("DELETE FROM notesreact WHERE id=($1)", [id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
