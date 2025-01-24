lib.callback.register('todo:getTasks', function()
    local tasks = MySQL.query.await('SELECT * FROM todo_tasks')
    return tasks
end)

RegisterNetEvent('todo:addTask')
AddEventHandler('todo:addTask', function(data)
    local src = source
    print(json.encode(data))

    MySQL.insert('INSERT INTO todo_tasks (title, description) VALUES (?, ?)', {
        data.title, data.description
    })
    TriggerClientEvent('todo:sendTasks', src, tasks)    
    -- MySQL.Async.execute('INSERT INTO todo_tasks (title, description) VALUES (@title, @description)', {
    --     ['@title'] = title,
    --     ['@description'] = description
    -- }, function()
    --     -- Fetch updated tasks and send them to the client
    --     MySQL.Async.fetchAll('SELECT * FROM todo_tasks', {}, function(tasks)
    --         TriggerClientEvent('todo:sendTasks', src, tasks)
    --     end)
    -- end)
end)