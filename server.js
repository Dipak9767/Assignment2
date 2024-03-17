const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB connection

mongoose.connect('mongodb+srv://dipakfirake9767:dipak9767@cluster0.oaqeyei.mongodb.net/task')
.then(()=> console.log('DB is Connected'))
.catch((e)=> console.log(e))

const noteSchema = new mongoose.Schema({
  content: String,
});

const Note = mongoose.model('Note', noteSchema);

// Routes
app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const newNote = new Note({ content: req.body.content });
  await newNote.save();
  res.status(201).json(newNote);
});

app.put('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const updatedNote = await Note.findByIdAndUpdate(id, { content }, { new: true });
      res.json(updatedNote);
    } catch (error) {
      res.status(400).send("Error updating note");
    }
  });
  
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
