$(document).ready(onReady);

function onReady(){
    fetchAndRenderTasks();
    $('#submitButton').on('click', createTasks);
    $('#tasksList').on('click', '.deleteButton', deleteTask);
}

function fetchAndRenderTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {
        $('#tasksList').empty();
        for(let task of response){
            $('#tasksList').append(`<li class="taskToDo" data-id=${task.id}>${task.task}<button class= "doneButton">✅</button><button class="deleteButton">❌</button>`)
        }
    })
}

function createTasks(event) {
    event.preventDefault();

    let newTask = $('#createTask').val();

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            task: newTask
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