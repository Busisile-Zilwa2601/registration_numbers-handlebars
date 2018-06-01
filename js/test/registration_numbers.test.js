describe("The RegistrationNumbers", function(){
  it("It should return all the registration numbers, it should return false on the duplicates", function(){
    var reg = RegistrationNumbers();
    reg.enter('CA 123-122');
    reg.enter('CA 123-125');
    reg.enter('CY 231-122');
    reg.enter('CJ 322-937');
    reg.enter('cem 937-554');
    //reg.objtempReg
    assert.deepEqual(reg.filter(reg.objtempReg,'all'), ['CA 123-122','CA 123-125','CY 231-122','CJ 322-937','CEM 937-554']);
    assert.deepEqual(reg.enter('CA 123-125'), false);
  });
  it("It should return the last registration numbers", function(){
    var reg = RegistrationNumbers();
    var myObj = {};
    reg.enter('CA 123-122');
    reg.enter('CA 123-125');
    reg.enter('CY 231-122');
    reg.enter('CJ 322-937');
    reg.enter('cem 937-554');
    myObj = reg.objtempReg;
    assert.deepEqual(reg.last(myObj), 'CEM 937-554');
    assert.equal(reg.checkCape('CJ 322-937'), false);
  });
  it("It should return Cape Town  registration numbers in an Array", function(){
    var reg = RegistrationNumbers();
    reg.enter('CA 123-122');
    reg.enter('CA 123-125');
    reg.enter('CY 231-122');
    reg.enter('CJ 322-937');
    reg.enter('cem 937-554');
    assert.deepEqual(reg.filter(reg.objtempReg,'capetown'), ['CA 123-122', 'CA 123-125']);
  });
  it("It should return Bellville registration numbers in an Array", function(){
    var reg = RegistrationNumbers();
    reg.enter('CA 123-122');
    reg.enter('CA 123-125');
    reg.enter('CY 231-122');
    reg.enter('CJ 322-937');
    reg.enter('cem 937-554');
    reg.enter('CY 331-122');
    reg.enter('CY 231-128');
    reg.enter('CY 231-722');
    assert.deepEqual(reg.enter('CY 122'), undefined);
    assert.deepEqual(reg.enter('CY 231'), undefined);
    assert.deepEqual(reg.filter(reg.objtempReg,'bellville'), ['CY 231-122', 'CY 331-122', 'CY 231-128', 'CY 231-722']);
  });
  it("It should return Paarl registration numbers in an Array", function(){
    var reg = RegistrationNumbers();
    reg.enter('CA 123-122');
    reg.enter('CA 123-125');
    reg.enter('CY 231 -122');
    reg.enter('CJ 322-937');
    reg.enter('cem 937-554');
    reg.enter('CY 31-122');
    reg.enter('CJ 231-112');
    reg.enter('CJ 231-822');
    assert.deepEqual(reg.enter('CJ 122'),undefined);
    assert.deepEqual(reg.enter('CJ 231'), undefined);
    assert.deepEqual(reg.filter(reg.objtempReg,'paarl'), ['CJ 322-937', 'CJ 231-112', 'CJ 231-822']);
  });
  it("It should return Hermunas registration numbers in an Array", function(){
    var reg = RegistrationNumbers();
    reg.enter('CEM 123-122');
    reg.enter('CA 123-125');
    reg.enter('CY 231-122');
    reg.enter('CJ 322-937');
    reg.enter('cem 937-554');
    reg.enter('CY 231-122');
    reg.enter('CJ 231-312');
    reg.enter('CJ 231-922');
    assert.deepEqual(reg.filter(reg.objtempReg,'hermanus'), ['CEM 123-122', 'CEM 937-554']);
  });
  it("It should return true, if the format is correct, false if its not", function(){
    var reg = RegistrationNumbers();
    reg.enter('CEM 123-122');
    reg.enter('CJ 231');
    assert.deepEqual(reg.validate('CEM 123-122'), true);
    assert.deepEqual(reg.validate('CJ 231'), false);
  });
});
