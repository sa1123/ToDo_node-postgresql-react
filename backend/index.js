const express = require('express');
const cors = require('cors');
const knex = require('knex'); //for sql
require('dotenv').config({ path: '.env'});

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
    const { todoText } = req.body;
    db('todo')
        .insert({
            todo_content: todoText,
        })
        .then(() => {
            console.log("Todo added");
            return res.redirect('http://localhost:3000')
        })
        .catch((err) => {
            console.log(err);
        });
});

// DELETE: Delete todo
app.delete('/delete-todo', (req, res) => {
    const todo_id = req.body;
    const todo_id_to_delete = Number(todo_id.todo_id)
    db('todo')
        .where('todo_id', '=', todo_id_to_delete)
        .del()
        .then(() => {
            console.log("Todo deleted");
            return res.json({ msg: 'Todo deleted'});
        })
        .catch((err) => {
            console.log(err);
        });
});

// PUT: Update todo by todo_id from Db
app.put('/update-todo', (req, res) => {
    db('todo')
        .where('todo_id', '=', 1)
        .update({ todo: 'this is an update'})
        .then(() => {
            console.log("Updated");
            return res.json({ msg: 'Updated'});
        })
        .catch((err) => {
            console.log(err);
        });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));