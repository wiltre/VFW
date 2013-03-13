/**
 * @author Wil
 * itle: additem.html Style
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
		var li = element("itemCategory");
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
		
	//Global Variables
	var itemCategories =["---Select a Category---","Clothing","Electronics","Transport","Jewerly","Other"];
	createCategory();
	
	
	//Link Actions
	var display = element("display")
	display.addEventListener("click",displayData);
	var reset = element("clear")
	reset.addEventListener("click", resetData);
	var submit = element("submit")
	submit.addEventListener("click", saveData)
	
});
