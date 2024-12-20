local BackgroundModule = {}

-- Get background URL for a player
function BackgroundModule.GetBackground(source)
    local identifier = GetPlayerIdentifier(source, 0)
    
    MySQL.query('SELECT background_url FROM tablet_settings WHERE identifier = ?', {
        identifier
    }, function(result)
        local url = result[1] and result[1].background_url or ''
        TriggerClientEvent('tablet:setBackgroundUrl', source, url)
    end)
end

-- Save background URL for a player
function BackgroundModule.SaveBackground(source, url)
    local identifier = GetPlayerIdentifier(source, 0)
    
    MySQL.query('INSERT INTO tablet_settings (identifier, background_url) VALUES (?, ?) ON DUPLICATE KEY UPDATE background_url = ?', {
        identifier, url, url
    })
end

-- Register events
RegisterNetEvent('tablet:getBackgroundUrl', function()
    BackgroundModule.GetBackground(source)
end)

RegisterNetEvent('tablet:saveBackgroundUrl', function(url)
    BackgroundModule.SaveBackground(source, url)
end)

return BackgroundModule