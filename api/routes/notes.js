const express = require('express');
// const { default: UserPage } = require('../../frontend/src/Components/Pages/userPage');

const {addNote, getNotes, deleteNote} = require('../models/Notes');

const router = express.Router();


router.get('/', (req, res) => {
    const userNote = getNotes(3);
    console.log(userNote)
    return res.json(userNote);
});

// AJOUTER UNE NOTE 

  router.post('/', (req, res) => {
    const {note} = req.body;
    const newNote = addNote(note, 3);
    console.log(newNote)
    return res.json(newNote);
});

router.delete('/:idNote', (req, res) => {
  const {idNote} = req.params;
  const deletedNote = deleteNote(idNote);
  return res.json(deletedNote);
});


module.exports = router;
