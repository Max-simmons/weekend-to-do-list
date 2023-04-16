$(document).ready(onReady);

function onReady(){
    fetchAndRenderTasks();
}

function fetchAndRenderTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {

        for(let task of response){
            $('#tasksList').append(`<li class="taskToDo" data-id=${task.id}>${task.task}<button class= "doneButton">✅</button><button class="deleteButton">❌</button>`)
        }
    })
}