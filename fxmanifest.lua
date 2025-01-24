fx_version "cerulean"

description "Desync Tablet"
author "Desync"
version '1.0.0'

lua54 'yes'

games {
	"gta5",
}

ui_page 'web/build/index.html'

shared_scripts {
	'@ox_lib/init.lua',
	'config.lua',
	'@ox_core/lib/init.lua',
	-- '@oxmysql/lib/MySQL.lua',
}

client_scripts {
	'client/utils.lua',
	'client/modules/notes.lua',
	'client/modules/settings.lua',
	'client/modules/todo.lua',
	'client/client.lua'
}

server_scripts {
	'server/utils/database.lua',
	'server/modules/settings.lua',
	'server/modules/notes.lua',
	'server/modules/todo.lua',
	'server/server.lua',
	'@oxmysql/lib/MySQL.lua'
}

files {
	'web/build/index.html',
	'web/build/**/*',
}