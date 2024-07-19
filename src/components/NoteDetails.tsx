import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const NoteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:3000/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNote(response.data);
      } catch (err) {
        setError('Error fetching note');
        console.log(err)
        alert(`Note with note id ${id} does not exist or have been deleted`)
        navigate('/notes')
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="card mb-3 mt-3 br-3"  key={note.noteId}>
        <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.body}</p>
        </div>
    </div>
  );
};

export default NoteDetails;
