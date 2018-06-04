function RegistrationNumbers(stored){
  var temp = stored || {};
  var takeReg = function(registration_number){
    if(Number.isNaN(Number(registration_number)) && regValidate(registration_number) &&(isCapeTown(registration_number) || isBellville(registration_number) ||isPaarl(registration_number) || isStellenbosch(registration_number))){
      if(temp[registration_number.toUpperCase()] === undefined){
        temp[registration_number.toUpperCase()] = 0;
      }
      if(temp[registration_number.toUpperCase()] === 1){
        return false;
      }
      else if(temp[registration_number.toUpperCase()] === 0){
        temp[registration_number.toUpperCase()] += 1;
        return true;
      }
    }
  }
  //validate format
  var regValidate = function(registration_number){
    if(registration_number != ''){
      var regex = /^[a-zA-Z]{2}(\s)[0-9]{3}(\-)[0-9]{3}$/
      return regex.test(registration_number);
    }
  }
  //check whether the registration number is from cape town
  var isCapeTown = function(registration_number){
      return (registration_number.trim().toUpperCase()).startsWith('CA');
  }
  //check whether the registration number is from bellville
  var isBellville = function(registration_number){
    return (registration_number.trim().toUpperCase()).startsWith('CY');
  }
  //check whether the registration number is from Paarl
  var isPaarl = function(registration_number){
    return (registration_number.trim().toUpperCase()).startsWith('CJ');
  }
  //check whether the registration number is from stellenbosch
  var isStellenbosch = function(registration_number){
    return (registration_number.trim().toUpperCase()).startsWith('CL');
  }
  //filter by town
  var myFilter = function(town){
    var capetownArr = [];
    var bellvilleArr =[];
    var paarlArr = [];
    var stellenboschArr = [];
    var allArr = [];
    if(town === 'capetown'){
      for(var i = 0; i < sizeObj(temp); i++){
        if(isCapeTown(Object.keys(temp)[i] ) ){
          capetownArr.push(Object.keys(temp)[i]);
        }
      }
      return capetownArr;
    }
    else if(town === 'bellville'){
      for(var i = 0; i < sizeObj(temp); i++){
        if(isBellville(Object.keys(temp)[i]) ){
          bellvilleArr.push(Object.keys(temp)[i]);
        }
      }
      return bellvilleArr
    }
    else if(town === 'paarl'){
      for(var i = 0; i < sizeObj(temp); i++){
        if( isPaarl(Object.keys(temp)[i])){
          paarlArr.push(Object.keys(temp)[i]);
        }
      }
      return paarlArr;
    }
    else if(town === "stellenbosch"){
      for(var i = 0; i < sizeObj(temp); i++){
        if(isStellenbosch(Object.keys(temp)[i])){
          stellenboschArr.push(Object.keys(temp)[i]);
        }
      }
      return stellenboschArr;
    }
    else if(town === 'all'){
      for(var key in temp)
        allArr.push(key.toUpperCase());
      }
      return allArr;
  }
  //check if it exist
  var inTemp = function(temp, registration_number){
    if(temp.hasOwnProperty((registration_number.toUpperCase()).trim() ) ){
        return true;
    }
  }
  //returns the size of the object
  var sizeObj = function(temp){
    var sum = 0;
    for(var key in temp){
      if(temp.hasOwnProperty(key)){
        sum += temp[key];
      }
    }
    return sum;
  }
  //return the last registration plate
  var returnLast = function(temp){
    return Object.keys(temp)[Object.keys(temp).length -1];
  }
  //return the first registration plate
  var returnFirst = function(temp){
    return Object.keys(temp)[0];
  }
  //check which town is the registration number from
  var whichTown = function(registration_number){
    if(isCapeTown(registration_number)){
      return 'capetown';
    }
    else if(isBellville(registration_number)){
      return 'bellville';
    }
    else if(isPaarl(registration_number)){
      return 'paarl';
    }
    else if(isStellenbosch(registration_number)){
      return 'stellenbosch';
    }
    else{
      return 'all';
    }
  }
  return{
    enter : takeReg,
    filter : myFilter,
    checkCape : isCapeTown,
    checkBell : isBellville,
    checkPaarl : isPaarl,
    checkStellenbosch : isStellenbosch,
    objtempReg : temp,
    isFrom : whichTown,
    size : sizeObj,
    last : returnLast,
    first : returnFirst,
    validate : regValidate,
    alreadyAdded : inTemp,
  }
}
