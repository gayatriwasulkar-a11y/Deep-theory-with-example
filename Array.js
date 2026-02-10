1.Internal structure:- Internal structure of an array is how the JavaScript engine stores array elements, indexes, length, and metadata in memory, 
  not how the array looks in code.
 
2.Amortized time:- Amortized time is the average cost per operation over a sequence of operations, even if some individual operations are expensive.
  example:- const arr = [];
            for (let i = 0; i < 500; i++) 
            {
            arr.push(i);
            }

3.Sparse arrays:- A sparse array is an array where most indexes have no actual elements, meaning there are gaps (holes) between indexes.
  example:- const arr = [];
            arr[5] = "hello";
            console.log(arr.length); 
            console.log(arr);

4.Custom implementations of map:-
Array.prototype.customMap = function(callback) 
{
  const arrayNo = [];
  for (let i = 0; i < this.length; i++) 
  {
    arrayNo.push(callback(this[i], i, this));
  }
  return arrayNo;
};

const numbers = [4, 6, 8, 2, 5];
const idxNumbers = numbers.customMap(function(number)
{
  return number * 2;
});
console.log(idxNumbers); 


5.Custom implementations of filter:-
  Array.prototype.customFilter = function(callback) 
{
  const filteredArray = [];
  for (let i = 0; i < this.length; i++) 
  {
    if (callback(this[i], i, this)) 
    {
      filteredArray.push(this[i]);
    }
  }
  return filteredArray;
};
const numbers = [4, 6, 8, 2, 5];
const doubledNumbers = numbers.customFilter(function(number) 
{
  return number * 2;
});
console.log(doubledNumbers);


6.Custom implementations of reduce:-
  Array.prototype.customReduce = function(callback, initialValue) 
{
  let accumulator = initialValue;
  const startIndex = initialValue !== undefined ? 0 : 1;

  if (initialValue === undefined) 
  {
    accumulator = this[2];
  }

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};
const numbers = [4, 6, 8, 2, 5];
const doubledNumbers = numbers.customReduce(function(number) 
{
  return number * 2;
});
console.log(doubledNumbers);

7.Object Data Structures:- Objects are versatile data structures used to store various keyed collections and more complex entities.
An object data structure in JavaScript is a collection of key–value pairs where:
-keys are strings or symbols
-values can be any data type
-data is accessed by keys, not positions
  example:- const user = {
            name: "Gayatri",
            age: 25,
            isAdmin: false
            };
            user.name;      
            user["age"];   

8.Prototypes:-
Every object in JavaScript has an internal link to another object called its prototype. The prototype object acts as a template, providing shared properties and methods 
to all instances that link to it, which promotes memory efficiency and code reusability.
A prototype is an object that other objects can inherit properties and methods from. In JavaScript, every object has an internal link to another object called its prototype.  
 example:- const person = {
           greet() {
           console.log("Hello!");
           }
          };
          const user = {
          name: "Gayatri"
          };
         Object.setPrototypeOf(user, person);
         user.greet(); 

9.Deep Copy Mechanics:- A deep copy ensures that every part of the new object, including all nested structures, is an entirely new instance stored in a separate memory location. 
The copied object is fully independent of the original. Modifications to the deep copy will never affect the source object, ensuring data integrity.
example:- const original = {
          name: "Gayatri",
          address: {
          city: "Pune"
           }
          };
        const deepCopy = structuredClone(original);
        deepCopy.address.city = "Shegaon";
        console.log(original.address.city); 


10.Shallow Copy Mechanics:- When an object or array is shallow-copied, a new instance is created for the top level, but any nested objects or arrays retain their original
memory addresses (references). Changes to top-level primitive values in the copy do not affect the original. However, changes to nested objects' properties in the copy will also change the original, 
as they point to the same underlying data in memory.
example:- const original = {
          name: "Gayatri",
          address: {
          city: "Pune"
          }
          };
        const shallowCopy = { ...original };
        shallowCopy.address.city = "Shegaon";
        console.log(original.address.city); 


11.Destructuring patterns:- Destructuring is a JavaScript syntax that allows you to extract values from arrays or objects into variables in a clean and readable way.
-Array Destructuring:- Array destructuring uses square brackets [] to unpack values based on their position. Examples include extracting values and skipping elements using commas. The 
rest operator (...) can collect remaining elements, and it can also be used for swapping variable values easily. 
-Object Destructuring:- Object destructuring uses curly braces {} to extract values by property names. It allows for renaming variables, setting default values for missing properties, 
and using the rest operator to collect remaining properties into a new object.


12. example:-
function deepReduce(data, reducer, initialValue) 
{
  let acc = initialValue;
  for (const item of data) 
  {
    if (Array.isArray(item)) 
    {
      acc = deepReduce(item, reducer, acc);
    } else 
    {
      acc = reducer(acc, item);
    }
  }

  return acc;
}
const data = [1, [2, [3, 6], 5], 6];

const sum = deepReduce(
  data,
  (acc, value) => acc + value,
  0
);

console.log(sum); 
  

13.example:- 
  const original = {
  details: {
    name: 'Gayatri',
    date: new Date() 
  },
  items: [1, 2, 3]
};

const clone = structuredClone(original);
clone.details.name = 'Gayatri wasulkar';
clone.items.push(4);
console.log(original.details.name); 
console.log(clone.details.name);    
console.log(original.items);        
console.log(clone.items);        


14.example:-
function destructure(source, shape) 
{
  if (source == null) return shape;
  if (Array.isArray(shape)) 
  {
    return shape.map((item, index) =>
      destructure(source[index], item)
    );
  }
  if (typeof shape === "object") {
    const result = {};
    for (const key in shape) {
      result[key] = destructure(source[key], shape[key]);
    }
    return result;
  }
  return source !== undefined ? source : shape;
}
const data = [30, , 50];

const [a, b, c] = destructure(data, [0, 90, 0]);

console.log(a, b, c); 

