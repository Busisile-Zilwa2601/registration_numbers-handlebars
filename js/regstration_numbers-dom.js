var regNum = document.querySelector('.regNum');
var list = document.querySelector('.addHere');
var dropDown = document.getElementById('townBox');
var message = document.getElementById('footer');
var plate = document.getElementById('plate');

var reg = RegistrationNumbers();
var objReg = {};
if(localStorage['registration_numbers']){
    objReg = JSON.parse(localStorage.getItem('registration_numbers'));
}
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
    if(userSelection === 'capetown'){//check the user selection is cape town
      if(reg.checkCape(lastElem)){//check the user input is cape town plates
        newElement.innerHTML = lastElem;//change the li content to be the last value of the object
        list.appendChild(newElement);//place the li in the ul element, the list
        message.innerHTML = '';// change the content of the message to empty string.
        plate.innerHTML = '';
      }
      /*Else check what the user starts with and place it that that city
      */
      else{
        lastElem.trim();
        var startString = (lastElem.substring(0,2)).toUpperCase();
        if(startString === "CY"){
          plate.innerHTML = lastElem;
          message.innerHTML =' ,is added on Bellville list';
        }
        else if(startString === "CJ"){
          plate.innerHTML = lastElem;
          message.innerHTML =' ,is added on Paarl list';
        }
        else{
          plate.innerHTML = lastElem;
          message.innerHTML = ' ,is added on Hermanus list';
        }
      }
    }
    else if(userSelection === 'bellville'){//
      if(reg.checkBell(lastElem)){
        newElement.innerHTML = lastElem;
        list.appendChild(newElement);
        message.innerHTML = '';
        plate.innerHTML = '';
      }
      /*Else check what the user starts with and place it that that city
      */
      else{
        lastElem.trim();
        var startString = (lastElem.substring(0,2)).toUpperCase();
        if(startString === "CA"){
          plate.innerHTML = lastElem;
          message.innerHTML = ' , is added on Cape Town list';
        }
        else if(startString === "CJ"){
          plate.innerHTML = lastElem;
          message.innerHTML = ' , is added on Paarl list';
        }
        else{
          plate.innerHTML = lastElem;
          message.innerHTML = ' , is added on Hermanus list';
        }
      }
    }
    else if(userSelection === 'paarl'){
      if(reg.checkPaarl(lastElem)){
        newElement.innerHTML = lastElem;
        list.appendChild(newElement);
        message.innerHTML = '';
        plate.innerHTML = '';
      }
      else{
        lastElem.trim();
        var startString = (lastElem.substring(0,2)).toUpperCase();
        console.log(startString);
        if(startString === "CY"){
          plate.innerHTML = lastElem;
          message.innerHTML = ' , is added on Bellville list';
        }
        else if(startString === "CA"){
          plate.innerHTML = lastElem;
          message.innerHTML = ' , is added on Cape Town list';
        }
        else{
          plate.innerHTML = lastElem;
          message.innerHTML = ' , is added on Hermanus list';
        }
      }
    }
    else if(userSelection === 'hermanus'){
      if(reg.checkHer(lastElem)){
        newElement.innerHTML = lastElem;
        list.appendChild(newElement);
        message.innerHTML = '';
        plate.innerHTML = '';
      }
      else{
        lastElem.trim();
        var startString = (lastElem.substring(0,2)).toUpperCase();
        if(startString === "CY"){
          plate.innerHTML = lastElem;
          message.innerHTML = ' , is added on Bellville list';
        }
        else if(startString === "CA"){
          plate.innerHTML = lastElem;
          message.innerHTML = ' , is added on Cape Town list';
        }
        else if(startString === "CJ"){
          plate.innerHTML = lastElem;
          message.innerHTML = ' , is added on Paarl list';
        }
      }
    }
    else{
      newElement.innerHTML = lastElem;
      list.appendChild(newElement);
      message.innerHTML = '';
    }
  }
  //The the user input is only digits or is not plate of the cities
  else{
      if(reg.enter(regNumValue) === undefined)
        message.innerHTML = " This input  " +regNumValue + " does not belong to any of the four towns. ";
      if(!reg.validate(regNumValue)){
        message.innerHTML = "The correct vehicle registration number format is follows /'AB 111-111/' ";
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
//This function is for printing the plates of the selected town
function changeSelect(){
  message.innerHTML = '';
  plate.innerHTML = '';
  console.log((list.children).length);
  while(list.hasChildNodes()){
      list.removeChild(list.firstChild);
  }
  if(dropDown.options[dropDown.selectedIndex].value === 'capetown'){
    if(reg.filter(objReg,'capetown').length !=0){
      for(var i = 0; i < reg.filter(objReg,'capetown').length; i++){
        var newElement = document.createElement('li');
        newElement.innerHTML = reg.filter(objReg,'capetown')[i];
        list.appendChild(newElement);
      }
    }
  }
  else if(dropDown.options[dropDown.selectedIndex].value === 'bellville'){
    if(reg.filter(objReg,'bellville').length != 0){
      for(var i = 0; i < reg.filter(objReg,'bellville').length; i++){
        var newElement = document.createElement('li');
        newElement.innerHTML = reg.filter(objReg,'bellville')[i];
        list.appendChild(newElement);
      }
    }
  }
  else if(dropDown.options[dropDown.selectedIndex].value === 'paarl'){
    if(reg.filter(objReg,'paarl').length != 0){
      for(var i = 0; i < reg.filter(objReg,'paarl').length; i++){
        var newElement = document.createElement('li');
        newElement.innerHTML = reg.filter(objReg,'paarl')[i];
        list.appendChild(newElement);
      }
    }
  }
  else if(dropDown.options[dropDown.selectedIndex].value === 'hermanus'){
    if(reg.filter(objReg,'hermanus').length != 0){
      for(var i = 0; i < reg.filter(objReg,'hermanus').length; i++){
        var newElement = document.createElement('li');
        newElement.innerHTML = reg.filter(objReg,'hermanus')[i];
        list.appendChild(newElement);
      }
    }
  }
  else{
    if(reg.filter(objReg,'all') != 0){
      for(var i = 0; i < reg.filter(objReg,'all').length; i++){
        var newElement = document.createElement('li');
        newElement.innerHTML = reg.filter(objReg,'all')[i];
        list.appendChild(newElement);
      }
    }
  }
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
  }
}
function reLoad(){
  location.reload();
}
console.log(document.getElementById('resetReg'));
var resetBtn = document.getElementById('resetReg');
resetBtn.addEventListener('click', resetStorage);
resetBtn.addEventListener('click', reLoad);
window.addEventListener('load', function(){
  if(reg.filter(objReg,'all') != 0){
    for(var i = 0; i < reg.filter(objReg,'all').length; i++){
      var newElement = document.createElement('li');
      newElement.innerHTML = reg.filter(objReg,'all')[i];
      list.appendChild(newElement);
    }
  }
});
