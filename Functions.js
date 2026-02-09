/*1.Function Declaration:-
A function declaration defines a named function using the function keyword. It is hoisted, meaning it can be called before it is defined in the code.
example:-*/
          hello();
          function hello() {
          console.log("hello");
          }

/*2.Function Expression:-
A function expression assigns a function to a variable. The function is not hoisted, so it can only be used after it is defined.
example:-*/ 
           const hello = function () {
          console.log("hello");
          };
          hello();

/*3.Arrow Function:-
An arrow function is a shorter syntax for writing functions. It does not have its own this and is commonly used for callbacks and small functions.
example:-*/ 
          const hello = () => {
          console.log("hello");
          };
          hello();

/*4.Lexical Scope Chain Resolution:-
Lexical scope chain resolution is the process JavaScript uses to find the value of a variable by searching through a hierarchy of scopes that are 
created based on where functions and blocks are written in the source code.
Lexical scope (or static scope) means that the accessibility of variables is determined at compile-time (when the code is written) based on where 
functions and blocks are physically nested. 
Scope Chain: When a variable is accessed, the JavaScript engine searches from the current scope outward to the global scope. This lookup chain is the scope chain.
example:-*/ 
          let x = 10;
          function outer() {
          let y = 20;
          function inner() {
          let z = 30;
          console.log(x + y + z);
          }
           inner();
        }
       outer();

/*5.Closures: A Practical Deep Dive
A closure is the combination of a function and the lexical environment within which that function was declared. It allows an inner function to "retain access" to its 
outer scope even after the outer function has finished executing. 
example:-*/ 
         function userID(name) {
          let password = "Gayu2026";
          return {
          getName() {
          return name;
          },
         checkPassword(input) {
         return input === password;
         }
        };
       }
    const user = userID("Gayatri");

    user.getName();          
    user.password;           
    user.checkPassword("x");  


/*6.Pure function:-
Always returns the same output for the same input. It Has no side effects.
This function always returns the same output as given the same input parameters.Pure functions only depend on their input parameters and don't affect the state 
of the application or other parts of the code.
example:-*/ 
  function add(a, b) {
          return a + b;
          }
        add(2, 3); 

/*7.Impure function:-
Depends on or modifies external state Or produces side effects.
Impure functions are functions that can modify the state of the application or have side effects. In other words, impure functions can have unpredictable behavior 
and do affect other parts of the application.*/
//example:- 
  let total = 0;
          function addToTotal(value) {
          total += value;
          }
        addToTotal(5);

/*8.IIFE Patterns:-
Immediately Invoked Function Expressions (IIFEs) are a JavaScript pattern used to create a private scope for variables, which is a core concept in achieving module encapsulation. 
They are used in the Module Pattern to create private scopes and expose public interfaces. An IIFE is a JavaScript function that runs as soon as it is defined. It is a self-invoking 
anonymous function that creates its own local scope. 

9.Module encapsulation:-
Module encapsulation in JavaScript is the practice of bundling related data (variables) and behavior (functions) into a single, self-contained unit (a module) 
and controlling access to its internal details. This creates a private scope for the module, preventing external code from directly accessing or modifying its 
internal state, except through explicitly exposed public interfaces. */

//10.Build a closure-based counter system:-
function Closure() 
{
  let count = 1; 
  return function() {
    count++; 
    return count;
  };
}
const counter = Closure();
console.log(counter()); 
console.log(counter());
console.log(counter()); 


//11.Create a function factory returning multiple utilities:-
function createResult(Value) 
{
  let count = Value;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}
const result = createResult(101);
console.log(result.increment()); 
console.log(result.increment()); 
console.log(result.getCount());  
console.log(result.decrement()); 


//12.Implement private variables using closures:-
function userID(name) 
{
  let Result = 70; 
  return {
    getName: () => name,
    getResult: () => Result,
    incrementResult: () => 
    {
      Result++;
      return `result: ${Result}`;
    }
  };
}

const student = userID("Gayatri");
console.log(student.getName());  
console.log(student.getResult()); 
console.log(student.Result);     
console.log(student.incrementResult()); 
