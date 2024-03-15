let animals = ['Giraffe', 'Elephant', 'Yak']


// Animal is the argument, so each item in the animals array is 'animal'
// animal will display each animal on new line, index is another argument that will also display the place number next to animal name
animals.forEach( function(animal, index){
    console.log(animal, index)
})

// => is the denote function syntax
// this is the same as the original function above, just less typing and a bit more concise
animals.forEach((animal, index) => {
    console.log(animal, index)
})


// when only one line of code is the callback function, you do not need the curly braces
animals.forEach((animal, index) => console.log(animal, index))


// if there is only one argument inside the function, and only one line of code, you can get rid of parentheses around argument and curly braces around function
animals.forEach(animal => console.log(animal))


// ^^^^^^^^^^^^^^ all code above is doing the exact same thing, just written differently. It does not matter how I do it but these are the options