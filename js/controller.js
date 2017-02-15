(function(window){

'use strict'

 
var methods = {
	createTask : createTask,
	searchTodo : searchTodo,
	done : done,
	remove : remove,
	editOnClick : editOnClick,
	update : update,
	cancel : cancel
}

window.methods = methods;

function createTask(){
	task = {
		s_id: todoData.length,
		created_at: new Date(),
		taskname: document.getElementById("taskname").value,
		description: document.getElementById("description").value,
		done: false
	}

	if(task.taskname == ""){
	   	alert("Please enter task name!");
	}
	else if(task.description == ""){
	   	alert("Please enter task description!")
	}
	else{
		todoData.push(task);
		console.log('todoData',todoData);
		localStorage.setItem("todoData", JSON.stringify(todoData));window
	}

	modal.style.display = "none";
	flterAndRender('all')
}

function searchTodo(text){
	console.log('pending',pending);
	console.log('completed',completed);
    document.getElementById("main").innerHTML="";	
	console.log('searchText',text);
	//console.log('todoData in searchTodo',todoData);
    var forsearch = [];
	if(pending.length != 0 && completed.length==0){
		forsearch = pending;
		//console.log('p');	
	}
	if(completed.length != 0 && pending.length == 0){
		forsearch = completed;
		//console.log('c');
	}
	if(pending.length == 0 && completed.length == 0){
    	forsearch = data;
    	//console.log('a');
	}

    console.log('forsearch',forsearch);
	
	function filterItems(query) {
	    return forsearch.filter(function(el) {
	     return el.taskname.toLowerCase().indexOf(query.toLowerCase()) > -1 || el.description.toLowerCase().indexOf(query.toLowerCase()) > -1 ;
	    })
	}
	var searchedData = filterItems(text);
	/*var idx = array.indexOf(element);
	while (idx != -1) {
	  indices.push(idx);
	  idx = array.indexOf(element, idx + 1);
	}
	console.log(indices);*/
	var indices = [];
	for(var i=0; i < searchedData.length ;i++){
		var id = data.indexOf(searchedData[i]);
		createlist(id);
		//indices.push(id);
	}
	console.log('indices',indices);
	//var id = data.indexOf(searchedData[0]);
	console.log('data',data);
	console.log('foundData',searchedData);
	console.log('Index of foundData',id);
	/*for(var j=0;j < searchedData.length;j++){
		console.log('s_id',searchedData[j].s_id);
		createlist(searchedData[j].s_id);
	}*/
}

function done(x, _this, task) {
  	console.log(x);
  	console.log(_this);
  	console.log(task);
  	if (_this.checked) {
  		todoData[task].done = true;
  		x.getElementsByTagName("B")[0].style.textDecoration="line-through";
    	x.style.backgroundColor = '#bfbfbf';
  	} else  {
  		todoData[task].done = false;
    	x.style = '';
    	x.getElementsByTagName("B")[0].style.textDecoration="";
  	}
  	//localStorage.setItem("todos", JSON.stringify(todoData));
  	localStorage.setItem("todoData", JSON.stringify(todoData));
  	console.log('TodoData after done or undone',todoData);
  	//flterAndRender('all');
}

function remove(idx){
	console.log('idx',idx);
    if(window.confirm("Are you sure?")) {
		todoData.splice(idx, 1);
		var idtodelete = 'list'+idx;
		document.getElementById(idtodelete).remove();
		localStorage.setItem("todoData", JSON.stringify(todoData));
	}
}

var index;
function editOnClick(id){
	console.log('edit_id',id);
	console.log('todoData in edit',todoData)
	console.log('taskname',todoData[id].taskname );
	console.log('taskDesc',todoData[id].description );
	modal.style.display = "block";
	modal.getElementsByTagName("INPUT")[0].value = todoData[id].taskname;
	modal.getElementsByTagName("TEXTAREA")[0].value = todoData[id].description;
    modal.getElementsByTagName("SPAN")[0].style.display = 'none'; //save
    modal.getElementsByTagName("SPAN")[1].style.display = 'unset'; //update
	index = id;
	console.log(index);	
}

function update(){
	console.log(index);
	todoData[index].taskname = modal.getElementsByTagName("INPUT")[0].value;
	todoData[index].description = modal.getElementsByTagName("TEXTAREA")[0].value;
	localStorage.setItem("todoData", JSON.stringify(todoData));
	console.log(JSON.parse(localStorage.getItem("todoData")));
	modal.style.display = "none";
	window.location.reload();
}


function cancel(){
	modal.style.display = "none";
}




})(window)