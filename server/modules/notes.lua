-- local Database = require '@desync-tablet/server/utils/database'

local NotesModule = {}

-- Get notes for a player
function NotesModule.GetPlayerNotes(source)
    local identifier = GetPlayerIdentifier(source, 0)
    local player = Ox.GetPlayer(source)
    local id = player.charId
    local result = MySQL.query.await('SELECT * FROM tablet_notes WHERE charId = ?', {
        id
    })
    -- print("result: " .. json.encode(result))
    -- TriggerClientEvent('tablet:setNotes', source, result or {})
    return result
end

-- Save or update a note
function NotesModule.SaveNote(source, noteData)
    local identifier = GetPlayerIdentifier(source, 0)
    local player = Ox.GetPlayer(source)
    local id = player.charId
    print(id)
    if noteData.id then
        -- Update existing note
        MySQL.query('UPDATE tablet_notes SET title = ?, content = ? WHERE id = ? AND charId = ?', {
            noteData.title, noteData.content, noteData.id, id
        })
    else
        -- Create new note
        MySQL.insert('INSERT INTO tablet_notes (charId, owner_identifier, title, content) VALUES (?, ?, ?, ?)', {
            id, identifier, noteData.title, noteData.content
        })
        -- Return the new note ID
        TriggerClientEvent('tablet:noteCreated', source, noteData.id)
    end
end

-- Delete a note
function NotesModule.DeleteNote(source, noteId)
    local identifier = GetPlayerIdentifier(source, 0)
    
    MySQL.query('DELETE FROM tablet_notes WHERE id = ? AND owner_identifier = ?', {
        noteId, identifier
    })
end

lib.callback.register('tablet:getNotes', function(source)
    return NotesModule.GetPlayerNotes(source)
end)

-- Register events
-- RegisterNetEvent('tablet:getNotes', function()
--     NotesModule.GetPlayerNotes(source)
-- end)

RegisterNetEvent('tablet:saveNote', function(noteData)
    NotesModule.SaveNote(source, noteData)
end)

RegisterNetEvent('tablet:deleteNote', function(noteId)
    NotesModule.DeleteNote(source, noteId)
end)

return NotesModule