-- Database utility functions
local Database = {}

function Database.Initialize()
    -- Initialize all required tables
    CreateThread(function()
        -- Notes table
        MySQL.query([[
            CREATE TABLE IF NOT EXISTS tablet_notes (
                id VARCHAR(36) PRIMARY KEY,
                owner_identifier VARCHAR(50),
                title VARCHAR(100),
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        ]])

        -- Background settings table
        MySQL.query([[
            CREATE TABLE IF NOT EXISTS tablet_settings (
                identifier VARCHAR(50) PRIMARY KEY,
                background_url TEXT DEFAULT NULL
            )
        ]])
    end)
end

function Database.GenerateUUID()
    return MySQL.scalar('SELECT UUID()')
end

return Database