const express = require('express');
const cors = require('cors');
const knex = require('knex'); //for sql
require('dotenv').config({ path: './.env'});

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    },
});

const app = express();
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(cors());

// GET: Fetch all notes
app.get('/', (req, res) => {
    db.select('*')
        .from('todo')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// GET: Fetch note by id
app.get('/:todo_id', (req, res) => {
    const todo_id = req.params.todo_id;
    db.select("*")
        .from('todo')
        .where('todo_id', '=', todo_id)
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// POST: Create new todo
app.post('/add-todo', (req, res) => {
    const { todo_note } = req.body;
    db('todo')
        .insert({
            todo: todo_note,
        })
        .then(() => {
            console.log("Todo added");
            return res.json({ msg: 'Todo added'});
        })
        .catch((err) => {
            console.log(err);
        });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));