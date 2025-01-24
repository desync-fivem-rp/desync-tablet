-- Initialize modules
-- local NotesModule = require '@desync-tablet/client/modules/notes'
-- local BackgroundModule = require '@desync-tablet/client/modules/background'

-- Request initial data when resource starts
CreateThread(function()
    TriggerServerEvent('tablet:getNotes')
    TriggerServerEvent('tablet:getSettings')
end)

local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendReactMessage('setVisible', shouldShow)
end

-- RegisterCommand('show-nui', function()
--     toggleNuiFrame(true)
--     debugPrint('Show NUI frame')
-- end)

RegisterNUICallback('hideFrame', function(_, cb)
    toggleNuiFrame(false)
    debugPrint('Hide NUI frame')
    cb({})
end)

RegisterCommand('open-tablet', function()
    toggleNuiFrame(true)
    debugPrint('Tablet opened')
end)

