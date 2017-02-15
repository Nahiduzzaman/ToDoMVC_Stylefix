(function(window){

'use strict'
    
	window.flterAndRender = function(status) {
		console.log(status);
		document.getElementById("main").innerHTML="";

		var sortedData = [];
		var dataObj = {};
		for (var i = 0; i < todoData.length; i++) {
			dataObj = JSON.parse(JSON.stringify(todoData[i]));
			sortedData.push(dataObj);
		}
    	sortbytitle(sortedData);
    	data = sortedData;

	    if(status == 'done'){
	    	pending = []; //for search purpose
	    	var completedData = []; //for search purpose
		    for(var i = 0; i < data.length; i++) {
		    	if(data[i].done == true){
		    		console.log(data[i])
		    		completedData.push(data[i]);
		    		createlist(i);
		    	}
		    }
		    completed = completedData; //for search purpose, check this in searchTodo()    
		}
		else if(status == 'pending'){
			completed = [];
			var pendingData = [];
		    for(var i = 0; i < data.length; i++) {
		    	if(data[i].done == false){
		    		pendingData.push(data[i]);
		    		createlist(i);
		    	}
		    }
		    pending = pendingData;		    
		}	
		else{
			pending = [];
			completed = [];
	    	console.log('todoData-unsorted',todoData);
	    	console.log('aftersortdata',data);
	    	for(var i = 0; i < data.length; i++) {
		    	createlist(i);	    	
		    }
		}
		
	}

	window.createlist = function(i){
		var list = document.createElement("li");
		list.id = "list"+i;

	  	var outerdiv = document.createElement("div");
	  	outerdiv.style.display = "inline";

	  	var card = document.createElement("div");
		card.className = "card";
		card.id = "task"+[i];

		var container = document.createElement("div");
		container.className = "container";

		container.innerHTML = '<img src="css/images/todo.png" class="img_resize" align="left">'+
							  '<h4><b>'+data[i].taskname+'</b>'+
							  '<input type="checkbox" onChange="methods.done(task'+i+', this,'+[i]+')" style="float: right;">'+
							  '<span onclick="methods.remove('+[i]+')" style="float:right;cursor:pointer;margin-right: 10px">Delete</span>'+
							  '<a id="editBtn'+[i]+'" onclick="methods.editOnClick('+[i]+')" style="float:right;cursor:pointer;margin-right: 10px">Edit</a></h4>'+ 
	                          '<p>'+data[i].description+'</p>';

	    if(data[i].done == true){
			card.style.backgroundColor = '#bfbfbf';
			container.getElementsByTagName("INPUT")[0].checked = true;
			container.getElementsByTagName("B")[0].style.textDecoration="line-through";
		}
		
		outerdiv.appendChild(card);
		card.appendChild(container);
		list.appendChild(outerdiv);

		//console.log('list',list);
		document.getElementById("main").appendChild(list);
	}

	function sortbytitle(data){
		data.sort(function(a, b) {
		  var titleA = a.taskname.toUpperCase(); // ignore upper and lowercase
		  var titleB = b.taskname.toUpperCase(); // ignore upper and lowercase
		  if (titleA < titleB) {
		    return -1;
		  }
		  if (titleA > titleB) {
		    return 1;
		  }
		  return 0;
		});
	    return data;
	}

	//Modal
	var modal = document.getElementById('myModal');
	var btn = document.getElementById("myBtn");
	var span = document.getElementsByClassName("close")[0];

	btn.onclick = function() { //save
		console.log('clicked');
	    modal.style.display = "block";
	    modal.getElementsByTagName("SPAN")[0].style.display = 'unset'; //save
	    modal.getElementsByTagName("SPAN")[1].style.display = 'none'; //update
	}
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}

	window.modal = modal; 
	window.btn = btn;
	window.span = span;

})(window)