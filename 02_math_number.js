// supersimple.dev/js-basics/
// go to inspector(F12), console to check and input anything
// CH02: numbers, using console

//final project: supersimple.dev/projects/amazon

// order of calculation: same as normal math, from left to right, () is top priority: */+-

10.90*2 +20.95+4.99

(10.90*2 +20.95)*1.1+4.99
// floating number causing problem, to avoid that through calculating using cent, then round then convert to dollar.
(1090*2 +2095)/10000*110+499/100

// .5 decide floor or ceiling
// type allow pasting 
Math.ceil(2.2)
Math.round(2.2)
Math.floor(2.2)


Math.ceil(4.9)
Math.round(4.9)
Math.floor(4.9)

Math.round((2095+799)*0.1)/100

///////////////////////////exercise 02:

//2a
1*10 + 3*8 + 1*5

//2e
Math.round((1850+2*750)*0.2)/100

//2i, first calculate the tax, then the whole price
Math.round((1899+2095+799+499)*0.1)/100 + (1899+2095+799+499)/100

// Celsius or Fahrenheit
alert("Celsius is"+ ((86-32)*5/9))
alert("Fahrenheit is "+ ((-5*9/5)+32))