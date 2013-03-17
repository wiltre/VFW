/**
 * @author Wil
 * Title: additem.html Style
 * By: Wiltre Santiago 
 * For: VFW Project 2
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
	
	function checkBoxValue(){
		if(element("nearPurchase").checked){
			nPurchase = "Yes";
		} else {
			nPurchase = "No";
		}
	}
	
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
				element("whishform").style.display = "none";
				element("clear").style.display = "inline";
				element("display").style.display = "inline";
				element("newItem").style.display = "none";
				element("items").style.display ="none";				
				break;
			default:
				return false;
		}
	}
	
	function saveData(){
		var id          = Math.floor(Math.random()*100001);
		//Get all the values of the form  and store them 
		//Object properties contain array with the form label and value. 
		radioValue();
		checkBoxValue();
		var info			= {};
			info.category	=["Item Category: ", element("itemCategory").value];
			info.sname		=["Store Name: ", element("storeName").value];
			info.sweb		=["Store Website: ", element("webSite").value];
			info.slocation	=["Store Location: ", storeLocation];
			info.npurchase	=["Near Purchase: ", nPurchase];
			info.priority	=["Item Priority: ", element("priority").value];
			info.date		=["Date: ", element("date").value];
			info.notes		=["Product Notes: ", element("itemsNotes").value];
		//Save data in local storage
		localStorage.setItem(id, JSON.stringify(info));
		alert("Info has been Saved!! :) ");
			 				
	};	
	
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
		  	}
		}
	}	
	
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
	
	
	
	//Global Variables
	var itemCategories =["---Select a Category---","Clothing","Electronics","Transport","Jewerly","Other","love nathie"];
	var storeLocation
	var nPurchase
	createCategory();
	
	
	
	//Link Actions
	var display = element("display");
	display.addEventListener("click",displayData);
	var reset = element("clear");
	reset.addEventListener("click", resetData);
	var submit = element("submit");
	submit.addEventListener("click", saveData);
		
});
