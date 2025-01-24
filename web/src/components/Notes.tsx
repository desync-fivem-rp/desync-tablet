import React, { useState, useEffect } from 'react';
import { fetchNui } from '../utils/fetchNui';
import { IoSaveOutline, IoAddOutline, IoTrashOutline } from 'react-icons/io5';
import './Notes.css';

interface Note {
    id?: string;
    title: string;
    content: string;
}

interface NotesProps {
    id: string;
    noteId?: string;
    onClose: () => void;
    onSave?: (note: Note) => void;
    onTitleChange?: (title: string) => void;
}

const Notes: React.FC<NotesProps> = ({ id, noteId, onClose, onSave, onTitleChange }) => {
    const [note, setNote] = useState<Note>({ title: '', content: '' });
    const [allNotes, setAllNotes] = useState<Note[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const loadNotes = async () => {
        try {
            const notes = await fetchNui<Note[]>('getNotes');
            console.log("notes: " + (notes))
            setAllNotes(notes);
        } catch (error) {
            console.error('Failed to load notes:', error);
        }
    };

    useEffect(() => {
        loadNotes();
    }, []);

    useEffect(() => {
        if (noteId) {
            const currentNote = allNotes.find(n => n.id === noteId);
            if (currentNote) setNote(currentNote);
        }
    }, [noteId, allNotes]);

    useEffect(() => {
        console.log('All Notes:', allNotes);
    }, [allNotes]);

    const handleSave = async () => {
        if (isSaving) return; // Prevent multiple saves if already saving

        setIsSaving(true);
        try {
            const response = await fetchNui('saveNote', {
                id: note.id,
                title: note.title || 'Untitled Note',
                content: note.content
            });

            // if (response.success) {
            //     if (!note.id && response.noteId) {
            //         setNote(prev => ({ ...prev, id: response.noteId }));
            //     }
            //     if (onSave) onSave(note);
            //     await loadNotes();
            // }
        } catch (error) {
            console.error('Failed to save note:', error);
        } finally {
            // Set a timeout to reset isSaving after 1 second
            setTimeout(() => setIsSaving(false), 1000);
        }
    };

    const handleDelete = async (id: string) => {
        await fetchNui('deleteNote', { id });
        await loadNotes();
        if (id === note.id) {
            setNote({ title: '', content: '' });
        }
    };

    const handleNoteChange = (changes: Partial<Note>) => {
        const updatedNote = { ...note, ...changes };
        setNote(updatedNote);
        if (changes.title && onTitleChange) {
            onTitleChange(changes.title || 'Untitled Note');
        }
    };

    const handleNoteSelect = (selectedNote: Note) => {
        setNote(selectedNote);
        if (onTitleChange) {
            onTitleChange(selectedNote.title || 'Untitled Note');
        }
    };

    const createNewNote = () => {
        const newNote = { title: 'Untitled Note', content: '' };
        setNote(newNote);
        if (onTitleChange) {
            onTitleChange('Untitled Note');
        }
    };

    return (
        <div className="notes-container">
            <div className="notes-explorer">
                <div className="explorer-header">
                    <span className="explorer-title">EXPLORER</span>
                    <button className="icon-button" onClick={createNewNote}>
                        <IoAddOutline />
                    </button>
                </div>

                <div className="notes-list">
                    {allNotes.map(n => (
                        <div 
                            key={n.id} 
                            className={`note-list-item ${n.id === note.id ? 'active' : ''}`}
                            onClick={() => handleNoteSelect(n)}
                        >
                            <span className="note-title-text">{n.title || 'Untitled'}</span>
                            <button 
                                className="delete-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (n.id) handleDelete(n.id);
                                }}
                            >
                                <IoTrashOutline />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="editor-container">
                <div className="editor-toolbar">
                    <div className="toolbar-left">
                        <span className="current-file">{note.title || 'Untitled'}</span>
                    </div>
                    <div className="toolbar-right">
                        <button 
                            className="save-button"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            <IoSaveOutline />
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>

                <div className="editor-content">
                    <input
                        type="text"
                        className="editor-title"
                        value={note.title}
                        onChange={(e) => handleNoteChange({ title: e.target.value })}
                        placeholder="Note Title"
                    />
                    <textarea
                        className="editor-text"
                        value={note.content}
                        onChange={(e) => handleNoteChange({ content: e.target.value })}
                        placeholder="Start typing..."
                    />
                </div>
            </div>
        </div>
    );
};

export default Notes;