local SettingsModule = {
    backgroundUrl = '',
    scale = 1
}

-- Initialize background URL when resource starts
RegisterNetEvent('tablet:setSettings', function(url)
    SettingsModule.backgroundUrl = url
    SendReactMessage('setSettings', url)
    print("SettingsModule.backgroundUrl: " .. SettingsModule.backgroundUrl)
end)

-- NUI Callbacks
RegisterNUICallback('saveSettings', function(data, cb)
    local url = data.url
    local scale = data.scale
    SettingsModule.backgroundUrl = url
    SettingsModule.scale = scale
    TriggerServerEvent('tablet:saveSettings', url, scale)
        print("SettingsModule.backgroundUrl: " .. SettingsModule.backgroundUrl)
    cb({success = true})
end)

RegisterNUICallback('getSettings', function(data, cb)
    local url = lib.callback.await('tablet:getSettings', false)
    cb(url)
end)

return SettingsModule