import {useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:3001"
    const [notes, setNotes] = useState([]);

    // Get all Notes
    const getAllNotes = async () => {
        // API Call
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API Call
        const url = `${host}/api/notes/addnotes`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body:JSON.stringify({title,description,tag})
            
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }


    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });
        // eslint-disable-next-line
        const json = await response.json();
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);

    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const url = `${host}/api/notes/updatenote/${id}`
        // eslint-disable-next-line
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tag})
        });

        let newNotes = JSON.parse(JSON.stringify(notes));

        // Logic to edit in Client.
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;