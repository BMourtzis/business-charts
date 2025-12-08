//Functions + Scopes

//This is a function declaration, it has a name, lesson, a list of parameters (empty in this case) and a body.
//Functions define some functionality, like we will define some variables and maybe return them as an object.
//Usually functions, either get us something or do something for use. like below.

//This function returns an object with some variables defined inside it.
//Usually functions like this, will call something else to find the data we need.
function getName() {
    return "John Doe";
}

//This function takes a full name string and splits it into an array of names
function splitName(fullName) {
    //This doesn't modify the fullName variable outside of this function.
    //It just returns a different object (we will learn about objects in the next lesson)
    return fullName.split(" ");
}

//It's a good principle to have one function do one thing only.
//So getName only gets the name, and splitName only splits a name.

const acceptedColours = ["red", "blue", "green", "purple", "brown", "yellow"];

//function get methods, can also have parameters.
function getColour(index) {
    if(index < 0 || index >= acceptedColours.length) {
        return null;
    }

    return acceptedColours[index];
}

//when you pass parameters to functions, the parameters are passed in the order to which they are defined.
//for example, in the function below, you first pass the array and then the number (index), if you did them the other
//way around, it would not work.

function getValueFromArray(arr, index) {
    if(index < 0 || index >= arr.length) {
        return null;
    }
    return arr[index];
}

//when you pass parameters to functions, they are passed by value.
//meaning that if you modify them inside the function, the variable outside the function is not modified.
//Now there are exceptions to this rule, when you pass objects or arrays, but we will learn about them later.

//Scoopes define where variables are accessible.
//Variables defined inside functions are not accessible outside of them.
//Variables defined inside blocks (like if, for, while) are only accessible inside those blocks if they are defined with let or const.
//Variables defined with var are function scoped, meaning they are accessible anywhere inside the function they are defined in.

//For example take a look at the following 2 functions

function sanitizeName(name) {
    if(!name) return "";

    const sanitizeName = trimString(name);
    return sanitizeName;
}

function trimString(str) {
    //Here name or sanitizeName are not accessible, beucase they belong in the scope of the sanitizeName function.
    return str.trim();
}

//Scopes don't just apply to functions, they also apply to blocks like if, for, while etc.
//For example take a look at the following function

function isPass(grade) {
    let message = "";
    if(grade >= 50) {
        let messageFromCondition = "You passed!";
        message = messageFromCondition; //this works because message is defined in the outer scope
    } else {
        let newMessage = "You failed!";
        message = newMessage; //this works because message is defined in the outer scope
    }

    //messageFromCondition and newMessage are not accessible here, because they are defined inside the if and else blocks.

    return message;
}


//in a nutshell, functions help us organize code into smaller, reusable pieces, and scopes help us manage variable accessibility and lifetimes.

function lesson() {
    const cIndex = 2;
    return {
        name: getName(),
        split: splitName(getName()),
        colour: getColour(cIndex),
        arrayValue: getValueFromArray([10, 20, 30, 40], 2),
        sanitizeName: sanitizeName("   Alice   "),
        isPassMessage: isPass(75)
    };
}

//Simple getter
function exercise1() {

}

//transform data
function exercise2() {
    
}

//data validation
function exercise3() {
    
}

//Write certificate grading function from lesson 3 (lines 24-66) into separate functions, each function does one thing only
function exercise4() {
    return {
        isPass: getPass(),
        getGrade: getGrade(),
        getSealColor: getSealColor()
    }
}

export default {
    lesson: lesson(),
    exercise1: exercise1(),
    exercise2: exercise2(),
    exercise3: exercise3(),
    exercise4: exercise4()
}