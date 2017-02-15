(function(window){

'use strict'

	var data = [];
	var completed = [];
	var pending = [];
		
	if(JSON.parse(localStorage.getItem("todoData")) == null){
		var todoData = [];
	}
	else{
		var todoData = JSON.parse(localStorage.getItem("todoData"));
	}

	var task = {
		created_at: null,
		taskname: null,
		description: null,
		done: false
	}

	window.task = task;
	window.data = data;
	window.completed = completed;
	window.pending = pending;
	window.todoData = todoData;
})(window)