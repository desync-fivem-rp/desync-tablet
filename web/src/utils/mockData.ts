import { isEnvBrowser } from './misc';

interface MockNote {
    id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

const STORAGE_KEY = 'tablet_notes';

export const mockNotes = {
    getNotes: (): MockNote[] => {
        if (!isEnvBrowser()) return [];
        try {
            const notes = localStorage.getItem(STORAGE_KEY);
            return notes ? JSON.parse(notes) : [];
        } catch (error) {
            console.error('Error loading notes:', error);
            return [];
        }
    },

    saveNote: (note: Partial<MockNote>): { success: boolean; noteId?: string } => {
        if (!isEnvBrowser()) return { success: false };
        try {
            const notes = mockNotes.getNotes();
            const now = new Date().toISOString();

            if (note.id) {
                // Update existing note
                const updatedNotes = notes.map(n => 
                    n.id === note.id 
                        ? { ...n, ...note, updated_at: now }
                        : n
                );
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
                return { success: true, noteId: note.id };
            } else {
                // Create new note
                const newNote = {
                    id: `local-${Date.now()}`,
                    title: note.title || '',
                    content: note.content || '',
                    created_at: now,
                    updated_at: now,
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify([...notes, newNote]));
                return { success: true, noteId: newNote.id };
            }
        } catch (error) {
            console.error('Error saving note:', error);
            return { success: false };
        }
    },

    deleteNote: (id: string): boolean => {
        if (!isEnvBrowser()) return false;
        try {
            const notes = mockNotes.getNotes();
            const filteredNotes = notes.filter(n => n.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
            return true;
        } catch (error) {
            console.error('Error deleting note:', error);
            return false;
        }
    }
};