local BackgroundModule = {
    backgroundUrl = ''
}

-- Initialize background URL when resource starts
RegisterNetEvent('tablet:setBackgroundUrl', function(url)
    BackgroundModule.backgroundUrl = url
    SendReactMessage('setBackgroundUrl', url)
end)

-- NUI Callbacks
RegisterNUICallback('saveBackgroundUrl', function(data, cb)
    local url = data.url
    BackgroundModule.backgroundUrl = url
    TriggerServerEvent('tablet:saveBackgroundUrl', url)
    cb({success = true})
end)

return BackgroundModule