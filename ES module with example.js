1.Static Analysis in ES6 Modules:-
ES6 Modules static analysis means that the structure of your module (its imports and exports) can be fully understood at compile time — without running the code.
This is possible because ES6 modules (import / export) are:
-Declared at the top level only
-Not conditional
-Not dynamic
-Fully known before execution

2.Tree-Shaking capability:-
Tree-shaking capability is the ability of a build tool (like a JavaScript bundler) to detect and remove unused code from your final bundle before it’s shipped to users.
The name comes from the idea of shaking a tree so the dead branches fall off Tree — unused exports get removed.

3.Map:-
A Map is a collection of key-value pairs, where both the keys and values can be of any type (objects, primitives, etc.). Unlike regular objects, where keys are always 
strings or symbols, Map allows keys of any type.

4.Set:-
A Set is a collection of unique values. Unlike arrays, which allow duplicates, Set ensures that each value is stored only once. This makes it a useful structure 
when working with data where uniqueness is required.

5.WeakSet:-
A WeakSet is similar to a Set, but it only holds weakly referenced objects. This means that objects in a WeakSet can be garbage-collected if there are no other 
references to them, making it useful for memory management.

6.WeakMap:-
A WeakMap is similar to a Map, but its keys must be objects, and they are weakly referenced, meaning they can be garbage-collected if there are no other references to them.

7.Optional Chaining:-
The optional chaining (?.) operator accesses an object's property or calls a function. If the object accessed or function called using this operator is undefined or null, 
the expression short circuits and evaluates to undefined instead of throwing an error.
example:-
const adventurer = {
  name: "Gayatri",
  cat: {
    name: "meooo",
  },
};

const parrotName = adventurer.parrot?.name;
console.log(parrotName);
console.log(adventurer.nonExistentMethod?.());

8.Nullish coalescing:-
The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, 
and otherwise returns its left-hand side operand.
example:-
const value = null ?? "default string";
console.log(value);
const result = 0 ?? 42;
console.log(result);

9.Spread vs Rest operator:-
-The spread operator, represented by three dots (...), works by taking all the items in an array and spreading them out, essentially unpacking the array so that each item becomes 
an individual element. It's like taking a bunch of items from a box and laying them out separately on a table. This makes it easier to work with the individual items rather 
than dealing with the entire array as a single entity.
example:-
function abc(a, b, c) {
return a + b + c;
}
console.log(abc(...[1, 2, 3]));
-The rest operator is represented by three dots (...). When used in a function's parameter list, it catches any extra arguments passed to the function and packs them neatly into an array. 
This allows functions to handle varying numbers of arguments without explicitly defining them. So, you can think of it as a way to gather up the remaining arguments into an array for 
easy handling inside the function.
example:-
function abc(a, ...rest) {
return rest;
}
console.log(abc(10, 1, 2, 3, 4, 5));

10.Create a caching system using WeakMap:-
function createWeakCache(fn) {
  const cache = new WeakMap();
  return function (obj) {
    if (cache.has(obj)) {
      console.log("Returning cached result");
      return cache.get(obj);
    }
    console.log("Computing result");
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}
const expensiveCalculation = (user) => {
  return user.age * 2; 
};
const cachedCalculation = createWeakCache(expensiveCalculation);
const user = { name: "Gayatri", age: 25 };
console.log(cachedCalculation(user)); 
console.log(cachedCalculation(user)); 

11.Convert a multi-file project to ES modules:-
-HTML Code:-
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module Document</title>
</head>
<body>
    
</body>
<script type="module" src="script.js"></script>
</html>

-script code:-
import data from './file1.js'
import data2 from './file2.js'

console.log(data.a)
console.log(data.b)
console.log(data.addNumber(5,5))

-file1 code:-
 let a=5
let b=10

function addNumber(a,b)
{
    return a+b
}
export default
{
    a,
    b,
    addNumber
}

-file2 code:-
function subtract(a,b)
{
    return a-b
}
export default
{
    subtract
}

console.log(data2.subtrac
