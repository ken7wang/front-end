//Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

	//Save Bookmark
	function saveBookmark(e){

	//Get form values
	var siteName=document.getElementById('siteName').value;
	var siteUrl=document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}


	var bookmark={
		name:siteName,
		url:siteUrl
	}

	//Local Storage Test (only save string)
	// localStorage.setItem('test', 'hello world');
	// console.log(localStorage.getItem('test'));
	// localStorage.removeItem('test');
	// onsole.log(localStorage.getItem('test'));
	

	//Test if bookmark is null
	if(localStorage.getItem('bks')===null){
		//Initt array
		var bookmarks=[];

		//Add to array
		bookmarks.push(bookmark);

		//Set to LocalStorage
		localStorage.setItem('bks', JSON.stringify(bookmarks));
	}
		else{
			//Get bookmarks from LocalStorage
			var bookmarks=JSON.parse(localStorage.getItem('bks'));

			//Add bookmark to array
			bookmarks.push(bookmark);

			//Re-set back to LocalStorage
			localStorage.setItem('bks', JSON.stringify(bookmarks));


	}

		//Clear Form
		document.getElementById('myForm').reset();

		//Re-fetch bookmarks
		fetchBookmarks();

		//Prevent form from submitting
		e.preventDefault();
}

		//Delete Bookmark
		function deleteBookmark(url){
			//Get bookmarks fromm localStorage
			var bookmarks=JSON.parse(localStorage.getItem('bks'));
			//Loop through bookmarks
			for(var i=0; i<bookmarks.length;i++){
				if(bookmarks[i].url==url){
					//Remove from array
					bookmarks.splice(i,1);
				}
			}
			//Re-set back to localStorage
			localStorage.setItem('bks', JSON.stringify(bookmarks));

			//Re-fetch bookmarks
			fetchBookmarks();
		}
		
		//Fetch bookmarks
		function fetchBookmarks(){

		//Get bookmarks from localStorage
		var bookmarks=JSON.parse(localStorage.getItem('bks'));
		
		//Get output id
		var bookmarkResults=document.getElementById('bookmarkResults')

		//Build output
		bookmarkResults.innerHTML='';
		for(var i=0; i<bookmarks.length;i++){

			var name= bookmarks[i].name;
			var url=bookmarks[i].url;

			bookmarkResults.innerHTML+='<div class="well">'+
										'<h3>'+name+
										'<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
										'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
										'</h3>'+
										'</div>';

		}


	}
	
//Validate Form
function validateForm(siteName, siteUrl){
	if(!siteName||!siteUrl){
		alert('Please fill in the form');
		return false;
	}

	//Regular expression for url
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if(!siteUrl.match(regex)){
		alert('Please use a valid URL');
		return false;
	}
		return true;
}