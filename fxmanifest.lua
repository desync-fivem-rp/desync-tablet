fx_version "cerulean"

description "Basic React (TypeScript) & Lua Game Scripts Boilerplate"
author "Project Error"
version '1.0.0'
repository 'https://github.com/project-error/fivem-react-boilerplate-lua'

lua54 'yes'

games {
	"gta5",
	"rdr3"
}

ui_page 'web/build/index.html'

shared_scripts {
	'@oxmysql/lib/MySQL.lua',
}

client_scripts {
	'client/utils/*.lua',
	'client/modules/*.lua',
	'client/client.lua'
}

server_scripts {
	'server/utils/*.lua',
	'server/modules/*.lua',
	'server/server.lua'
}

files {
	'web/build/index.html',
	'web/build/**/*',
}