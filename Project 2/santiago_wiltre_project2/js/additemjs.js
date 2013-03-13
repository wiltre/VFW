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
	function element(x){
		var getElement = document.getElementById(x);
		return getElement;		
	}
	
	//Global Variables
	var itemCategory =["---Select a Category---","Clothing","Electronics","Transport","Jewerly","Other"];
	
	//Link Actions
	var display = element("display")
	display.addEventListener("click",displayData);
	var reset = element("clear")
	reset.addEventListener("click", resetData);
	var submit = element("submit")
	submit.addEventListener("click", saveData)
	
});
