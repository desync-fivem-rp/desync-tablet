local Database = require 'server.utils.database'

local NotesModule = {}

-- Get notes for a player
function NotesModule.GetPlayerNotes(source)
    local identifier = GetPlayerIdentifier(source, 0)
    
    MySQL.query('SELECT * FROM tablet_notes WHERE owner_identifier = ? ORDER BY updated_at DESC', {
        identifier
    }, function(result)
        TriggerClientEvent('tablet:setNotes', source, result or {})
    end)
end

-- Save or update a note
function NotesModule.SaveNote(source, noteData)
    local identifier = GetPlayerIdentifier(source, 0)
    
    if noteData.id then
        -- Update existing note
        MySQL.query('UPDATE tablet_notes SET title = ?, content = ? WHERE id = ? AND owner_identifier = ?', {
            noteData.title, noteData.content, noteData.id, identifier
        })
    else
        -- Create new note
        local uuid = Database.GenerateUUID()
        MySQL.insert('INSERT INTO tablet_notes (id, owner_identifier, title, content) VALUES (?, ?, ?, ?)', {
            uuid, identifier, noteData.title, noteData.content
        })
        -- Return the new note ID
        TriggerClientEvent('tablet:noteCreated', source, uuid)
    end
end

-- Delete a note
function NotesModule.DeleteNote(source, noteId)
    local identifier = GetPlayerIdentifier(source, 0)
    
    MySQL.query('DELETE FROM tablet_notes WHERE id = ? AND owner_identifier = ?', {
        noteId, identifier
    })
end

-- Register events
RegisterNetEvent('tablet:getNotes', function()
    NotesModule.GetPlayerNotes(source)
end)

RegisterNetEvent('tablet:saveNote', function(noteData)
    NotesModule.SaveNote(source, noteData)
end)

RegisterNetEvent('tablet:deleteNote', function(noteId)
    NotesModule.DeleteNote(source, noteId)
end)

return NotesModule