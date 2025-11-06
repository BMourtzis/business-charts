//Syntax basics
function lesson() {
    //THIS IS A COMMENT.
    //We use this to write sentences that are not used by the program, but for people to read

    //These are constant fields, meaning they are can only by assigned once. If you try to change their values the program won't run
    const helloGreeting = "Hello, ";
    const iAmGreeting = "I am";
    const yearsGreeting = "years old";

    //I use a function to a string LOUD!!!
    const fromGreeting = makeLoud("I am from Palamas");

    //this is a variable of string
    let name = "Stefania";
    //this is a variable of number any type (int, float)
    let yearsOld = 25;
    // this is a boolean (true or false)
    let fromPalamas = false;

    //Because this a simple variable and not a const, I can change its values through the course of the progam.
    fromPalamas = true;

    //This defines an object with the following fields, and assigns it to the result variable
    let results = {
        helloGreeting: helloGreeting,
        iAmGreeting: iAmGreeting,
        yearsGreeting: yearsGreeting,
        fromGreeting: fromGreeting,
        name: name,
        yearsOld: yearsOld,
        fromPalamas: fromPalamas,
        secretMessage: "This was made by Bill with Love!",
        displaySecretMessage: true
    };

    //return will return whatever I give it to the caller.
    return results;

    //the above lines could we written like this
    //return {
    //     helloGreeting: helloGreeting,
    //     iAmGreeting: iAmGreeting,
    //     yearsGreeting: yearsGreeting,
    //     fromGreeting: fromGreeting,
    //     name: name,
    //     yearsOld: yearsOld,
    //     fromPalamas: fromPalamas,
    // };
}

//This defines a function that encapsulates a funnctionality
//in this case, this function will take an input, called text make it "LOUD!!!" and return it as an output
function makeLoud(text) {
    return text.toUpperCase() + "!!!";
}

//EXERCISES

//return a string of your favourite food
function exercise1() {
    return "vlito";
}

//retunrn a string that says "Hello, "+ your Name
function exercise2() {
   let greeting = "Hello, "; 
   let name = "Stefania" ;
    return greeting + name;
}

//return an object with your 3 most favourite locations, the locations should be named: location1, location2 and location3.
//For extra points, make your favourite locations loud.
function exercise3() {
    let location1 = makeLoud("Pigkouinospito");
    let location2 = "Koutseri";
    let location3 = "Paralia";
    let results = {
        location1: location1,
        location2: location2,
        location3: location3
    };
    return results;
}

//This defines what the caller of this file will see.
export default {
    lesson: lesson(),
    exercise1: exercise1(),
    exercise2: exercise2(),
    exercise3: exercise3(),
};