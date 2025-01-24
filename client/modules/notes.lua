local NotesModule = {
    notes = {}
}

-- Handle receiving notes from server
RegisterNetEvent('tablet:setNotes', function(receivedNotes)
    print("receivedNotes: " .. json.encode(receivedNotes))
    NotesModule.notes = receivedNotes
    print("NotesModule.notes: " .. json.encode(NotesModule.notes))
    SendReactMessage('setAllNotes', NotesModule.notes)
end)

-- Handle note creation confirmation
RegisterNetEvent('tablet:noteCreated', function(noteId)
    SendReactMessage('noteCreated', noteId)
end)

-- NUI Callbacks
RegisterNUICallback('saveNote', function(data, cb)
    print(json.encode(data))
    TriggerServerEvent('tablet:saveNote', data)
    cb({success = true})
end)

RegisterNUICallback('deleteNote', function(data, cb)
    TriggerServerEvent('tablet:deleteNote', data.id)
    cb({success = true})
end)

RegisterNUICallback('getNotes', function(_, cb)
    local notes = lib.callback.await('tablet:getNotes', false)
    print("notes: " .. json.encode(notes))
    cb(notes)
end)

return NotesModule