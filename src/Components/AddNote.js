import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';

export default function AddNote(props) {

  const context = useContext(NoteContext);
  const { addNote } = context;

  const handleClick = (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let tag = document.getElementById('tag').value;
    addNote(title, description, tag);
    props.showAlert("Note Added Successfully","success");
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('tag').value = "";
  }

  return (
    <div>
      <h3 style={{textAlign:"center"}}>Add a Note</h3>
      <div className="container my-3" style={{display:"flex",justifyContent:"center"}}>
        <form className='my-3' style={{width:"500px",height:"300px"}} onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" />
          </div>
          <button type="submit" className="btn btn-primary addBtn">Add Note</button>
        </form>
      </div>
    </div>
  )
}