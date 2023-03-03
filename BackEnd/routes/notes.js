const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all the Notes using: GET "/api/auth/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2: Get all the Notes using: POST "/api/notes/addnotes". Login required
router.post('/addnotes', fetchuser, [
    body('title', "Title must be atlest 3 characters").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        note.saveNote = await note.save();

        res.json(note.saveNote);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
})

// ROUTE 3: Update an existing note: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a new note object.
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };


        // Find the note to be updated and update it.
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found!");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE 4: Delete an existing note using : DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it.
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found!");
        }
        // Allow deletion only if user owns this note.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ Success: "Note has been Deleted.", note: note });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

})


module.exports = router