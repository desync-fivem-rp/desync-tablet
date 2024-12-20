import React, { useState, useEffect } from 'react';
import { fetchNui } from '../utils/fetchNui';
import './NotesOverview.css';

interface Note {
    id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

interface NotesOverviewProps {
    onOpenNote: (noteId: string, title: string) => void;
}

const NotesOverview: React.FC<NotesOverviewProps> = ({ onOpenNote }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const loadNotes = async () => {
        const fetchedNotes = await fetchNui<Note[]>('getNotes');
        setNotes(fetchedNotes);
    };

    useEffect(() => {
        loadNotes();
    }, []);

    const handleDeleteNote = async (noteId: string) => {
        await fetchNui('deleteNote', { id: noteId });
        loadNotes(); // Refresh notes list
    };

    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="notes-overview">
            <div className="notes-search">
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="notes-list">
                {filteredNotes.map(note => (
                    <div key={note.id} className="note-item">
                        <div 
                            className="note-item-content"
                            onClick={() => onOpenNote(note.id, note.title)}
                        >
                            <h3>{note.title || 'Untitled Note'}</h3>
                            <p>{note.content.substring(0, 100)}...</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesOverview;
