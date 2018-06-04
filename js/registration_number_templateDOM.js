document.addEventListener('DOMContentLoaded', function(){

  var sourceHeader = document.querySelector('.regNumTemp').innerHTML;
  var template = Handlebars.compile(sourceHeader);
  Handlebars.registerHelper('firstHeader', function(text){
    text = Handlebars.Utils.escapeExpression(text);
    var result = '<h1>'+text+'</h1>'
    return new Handlebars.SafeString(result);
  });
  document.getElementById('diplay-template').innerHTML = template();
  //The tips part
  var tips = document.getElementById('tips');
  var sourceTips = document.querySelector('.tipsPart').innerHTML;
  var templateTips = Handlebars.compile(sourceTips);
  var dataTips = templateTips({
    towns:[
      {town : 'Cape Town, the registration number starts with <span class="plates"><i>CA</i></span>'},
      {town : 'Bellvile, the registration number starts with <span class="plates"><i>CY</i></span>'},
      {town : 'Paarl, the registration number starts with <span class="plates"><i>CJ</i></span>'},
      {town : 'Stellenbosch, the registration number starts with <span class="plates"><i>CL</i></span>'}
    ]
  });
  tips.innerHTML = dataTips;
  //form
  var sourceForm = document.querySelector('.formsTemplate').innerHTML;
  var templateForm = Handlebars.compile(sourceForm);
  Handlebars.registerHelper('inPut', function(text){
    text = Handlebars.Utils.escapeExpression(text);
    return new Handlebars.SafeString('<p><span>'+text+'</span><input type="text" id = "inputA" name = "registration_number" placeholder="Enter vehicle number plate" maxlength="11"/></p>');
  });
  document.getElementById('inputArea').innerHTML = templateForm();
  //making buttons
  var theButtons = document.getElementById('theButtonsDiv');
  var sourceButtons = document.querySelector('.buttonsTemplate').innerHTML;
  var templateButtons = Handlebars.compile(sourceButtons);
  Handlebars.registerHelper('makeButtons', function(name, options){
    var buttonList = options.fn();
    buttonList = buttonList.trim().split('\n');
    var output = ' ';
    for(var val in buttonList){
      var item = buttonList[val].trim();
      output += '<button class="button-primary" on type="button" value='+item+' id ='+item+'>'+item+'</button>'+ ' ';
    }
    return output;
  });
  theButtons.innerHTML = templateButtons();
  //create the filter
  var theFilter = document.getElementById('filterPart');
  var sourceFilter = document.querySelector('.filter').innerHTML;
  var templateFilter = Handlebars.compile(sourceFilter);
  Handlebars.registerHelper('makeFilter', function(name, options){
    var filterList = options.fn();
    filterList = filterList.trim().split('\n');
    var output = '';
    for(var val in filterList){
      var item = filterList[val].trim();
      output += '<option value="'+item+'">'+item +'</option>';
    }
    return output;
  });
  theFilter.innerHTML = templateFilter();

  //Display the registration numbers
  var sourceDisplayList = document.querySelector('.regDisplay').innerHTML;
  var templateDisplay = Handlebars.compile(sourceDisplayList);
  var displayReg = document.getElementById("displayReg");
  var inputArea = document.getElementById('inputA');
  var displayMessage = document.getElementById('displayMessage');
  var objReg = {};
  if(localStorage['registration_number']){
      objReg = JSON.parse(localStorage.getItem('registration_number'));
  }
  var myReg = RegistrationNumbers(objReg);
  function addButton(){
    var regNumValue = inputArea.value;
    if(myReg.enter(regNumValue)){
      if(myReg.size(objReg)>1 || localStorage['registration_number']){//check the size of the object and existance of localStorage
      objReg = Object.assign(objReg , myReg.objtempReg);//we increment the existing object and localStorage
      }
      else{//empty object and no localStorage
        objReg = myReg.objtempReg;//create new object
      }
      displayMessage.innerHTML = '';
      if(selectTown.options[selectTown.selectedIndex].value === 'all'){
        var regData = templateDisplay1({
          registrationNumbers: Object.keys(objReg)
        });
        displayReg.innerHTML = regData;
      }else{
        displayThis(regNumValue);
      }
      localStorage['registration_number'] = JSON.stringify(objReg);
      objReg = JSON.parse(localStorage['registration_number']);
    }
    else if(regNumValue === '' ){
      displayMessage.innerHTML = 'Please enter a vehicle registration number';
    }
    else if(!reg.validate(regNumValue)){
      displayMessage.innerHTML = "The correct vehicle registration number format is follows /'AB 111-111/' ";
    }
    else{
      if(reg.enter(regNumValue) === undefined){
            displayMessage.innerHTML = " This input  " +regNumValue.toUpperCase() + " does not belong to any of the four towns. ";
      }
      else if(!reg.enter(regNumValue)){
          displayMessage.innerHTML = "The registration number is already added ";
        }
    }
    if(!inputArea.value || inputArea != inputArea.defaultValue){
      inputArea.value = inputArea.defaultValue;}
  }
  var addRegBtn = document.getElementById('add');
  addRegBtn.addEventListener('click', addButton);
  window.addEventListener('load', function(){
    var regData = templateDisplay1({
      registrationNumbers: Object.keys(objReg)
    });
    displayReg.innerHTML = regData;
  });
  //var sourceDisplayList = document.querySelector('.regDisplay').innerHTML;
  var selectTown = document.getElementById('townList');
  var templateDisplay1 = Handlebars.compile(sourceDisplayList);

  function byTown(town){
    displayReg.innerHTML = '';
    var regData = templateDisplay1({
      registrationNumbers:myReg.filter(town)
    });
    displayReg.innerHTML = regData;
  }

  function displayThis(town){
    if(selectTown.options[selectTown.selectedIndex].value === myReg.isFrom(town)){
      byTown(myReg.isFrom(town));
    }
    else{
      town = town.trim();
      var whichTown = myReg.isFrom(town);
      if(whichTown === "bellville"){
        displayMessage.innerHTML =town+ ' ,is added on Bellville list';
      }
      else if(whichTown === "capetown"){
        displayMessage.innerHTML =town+ ' ,is added on Cape Town list';
      }
      else if(whichTown === "paarl"){
        displayMessage.innerHTML =town+' ,is added on Paarl list';
      }
      else if(whichTown === "stellenbosch"){
        displayMessage.innerHTML = town+' ,is added on Stellenbosch list';
      }
    }
  }

  function changeSelected(){
    if(selectTown.options[selectTown.selectedIndex].value === 'capetown'){byTown('capetown');displayMessage.innerHTML = '';}
    else if(selectTown.options[selectTown.selectedIndex].value ==='bellville'){byTown('bellville'); displayMessage.innerHTML = '';}
    else if(selectTown.options[selectTown.selectedIndex].value === 'paarl'){byTown('paarl');displayMessage.innerHTML = '';}
    else if(selectTown.options[selectTown.selectedIndex].value === 'stellenbosch'){byTown('stellenbosch');displayMessage.innerHTML = '';}
    else if(selectTown.options[selectTown.selectedIndex].value === 'all'){byTown('all');displayMessage.innerHTML = '';}
  }
  selectTown.addEventListener('change', function(){
    changeSelected();
  });
  function clearStorage(){
    if(localStorage['registration_number']){
      localStorage.removeItem('registration_number');
      displayMessage.innerHTML = '';
      location.reload();
    }
  }
  var reset = document.getElementById('reset');
  reset.addEventListener('click', clearStorage);
});
