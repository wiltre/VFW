/**
 * @author Wil
 * Title: additem.html Style
 * By: Wiltre Santiago 
 * For: VFW Project 3
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
				element("newItem").style.display = "inline";
				element("submit").style.display = "none"
				break;
			case "off":
				element("whishform").style.display = "inline";
				element("clear").style.display = "inline";
				element("display").style.display = "inline";
				element("newItem").style.display = "none";
				element("submit").style.display = "inline";
				element("items").style.display ="none";				
				break;
			default:
				return false;
		}
	}
	
	// Funation to save the data in to localstorage 
	function saveData(){
		var id          	= Math.floor(Math.random()*100001);
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
			 				
	};	
	
	// Function to Display Data 
	function displayData(){
		controls("on");
		if(localStorage.length === 0){
			alert("There are no items to display");
			window.location="additem.html";
			end;
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
		  		var underInfo = obj[n][0] + " " + obj[n][1];
		  		makeSubli.innerHTML = underInfo;
		  		makeSubli.appendChild(linksLi);	  	
		  	}
		  	makeItemLinks(localStorage.key(i), linksLi) //This is the edit delete buttons
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
		var breakLine = document.createElement("br");
		linksLi.appendChild(breakLine);
		
		
		//add delete item link
		var deleteLink = document.createElement("a")
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Items";
		
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
				
	}
	
	//Function to edit the Local Sorage data 
	function editItem (){
		//Retrieve data from localStorage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
			
			
		//Show the form 
		controls("off");
		
		
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
		element("submit").value = "Edit new Data";
		var editButton = element("submit");
		//Save the key from Local Data
		editButton.addEventListener("click", validateData);
		editButton.key = this.key;
			
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
		var getWeb = element("website");
		
		//Save error Messages
		var errorMsg = [];
		//Validation
		if (getCategory == "---Select a Category---"){
			var catError = "Please select a category.";
			getCategory.style.border = "1px solid red";
			errorMsg.push(catError);			
		}	
		
		//Store name Validation 
		if (getStoreName === ""){
			var snameError = "Please enter store name.";
			getStoreName.style.border = "1px solid red";
			errorMsg.push(snameError);
		}
		
		// Website Validator
		if (getWeb === "")	{
			var webError = "Please enter a valid url";
			getWeb.style.border = "1px solid red";
			errorMsg.push(webError);
		}
		
		// If there errors on the form display the them 
		console.log(errorMsg);
		console.log(errorMsg.length);
		if(errorMsg.length >= 1){
			for (var i=0; i<errorMsg.length; i++) {
			  var text = document.createElement("li");
			  text.innerHTML = errorMsg[i];
			  totalErrors.appendChild(text);
			 }
			
		}
		
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
		
});

