-- Initialize modules
local NotesModule = require 'client.modules.notes'
local BackgroundModule = require 'client.modules.background'

-- Request initial data when resource starts
CreateThread(function()
    TriggerServerEvent('tablet:getNotes')
    TriggerServerEvent('tablet:getBackgroundUrl')
end)

local function toggleNuiFrame(shouldShow)
    SetNuiFocus(shouldShow, shouldShow)
    SendReactMessage('setVisible', shouldShow)
end

RegisterCommand('show-nui', function()
    toggleNuiFrame(true)
    debugPrint('Show NUI frame')
end)

RegisterNUICallback('hideFrame', function(_, cb)
    toggleNuiFrame(false)
    debugPrint('Hide NUI frame')
    cb({})
end)

RegisterNUICallback('getClientData', function(data, cb)
    debugPrint('Data sent by React', json.encode(data))
    
    local curCoords = GetEntityCoords(PlayerPedId())
    
    local retData = {
        x = curCoords.x,
        y = curCoords.y,
        z = curCoords.z,
        backgroundUrl = BackgroundModule.backgroundUrl
    }
    cb(retData)
end)