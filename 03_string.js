// go to inspector(F12), console to check and input anything
// CH03: strings, using console

'hello world'

alert ('hey');

// concatenation
'some' + 'text'

'some ' + 'other '+'text'

//check the type:
 typeof 2
 typeof 'hello'

 //auto convert number 2 to string, type coercion
 'hello' +' you' + 2
 
// create amazon project:
//avoid floating number inaccuration
 '$' + (2095+799)/100

 'Item (' + (1 + 1) + '): $' + (2095+799)/100

 alert( 'Item (' + (1 + 1) + '): $' + (2095+799)/100)

 // we could use ''; ""; escape character to avoid such cases:
 "I'm Iron Man"
alert(  "I'm Iron Man")
alert(  'I\'m Iron Man')
alert(  'hello\nworld')
// also use !!!back tick:``, called template string; its interpolation gives a much easier way to do concat
`hello`
 alert( `Item (${1 + 1}): $${(2095+799)/100}`)

// multi line string
`hello
world`

////////////////////////////////////////////////////////////
//exercise 03:
//3a-c
'My name is' + 'K'

//3d-f
alert(`Total cost: $${5+3}`)

//3g-j
alert(
    `Total cost: $${(599+295)/100}
Thank you, come again!`)

//Challenge exercise 03:
//k-n
alert(
`Items(${1+1+1+1}):   $${((2*2095+2*799))/100}  
Shipping & handling:  $${(499+499)/100}
Total before tax:  $${(2*2095+2*799+2*499)/100}
Estimated tax (10%): $${((6786)/1000).toFixed(2)}
Order total:   $${((6786)/1000+6786/100).toFixed(2)} `)


// clean version:
const itemTotal = 2 * 2095 + 799; // total price, in cent
const shipping = 499 + 499;        // delivery cost, in cent
const beforeTax = itemTotal + shipping;
const taxRate = 0.1;
const estimatedTax = beforeTax * taxRate;
const orderTotal = beforeTax + estimatedTax;

alert(
`Items (${1 + 1 + 1 + 1}): $${(itemTotal / 100).toFixed(2)}
Shipping & handling: $${(shipping / 100).toFixed(2)}
Total before tax: $${(beforeTax / 100).toFixed(2)}
Estimated tax (10%): $${(estimatedTax / 100).toFixed(2)}
Order total: $${(orderTotal / 100).toFixed(2)}`
);
