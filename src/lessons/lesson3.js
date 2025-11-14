//Control Flow (if/else, switch) and loops (while, for, for..of)
function lesson() {
    //Control Flow
    //allows you to change the path of the code depending on a condition, like
    //A condition is a comparision that leads to a true or false

    const score = 4.5;
    let message = "fail";
    if(score > 5) {
        message = "pass";
    }

    //in this case the condition is score > 5
    //you can also do the following

    let messageFromCondition = "fail";
    const hasPassed = score > 5;
    if(hasPassed) {
        messageFromCondition = "passed";
    }

    //there is the if/else approach
    //else, will be called if the condition in the if statement is false
    const newScore = 5.5;
    let newMessage = "";
    if(newScore > 5) {
        newMessage = "pass";
    } else {
        newMessage = "fail"
    }
    //the 3 pieces of code have the same functionality


    //You can also have several conditions in the same statement, like
    const totalScore = 85;
    let grade = "";
    if(totalScore > 90) {
        grade = "high distinction";
    } else if (totalScore > 85) { //basically this means if totalScore < 90 && totalScore > 85
        grade = "distinction";
    } else if( totalScore > 75) {
        grade = "credit";
    } else if(totalScore > 50) {
        grade = "pass"
    } else {
        grade = "fail";
    }
    //Careful if the conditions where in a differente order, it wouldn't work the same way
    //Like if the first condition was totalScore > 50, then that would pass or the else would pass.

    //Switch is a similar control flow statement but effectively only works with equals
    let sealColor = "";
    switch(grade) {
        case "credit": //if grade == "credit"
            sealColor = "silver"
            break;
        case "pass":
            sealColor = "bronze"
            break;
        case "distinction": // if grade == "distinction"
        case "high distinction": // of ir grade == 'high distinction'
            sealColor = "gold"
            break;
        default: // like an else statement
            sealColor = "read"
    }

    //Loops
    //Allows for the same functionality to be used, without repeating the code
    //while is the simplest loop there is, that takes only the condition needed to continue

    let i = 0;
    let numberCount = "";
    while(i < 10) {
        //The loop has some functionality
        numberCount += i + ", "; 

        //update the i
        i++; // meaning i = i + 1
    }

    //Updating the i is very important, as we don't it will result in an infinite loop, meaning that the loop will run forever

    //There is another way to create this loop, but it's a bit more dangerous
    let j = 0;
    let newNumberCount = "";
    // eslint-disable-next-line no-constant-condition
    while(true) { //our condition is always true
        //The loop has some functionality
        newNumberCount += j + ", "; 

        j++;
        //Basically this is the condition we had in the while above
        if(j >=10) {
            break; //This tell the program to exit the loop
        }
    }

    //There is a simpler way to write the loops above, with a for loop
    let numberCountString = "";
    
    //inside the parenthesis, we do 3 things, 
    // first we create our control variable x;
    // then we state the condition that the loop will run for
    // lastly, we tell it what it will do that the end of the loop
    for(let x = 0; x < 10; x++) {
        numberCountString += x + ", "; 
    }

    //The 3 loops above, have the same functionality

    //Now, the most common usage for loops is arrays.
    //This is an array of strings
    var colours = [ "red", "green", "blue"];

    //to access values inside the array, you have to do this.
    colours[0]; //red
    colours[1]; //green
    colours[2]; //blue

    //to access all 3 and do something witht them you can use a loop
    const listLength = colours.length;
    let colourString = "";
    for(let idx = 0; idx < listLength; idx++) {
        colourString += colours[idx] + ", ";
    }

    //there is also a different loop that allows us to access each item in a list

    let newColourString = ""
    for(let item of colours) { //basically item = colours[idx]
        newColourString += item + ", ";
    }

    return {
        newColourString, colourString, numberCountString, newNumberCount, message, messageFromCondition, newMessage, sealColor, numberCount, grade
    }
}

//print the grade of some exams
// > 50 pass
// else fail
function exercise1(grade) {
    return "fail";
}

//I want to grade car milage
// if milage < 5000 new
// if milage < 10000 almost new
// if milage < 20000 good
// if milage < 60000 used
// if milage < 100000 old
// if milage < 200000 very old
// else, how is it still working
function exercise2(carMilage) {
    return "how is it still working";
}

//print numbers from 1 to 100 on a string
//bonus, do not have an comma (,) at the end
function exercise3() {
    return "1 2 3";
}

const acceptedColours = ["red", "blue", "green", "purple", "brown", "yellow"];

//I have a list of accepted colours, return a true or false if the colour is accepted
function exercise4(colour) {
    //check if colour in an accepted colour

    return false;
}

const wordList = ["numberBeingEqual", "negative", "text", "a", "ltE", "notNotEqual", "numberNotBeingEqual", "equalStringEqual"];
//Find and return the longest word from the wordList
function exercise5() {
    return "a";
}




export default {
    lesson: lesson(),
    exercise1,
    exercise2,
    exercise3: exercise3(),
    exercise4,
    exercise5: exercise5()
}