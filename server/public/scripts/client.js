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
    }).then(function(response) {
        $('#tasksList').empty();
        for(let task of response){
            if (task.done === 'Done') {
            $('#tasksList').append(`<li class="taskToDo" data-id=${task.id}>${task.task} is ${task.done}
            <button class="deleteButton">❌</button></li>
            `)}
            if (task.done === 'Done'){
                $(this).addClass("green")
            }
            else {
                $('#tasksList').append(`<li class="taskToDo" data-id=${task.id}>${task.task} is ${task.done}
                <button class= "doneButton">✅</button>
                <button class="deleteButton">❌</button></li>
                `)
                
            }
        }   
     
    })
}

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

// function displayTask() {
//     if (task.done === 'Done'){
//         $(this).addClass('green')
//      }

