//Operators
//The basic and most important tool to use in programming.
//There are several and we'll talk about the most important ones
//Specifically: Arithmetic, Comparision and Logical
//There are others like bitwise, but we talk about them now
function lesson() {
    //Arithmetic
    //these are the most basic and intuitive operator, they do simple math operations

    const a = 5 + 3; //8
    const b = 5 - 3; //2
    const negative = 3 - 5; //-2
    const c = 5 * 3; //15
    const d = 3 / 2; //1,5

    //This is the remainder operation, it retusn the remainder of a division
    const e = 5 % 3; //2

    //+ is special because it's can be used in a variety of way, like adding a string and a string together
    const text = "hello" + ", " + "Stefania!"; //"hello, Stefania!""
    
    //also this works, because of coersion
    const numberText = "1" + 3 //"13"

    //Comparison
    //These compare 2 values, and will return a boolean (true or false)

    // "==" test if 2 values are equal regardless of their type
    const numberBeingEqual = 5 == 5; //true
    const numberNotBeingEqual = 4 == 5; //false
    const equalVariable = a == 8; //true
    const equalStringEqual = a == "8" // true;

    //"===" test if 2 values are equal including their type
    const strongNotBeingEqual = a === "8"; //false
    const strongEqual = b === 2; //true

    //">" tests if the left value is greater than the right
    const greater = a > b //true
    const notGreater = negative > b //false

    //"<" tests if the left value is less than the right
    const less = negative < b //true
    const notLess = a < b //false

    //">=" tests if the left value is greater than or equal the right
    const gtE = c >= 15; //true

    //"<=" tests if the left value is less than or equal the right
    const ltE = d <= 2; //true

    //"!=" tests if the left value is not equal the right
    const notEqual = e != 3; //true
    const notNotEqual = e != 2 //false

    //Logical
    //They combine boolean to return another boolean
    
    //"&&" Logical AND, both need to be true to return true, else false
    const andBothTrue = numberBeingEqual && equalVariable; //true
    const andBothFalse = numberNotBeingEqual && equalStringEqual; //false
    const andOneFalse = strongEqual && strongNotBeingEqual; //false

    //"||" Logical OR, one of the 2 needs to be true to return true, will return false if only both are false
    const orBothTrue = numberBeingEqual || equalVariable; //true
    const orBothFalse = numberNotBeingEqual || equalStringEqual; //true
    const orOneFalse = strongEqual || strongNotBeingEqual; //false

    //"!" Logical NOT, negates values, true becomes false and the opposite
    const wasTrue = !greater; //false
    const wasFalse = !notGreater; //true

    return {
        a, b, c, d, e, negative, text, numberText, numberBeingEqual, numberNotBeingEqual, equalVariable, equalStringEqual, strongNotBeingEqual, strongEqual, greater, notGreater, less, notLess, gtE, ltE, notEqual, notNotEqual, andBothTrue, andBothFalse, andOneFalse, orBothTrue, orBothFalse, orOneFalse,
        wasTrue, wasFalse
    }
}

//Simple math
// do all math operations;
function exercise1() {
    const a = 5;
    const b = 6;

    const addition = 0; //change the value to be the addition of a and b
    const subtraction = 0; //change the value to be the subtraction of a and b
    const multiplication = 0; //change the value to be the multiplication of a and b
    const division = 0; //change the value to be the division of a and b
    const remainder = 0; //change the value to be the remainder of a and b

    return {
        addition,
        subtraction,
        multiplication,
        division,
        remainder
    }
}

//BMI calculator, return the BMI index
//BMI = weight / height^2
function exercise2() {
    const height = 160;
    const weight = 80;

    return 0;
}

//Simple comparison
function exercise3() {
    const a = 5;
    const b = 6;

    const gt = false; //greaterThan
    const lt = false //lessThan
    const gtE = false; //greaterThanEqual
    const ltE = false; //lessThanEqual
    const equal = false;
    const strongEqual = false;
    const notEqual = false;

    return {
        gt, lt, gtE, ltE, equal, strongEqual, notEqual
    }
}

//Logical
function exercise4() {
    const a = true;
    const b = false;

    const and = false; //a AND b
    const or = false; //a OR b
    const not = false;  //NOT a OR NOT b

    return {
        and, or, not
    }
}

//BONUS: get the calculator from leson 2 and return true if the BMI is between 20 and 30 (including 20 and 30)
function exercise5() {
    return false;
}

export default {
    lesson: lesson(),
    exercise1: exercise1(),
    exercise2: exercise2(),
    exercise3: exercise3(),
    exercise4: exercise4(),
    exercise5: exercise5(),
};