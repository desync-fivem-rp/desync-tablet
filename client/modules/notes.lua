local NotesModule = {
    notes = {}
}

-- Handle receiving notes from server
RegisterNetEvent('tablet:setNotes', function(receivedNotes)
    NotesModule.notes = receivedNotes
    SendReactMessage('setNotes', NotesModule.notes)
end)

-- Handle note creation confirmation
RegisterNetEvent('tablet:noteCreated', function(noteId)
    SendReactMessage('noteCreated', noteId)
end)

-- NUI Callbacks
RegisterNUICallback('saveNote', function(data, cb)
    TriggerServerEvent('tablet:saveNote', data)
    cb({success = true})
end)

RegisterNUICallback('deleteNote', function(data, cb)
    TriggerServerEvent('tablet:deleteNote', data.id)
    cb({success = true})
end)

RegisterNUICallback('getNotes', function(_, cb)
    TriggerServerEvent('tablet:getNotes')
    cb({success = true})
end)

return NotesModule