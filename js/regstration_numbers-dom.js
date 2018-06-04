//DOM variables
var regNum = document.querySelector('.regNum');
var list = document.querySelector('.addHere');
var dropDown = document.getElementById('townBox');
var message = document.getElementById('footer');

//instance of the logic function


//an empty object to refrence to localStorage
var objReg = {};

//check if the are elemnts on the local storage
if(localStorage['registration_numbers']){
    objReg = JSON.parse(localStorage.getItem('registration_numbers'));
}

var reg = RegistrationNumbers(objReg);
//function for the add button
function addRegFunction(){
  var newElement = document.createElement('li');//create an empty <li> element
  regNumValue = regNum.value;//store the value of the user input
  var userSelection = dropDown.options[dropDown.selectedIndex].value;//store the value of user selection

  if(reg.enter(regNumValue) ){//returns true if the user input is not digits and is one of the cities
    if(reg.size(objReg)>1 || localStorage['registration_numbers']){//check the size of the object and existance of localStorage
      objReg = Object.assign(objReg , reg.objtempReg);//we increment the existing object and localStorage
    }
    else{//empty object and no localStorage
      objReg = reg.objtempReg;//create new object
    }
    var lastElem = reg.last(objReg);//store the last value added on the object
    if(userSelection === 'all'){//check the user selection is cape town
        newElement.innerHTML = lastElem;//change the li content to be the last value of the object
        list.appendChild(newElement);//place the li in the ul element, the list
        message.innerHTML = '';// change the content of the message to empty string.
    }
    else{
      displayThis(regNumValue);// what is dsiplayed when a specific town is added.
    }
  }
  //The the user input is only digits or is not plate of the cities
  else if(regNumValue === '' ){
    message.innerHTML = 'Please enter a vehicle registration number';
  }
  else if(!reg.validate(regNumValue)){
    message.innerHTML = "The correct vehicle registration number format is follows /'AB 111-111/' ";
  }
  else{
    if(reg.enter(regNumValue) === undefined){
          message.innerHTML = " This input  " +regNumValue.toUpperCase() + " does not belong to any of the four towns. ";
    }
    else if(!reg.enter(regNumValue)){
        message.innerHTML = "The registration number is already added ";
      }
  }
  //remove the text on the input
  if(!regNum.value || regNum != regNum.defaultValue){
    regNum.value = regNum.defaultValue;
  }
  //puting the object on localStorage
  localStorage['registration_numbers'] = JSON.stringify(objReg);
  objReg = JSON.parse(localStorage['registration_numbers']);
}
var addRegBtn = document.getElementById('addReg');
addRegBtn.addEventListener('click', addRegFunction);

//diplay
function displayThis(town){
  if(dropDown.options[dropDown.selectedIndex].value === reg.isFrom(town)){
    printForThis(reg.isFrom(town));
  }
  else{
    town = town.trim();
    var whichTown = reg.isFrom(town);
    if(whichTown === "bellville"){
      message.innerHTML =town+ ' ,is added on Bellville list';
    }
    else if(whichTown === "capetown"){
      message.innerHTML =town+ ' ,is added on Cape Town list';
    }
    else if(whichTown === "paarl"){
      message.innerHTML =town+' ,is added on Paarl list';
    }
    else if(whichTown === "stellenbosch"){
      message.innerHTML = town+' ,is added on Stellenbosch list';
    }
  }
}
//display all registartions numbers for selected town
function printForThis(town){
  message.innerHTML = '';
  while(list.hasChildNodes()){
      list.removeChild(list.firstChild);
  }
  if(dropDown.options[dropDown.selectedIndex].value === town){
    if(reg.filter(town).length !=0){
      for(var i = 0; i < reg.filter(town).length; i++){
        var newElement = document.createElement('li');
        newElement.innerHTML = reg.filter(town)[i];
        list.appendChild(newElement);
      }
    }
  }
}
//This function is for printing the plates of the selected town
function changeSelect(){
  if(dropDown.options[dropDown.selectedIndex].value === 'capetown'){printForThis('capetown'); message.innerHTML ='';}
  else if(dropDown.options[dropDown.selectedIndex].value === 'bellville'){printForThis('bellville'); message.innerHTML ='';}
  else if(dropDown.options[dropDown.selectedIndex].value === 'paarl'){printForThis('paarl'); message.innerHTML =''; }
  else if(dropDown.options[dropDown.selectedIndex].value === 'stellenbosch'){printForThis('stellenbosch'); message.innerHTML =''; }
  else if(dropDown.options[dropDown.selectedIndex].value === 'all'){printForThis('all'); message.innerHTML =''; }
}
function resetStorage(){
  if(localStorage['registration_numbers']){
    localStorage.removeItem('registration_numbers');
    objReg = {};
    message.innerHTML = '';
    plate.innerHTML = '';
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild);
    }
    location.reload();
  }
}
var resetBtn = document.getElementById('resetReg');
resetBtn.addEventListener('click', resetStorage);
window.addEventListener('load', function(){
  printForThis('all');
});
