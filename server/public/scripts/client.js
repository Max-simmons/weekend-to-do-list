$(document).ready(onReady);

function onReady(){
    fetchAndRenderTasks();
    $('#submitButton').on('click', createTasks);
    $('#tasksList').on('click', '.deleteButton', deleteTask);
    $('#tasksList').on('click', '.doneButton', taskDone);
}

function fetchAndRenderTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        $('#tasksList').empty();
        handleRendering(response);
    })
        // for(let task of response){
        //     if (task.done === 'Done') {
        //     $('#tasksList').append(`<li class="taskToDo" data-id=${task.id}>${task.task} is ${task.done}
        //     <button class="deleteButton">❌</button></li>
        //     `)}
        //     if(task.done === 'Done'){
        //         $('.taskToDo').css("background-color", "lightgreen", "padding-right", "4em")
        //     }
        //     else {
        //         $('#tasksList').append(`<li class="taskToDo" data-id=${task.id}>${task.task} is ${task.done}
        //         <button class= "doneButton">✅</button>
        //         <button class="deleteButton">❌</button></li>
        //         `)
        //     }
            
            // if (task.done !== 'Done') {
            //     $('.taskTodo').css("background-color", "lightgrey")
            // }
                

        // }   
     
//     })
// }

function createTasks(event) {
    event.preventDefault();

    let newTask = $('#createTask').val();
    let taskDone = $('#taskDone').val();

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            task: newTask,
            done: taskDone
        }
    }).then(function(response){
        fetchAndRenderTasks();
    })

    $('#createTask').val('');
    $('#taskDone').val('');
}

function deleteTask() {
    let idToDelete = $(this).parent().data('id');

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${idToDelete}`
    }).then(function(response){
        fetchAndRenderTasks();
    }).catch(function(error) {
      alert('broken');  
    })
}

function taskDone() {
    let idToUpdate = $(this).parent().data('id');

    $.ajax({
        method: 'PUT',
        url: `/tasks/${idToUpdate}`,
        data:{
            done: 'Done'
        }
    }).then(function(response){
        fetchAndRenderTasks()
    }).catch(function(error){
        console.log('Done update failed', error);

    })
}

function handleRendering(tasks){
for(let task of response){
    if (task.done === 'Done') {
    $('#tasksList').append(`<li class="taskToDo" data-id=${task.id}>${task.task} is ${task.done}
    <button class="deleteButton">❌</button></li>
    `)
}
    if(task.done === 'Done'){
        $('.taskToDo').css("background-color", "lightgreen", "padding-right", "4em")
    }
    else {
        $('#tasksList').append(`<li class="taskToDo" data-id=${task.id}>${task.task} is ${task.done}
        <button class= "doneButton">✅</button>
        <button class="deleteButton">❌</button></li>
        `);
    }
}
}

