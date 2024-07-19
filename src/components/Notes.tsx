import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Notes: React.FC= () =>{
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modaltitle, setmodalTitle] = useState('');
  const [modalbody, setmodalBody] = useState('');
  const [modaltags, setmodalTags] = useState('');
  const [modalnoteid, setmodalnoteId]= useState('');
  const [isUpdated, setisUpdated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      try{
        const response = await axios.get('http://localhost:3000/notes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotes(response.data);
        console.log(response.data)
      }
      catch(err){
        console.log(err)
      }
      
      
    };
    fetchNotes();
  }, [isUpdated]);

  const handleDelete = async (noteId: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.filter(note => note.noteId !== noteId));
    } catch (err) {
      alert('Error deleting note');
    }
    
  };
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const note = await axios.put(`http://localhost:3000/notes/${modalnoteid}`, {modaltitle, modalbody, tags: modaltags},
        { headers: { Authorization: `Bearer ${token}` }
      });
      if(note){
        setisUpdated(true)
      }
      
      await handleClose();
      
    } catch (err) {
      alert('Error updating note');
    }

  }
  const handleOpen = async(note:any)=>{
    console.log('opening')
    setmodalnoteId(note.noteId)
    setmodalTitle(note.title)
    setmodalBody(note.body)
    setmodalTags(note.tags)
    setisModalOpen(true);
  }
  const handleClose = async()=>{
    setisModalOpen(false);
    setisUpdated(false)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:3000/notes', { title, body, tags: tags.split(',') }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes([...notes, response.data]);
      setTitle('');
      setBody('');
      setTags('');
    } catch (err) {
      console.log(err)
      alert('Error creating note. Please ensure that all fields are filled.');
    }
  };

  return (
    <div className="container ">
      <div className="container mt-3 mb-3">
        <form onSubmit={handleSubmit}>
          <h1>Create Note</h1>
          <div className="mb-3 form-outline" >
            <label>Title</label>
            <input className="mb-3 form-control" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
          </div>
          <div className="mb-3 form-outline">
            <label>Body</label>
            <textarea className='mb-3 form-control' value={body} onChange={e => setBody(e.target.value)} placeholder="Body" required />
          
          </div>
          <div className="mb-3 form-outline">
            <label>Tags</label>
            <input className='mb-3 form-control' type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated)" />
          
          </div>
          <button className="btn btn-primary" type="submit">Create</button>
        </form>
      </div>
      
      <div className='container'>
        <h1 className='mt-3'>Notes</h1>
        <ul>
          {notes.map(note => (

          <div className="card mb-3" key={note.noteId}>
              <div className='card-header'>
                <Link to={`/notes/${note.noteId}`}>
                  <h5 className="card-title">{note.title}</h5>
                </Link>
              </div>
              
              <div className="card-body">
              <p className="card-text">{note.body}</p>
              <a onClick={() => handleOpen(note)} className="btn btn-info m-2" data-bs-toggle="modal" data-bs-target="#myModal" >Update</a>
              <a onClick={() => handleDelete(note.noteId)} className="btn btn-danger m-2" id={`delete-${note.noteId}`}>Delete</a>
           
            </div>
          </div>

          ))}
        </ul>
      </div>
      <div className={`modal fade ${isModalOpen ? 'show d-block' : 'd-none'}`} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Notes</h5>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="modal-body">
              
                <div className="mb-3 form-outline" >
                  <label>Title</label>
                  <input className="mb-3 form-control" type="text" value={modaltitle} onChange={e => setmodalTitle(e.target.value)} placeholder="Title" required />
                </div>
                <div className="mb-3 form-outline">
                  <label>Body</label>
                  <textarea className='mb-3 form-control' value={modalbody} onChange={e => setmodalBody(e.target.value)} placeholder="Body" required />
                
                </div>
                <div className="mb-3 form-outline">
                  <label>Tags</label>
                  <input className='mb-3 form-control' type="text" value={modaltags} onChange={e => setmodalTags(e.target.value)} placeholder="Tags (comma separated)" />
                
                </div>
              
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Notes;
