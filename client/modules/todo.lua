RegisterNetEvent('todo:sendTasks')
AddEventHandler('todo:sendTasks', function(tasks)
    -- Send the tasks to the NUI (browser) interface
    SendNUIMessage({
        type = 'todo:sendTasks',
        tasks = tasks
    })
end)

RegisterNUICallback('saveTask', function(data, cb)
    print(json.encode(data))
    TriggerServerEvent('todo:addTask', data)
    cb({success = true})
end)

RegisterNUICallback('getTasks', function(_, cb)
    local tasks = lib.callback.await('todo:getTasks', false)
    print("tasks: " .. json.encode(tasks))
    cb(tasks)
end)
