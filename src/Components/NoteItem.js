import React,{useContext} from 'react'
import './style.css'
import NoteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
    const { notes,updateNote } = props;
    const context = useContext(NoteContext);
    const {deleteNote} = context;

    return (
        <div className="card mx-3 my-3" style={{ width: "18rem" }}>
            <div className="card-body">
                <div className="d-flex align-items-center" >
                    <h5 className="card-title" style={{width:"70%"}}>{notes.title}</h5>
                    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{
                        deleteNote(notes._id);props.showAlert("Note deleted Successfully","success");
                        }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(notes)}}></i></div>
                <h6 className="card-subtitle mb-2 text-muted">{notes.tag}</h6>
                <p className="card-text">{notes.description}</p>

            </div>
        </div>

    )
}
