/**
 * @author Wil
 * Title: additem.html Style
 * By: Wiltre Santiago 
 * For: VFW Project 4
 * This is the js for additem.html
 */

// alert("Hello World Add Item"); //testing the js file


//Wait until the DOM is ready. 
window.addEventListener("DOMContentLoaded", function(){
	
	//getElementById Function
	function element(a){
		var getElement = document.getElementById(a);
		return getElement;		
	}
	
	//Create the dropdown menu for the items category
	function createCategory(){
		var form = document.getElementsByTagName("form"); //this will be created as an array
		var li = element("category");
		var createSelect = document.createElement("select");
		createSelect.setAttribute("id","itemCategory");
		for(var i=0, j=itemCategories.length; i<j; i++){
			var optionGroup = document.createElement("option");
			var text = itemCategories[i];
			optionGroup.setAttribute("value", text);
			optionGroup.innerHTML = text;
			createSelect.appendChild(optionGroup);
		}
		li.appendChild(createSelect);		
	}
	//Function to obtain the data from check and radio button
	function radioValue(){
		var rbutton = document.forms[0].sLocation;
		for(var i=0; i<rbutton.length; i++){
			if(rbutton[i].checked){
				storeLocation = rbutton[i].value;	
			}			
		}
	}
	
	// function to verify the checkbox Value 
	function checkBoxValue(){
		if(element("nearPurchase").checked){
			nPurchase = "Yes";
		} else {
			nPurchase = "No";
		}
	}
	
	
	//This is the toggle control function 
	function controls(x){
		switch(x){
			case "on":
				element("whishform").style.display = "none";
				element("clear").style.display = "inline";
				element("display").style.display = "none";
				element("newItem").style.display = "block";
				element("submit").style.display = "none";
				break;
			case "off":
				element("whishform").style.display = "block";
				element("clear").style.display = "inline-block";
				element("display").style.display = "inline-block";
				element("dataControls").style.display="none";
				element("dataControls").style.backgroundColor="transparent";
				element("newItem").style.display = "block";
				element("newItem").style.display = "block";
				element("submit").style.display = "block";
				element("items").style.display ="none";				
				break;
			default:
				return false;
		}
	}
	
	// Funation to save the data in to localstorage 
	function saveData(key){ //if there is not key it will create one
		if (!key) {
			var id        	= Math.floor(Math.random()*100001);
		}else{ //if there is a key just keep the key to edit the item
			id = key
		}
		
		//Get all the values of the form  and store them 
		//Object properties contain array with the form label and value. 
		radioValue();
		checkBoxValue();
		var info			= {};
			info.category	=["Item Category: ", element("itemCategory").value];
			info.sname		=["Store Name: ", element("storeName").value];
			info.sweb		=["Store Website: ", element("webSite").value];
			info.sLocation	=["Store Location: ", storeLocation];
			info.npurchase	=["Near Purchase: ", nPurchase];
			info.priority	=["Item Priority: ", element("priority").value];
			info.date		=["Date: ", element("date").value];
			info.notes		=["Product Notes: ", element("itemsNotes").value];
		//Save data in local storage
		localStorage.setItem(id, JSON.stringify(info));
		alert("Info has been Saved!! :) ");
		window.location="additem.html";
		end;
			 				
	};	
	
	// Function to Display Data 
	function displayData(){
				
		controls("on");
		if(localStorage.length === 0){
			alert("There are no items to display  the form will be populated with default data");
			loadDefaultData()
		}
		var createDiv = document.createElement("div");
		createDiv.setAttribute("id", "items");
		var newList = document.createElement("ul");
		createDiv.appendChild(newList);
		document.body.appendChild(createDiv);
		element("items").style.display ="display";
		for (var i=0, len = localStorage.length; i < len; i++) {
			var createLI = document.createElement("li");
			var linksLi = document.createElement("li");
		  	newList.appendChild(createLI);
		  	var index = localStorage.key(i);
		  	var info = localStorage.getItem(index);
		  	//Converting local storage from string to object
		  	var obj = JSON.parse(info);
		  	var createSubIndex = document.createElement("ui");
		  	createLI.appendChild(createSubIndex);
		  	for(var n in obj){
		  		var makeSubli = document.createElement("li");
		  		createSubIndex.appendChild(makeSubli);
		  		var underInfo = obj[n][0] + "&emsp;" + obj[n][1];
		  		makeSubli.innerHTML = underInfo;
		  		makeSubli.appendChild(linksLi);	
		  	}
		  	makeItemLinks(localStorage.key(i), linksLi) //This is the edit delete buttons
		}
	}	
	
	//Function to load the default Data file 
	function loadDefaultData(){
		//This is where the json object is populating
		for (var n in json){
			var id =  Math.floor(Math.random()*100001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
		
		
	}
	
	//function to display the edit and delete links 
	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement("a");
		editLink.href ="#";
		editLink.key = key; 
		var editText = "Edit Information";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break 
		//var breakLine = document.createElement("br");
		//linksLi.appendChild(breakLine);
		
		
		//add delete item link
		var deleteLink = document.createElement("a")
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Items";
		
		//Here is the Delete Button 
		deleteLink.addEventListener("click", deleteArticle);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
				
	}
	
	//Function to edit the Local Sorage data 
	function editItem (){
		
		//New Item Variable 
		var getNewItem = element("newItem");
		//Retrieve data from localStorage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
						
		//Show the form 
		controls("off");
		
		
		//Control the new Item Button
		getNewItem.style.display="block";
		getNewItem.style.width="370px";
		getNewItem.style.backgroundColor="#999999";
		getNewItem.style.margin="0px";
		getNewItem.style.marginTop="3px";
		getNewItem.style.marginLeft="auto";
		getNewItem.style.marginRight="auto";		
		
		//populate the form fields
		element("itemCategory").value = item.category[1];
		element("storeName").value = item.sname[1];
		element("webSite").value = item.sweb[1];
		var rbutton = document.forms[0].sLocation;
		for(var i=0; i<rbutton.length; i++){
			if(rbutton[i].value == "National" && item.sLocation[1] == "National"){
				rbutton[i].setAttribute("checked", "checked");
			}else if(rbutton[i].value == "International" && item.sLocation[1] == "International"){
				rbutton[i].setAttribute("checked", "checked");
			}
			
		}
		
		if (item.npurchase[1] == "Yes"){
			element("nearPurchase").setAttribute("checked", "checked");
		}
		element("priority").value = item.category[1];
		element("date").value = item.date[1];
		element("itemsNotes").value = item.notes[1];	
		
		//Remove the initial listener from the input "Save data" button
		submit.removeEventListener("click", saveData )
		// Change Submit Button Value
		element("submit").value = "Save edited Data";
		var editButton = element("submit");
		//Save the key from Local Data
		editButton.addEventListener("click", validateData);
		editButton.key = this.key;
		div=element("items");
		div.style.display("none");
	}
	
	function deleteArticle(){
		var ask = confirm("Pleas Confirm the Deletion of the item");
		if (ask) {
			localStorage.removeItem(this.key);
			window.location.reload();
		}else{
			alert("Item was not Deleted.")
		}
	}
	
	
	//Function to clear the data in local storage 
	function resetData(){
		if (localStorage.length === 0){
			alert("There are no items to clear")
			
		}else{
			localStorage.clear();
			alert("Items are been deleted")
			window.location.reload();
			return false;			
		}
	}
	
	function validateData(){
		//elements to be checked
		var getCategory = element("itemCategory");
		var getStoreName = element("storeName");
		var getWeb = element("webSite");
		
		//Clear error Messages 
		errors.innerHTML ="";
		getCategory.style.backgroundColor= "white";
		getCategory.style.border = "";
		getStoreName.style.backgroundColor= "white";
		getStoreName.style.border = "";
		getWeb.style.backgroundColor= "white";
		getWeb.style.border = ""; 
		
		//Save error Messages
		var errorMsg = [];
		
		
		
		//Validation
		if (getCategory.value == "---Select a Category---"){
			var catError = "Please select a category.";
			getCategory.style.border = "2px solid red";
			getCategory.style.backgroundColor= "#ffbbbb";
			errorMsg.push(catError);			
		}	
		
		//Store name Validation 
		if (getStoreName.value === ""){
			var snameError = "Please enter store name.";
			getStoreName.style.border = "2px solid red";
			getStoreName.style.backgroundColor= "#ffbbbb";
			errorMsg.push(snameError);
		}
		
		// Website Validator
		var webver = /(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?(.aero|.asia|.biz|.cat|.com|.coop|.edu|.gov|.info|.int|.jobs|.mil|.mobi|.museum|.name|.net|.org|.pro|.tel|.travel)/;
		if(!(webver.exec(getWeb.value))){
			var webError = "Please enter a valid url";
			getWeb.style.border = "2px solid red";
			getWeb.style.backgroundColor= "#ffbbbb";
			errorMsg.push(webError);
		}
		
						
		
		
		// Displaying the error messages
		var errorLI = element("errors");
		if(errorMsg.length >= 1){
			for (var i=0; i<errorMsg.length; i++) {
			  var text = document.createElement("li");
			  text.innerHTML = errorMsg[i];
			  totalErrors.appendChild(text);
			 }
		} else {
			saveData(this.key);
			
		}
		//Calling the save data function
				
	}
	
	//Add new Item button function 
	function newArticle(){
			window.location="additem.html";
		}
	
	
	//Global Variables
	var itemCategories = ["---Select a Category---","Clothing","Electronics","Transport","Jewerly","Other"]
	var storeLocation
	var nPurchase
	var totalErrors = element("errors");
	createCategory();
	
	
	
	//Link Actions
	var display = element("display");
	display.addEventListener("click",displayData);
	var reset = element("clear");
	reset.addEventListener("click", resetData);
	var submit = element("submit");
	submit.addEventListener("click", validateData);
	// calling the add new item button function	
	var startApp = element("newItem");
		startApp.addEventListener("click", newArticle);
	
		
});

