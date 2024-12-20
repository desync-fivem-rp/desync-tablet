-- Initialize modules
local Database = require 'server.utils.database'
local NotesModule = require 'server.modules.notes'
local BackgroundModule = require 'server.modules.background'

-- Initialize database tables when resource starts
CreateThread(function()
    Database.Initialize()
end)
