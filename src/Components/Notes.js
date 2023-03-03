import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote'

export default function Notes(props) {

    const context = useContext(NoteContext);
    const { notes, getAllNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getAllNotes();
        }
        else
        {
            navigate("/");
        }
        // eslint-disable-next-line
    },[]);

    const ref = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click('toggle');
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Note updated Successfully", "success");
    }


    return (
        <div>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3' style={{ width: "400px"}} onSubmit={handleClick}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' onChange={onChange} value={note.etitle} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" onChange={onChange} id="edescription" name="edescription" value={note.edescription} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" onChange={onChange} id="etag" name="etag" value={note.etag} />
                                </div>
                                <div style={{float:"right"}}>
                                <button type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary mx-1" data-bs-dismiss="modal" >Update Note</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }} className="row my-3">
                <h3 style={{ textAlign: "center" }}>Your Notes</h3>
                {notes.length === 0 && 'No Notes to Display'}
                {notes.map((notes, index) => {
                    return (
                        <NoteItem key={index} notes={notes} updateNote={updateNote} showAlert={props.showAlert} />
                    )
                })}
            </div>
        </div>
    )
}
