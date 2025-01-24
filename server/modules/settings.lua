local SettingsModule = {}

-- Get background URL for a player
-- function SettingsModule.GetSettings(source)
--     local identifier = GetPlayerIdentifier(source, 0)
    
--     local result = MySQL.query.await('SELECT background_url, scale FROM tablet_settings WHERE identifier = ?', {
--         identifier
--     })
--     local url = result[1] and result[1].background_url or ''
--     local scale = result[1] and result[1].scale or 1
--     TriggerClientEvent('tablet:setSettings', source, url, scale)
-- end

-- Save background URL for a player
function SettingsModule.SaveSettings(source, url)
    local identifier = GetPlayerIdentifier(source, 0)
    
    MySQL.query.await('INSERT INTO tablet_settings (identifier, background_url) VALUES (?, ?) ON DUPLICATE KEY UPDATE background_url = ?', {
        identifier, url, url
    })
end

-- Register events
-- RegisterNetEvent('tablet:getBackgroundUrl', function()
--     BackgroundModule.GetBackground(source)
-- end)

lib.callback.register('tablet:getSettings', function()
    -- Fetch the background URL from the database
    local identifier = GetPlayerIdentifier(source, 0)
    local result = MySQL.query.await('SELECT background_url FROM tablet_settings WHERE identifier = ?', { identifier })
    local url = result[1] and result[1].background_url or ''
    return url
end)

RegisterNetEvent('tablet:saveSettings', function(url)
    SettingsModule.SaveSettings(source, url)
end)

return SettingsModule