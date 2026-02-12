1.Prototype chain:-
The prototype chain is a core JavaScript concept enabling the inheritance of properties and methods between objects. It facilitates code reuse, efficient property lookup, 
and object hierarchy creation.
-Every JavaScript object has an internal link to another object, called its prototype.
-The prototype chain forms when objects inherit properties and methods from their prototypes.
-Property or method access starts from the object itself and traverses up the chain if not found.
-The chain ends at null, the prototype of Object.prototype.
example:-
const parent = { greet: () => "Hello" };
const child = Object.create(parent);
console.log(child.greet());
console.log(Object.getPrototypeOf(child) === parent); 

2.Constructor functions:-
Constructor functions define the prototype of the properties an object will contain. Using the constructor function, we can create a new object after passing the required parameters.
Inheriting a previously defined constructor function means using the parameters of the previously defined function along with adding some new parameters to the newly defined constructor 
function. For this, we need to use the call() function which allows us to call a function defined somewhere else in the current context. 

3.New keyword:-
new keyword is used to create an instance of an object that has a constructor function. On calling the constructor function with the 'new' operator, the following actions are taken:
-A new empty object is created.
-The new object’s internal 'Prototype' property (__proto__) is set the same as the prototype of the constructing function.
-The 'this' variable is made to point to the newly created object. It binds the property that is declared with the 'this' keyword to the new object.
-About the returned value, there are three situations below. 
example:-
function Food(color, taste) {
    this.color = color;
    this.taste = taste;
}
const food1 = new Food('Yellow', 'Sweet');

console.log(food1.color);

4.ES6 Classes:-
ES6 JavaScript supports Object-Oriented programming components. There are three concepts in Object-Oriented Programming Object, Class, and Methods. In the ES6 to create any class, you 
need to use the class keyword.
Object: A real-time object entity means the presentation of any entity in real-time.
Class: It is the before the plan of creating any objects which is known as the blueprint of any objects which you want to create.
Methods: It communicates between the objects.
example:-
class student {
    constructor(name, studentID, rank) {
        this.n = name;
        this.s = studentID;
        this.r = rank;
    }
    decreaserank() {
        this.r -= 1;
    }
}
const std = new student("Gayatri", 20154, 25)
std.decreaserank();
console.log(std.n); 
console.log(std.s); 
console.log(std.r); 


5.Encapsulation patterns:-
Encapsulation in JavaScript is one of the core principles of Object-Oriented Programming (OOP).It means bundling related data (properties/variables) and 
behavior (methods/functions) into a single unit (object or class) while restricting direct access to some parts of that object.
Encapsulation in simple terms means keeping data and methods together in one unit while restricting direct access to some details. You show only what is needed. You hide the rest.
In modern JavaScript development, controlling how data is accessed and modified is crucial for creating secure, modular, and maintainable applications. This concept is known as Encapsulation.
example:-
const userID = {
  name: "Gayatri",
  age: 25,
 getAge() {
    return this.age;
  },
setAge(newAge) {
    if (newAge > 0) {
      this.age = newAge;
    } else {
      console.log("Invalid age");
    }
  }
};
console.log(userID.getAge()); 
userID.setAge(24);
console.log(userID.getAge()); 


6.Mixins & inheritance:-
-A mixin is an object or function that provides reusable methods or properties. We can “mix” these into classes to add additional behavior. Unlike inheritance, mixins don’t 
create parent-child relationships between classes. Instead, they allow unrelated classes to share functionality.
Mixins let us avoid deep inheritance hierarchies, keeping our class structure simple and easier to maintain.
In JavaScript we can only inherit from a single object. There can be only one [[Prototype]] for an object. And a class may extend only one other class.
But sometimes that feels limiting. For instance, we have a class StreetSweeper and a class Bicycle, and want to make their mix: a StreetSweepingBicycle.
Or we have a class User and a class EventEmitter that implements event generation, and we’d like to add the functionality of EventEmitter to User, so that our users can emit events.
example:-
let mixinHi = {
  sayHello() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}
Object.assign(User.prototype, mixinHi);

new User("Gayatri").sayHello(); 

-Inheritance is the method that allows objects to inherit properties and methods from other objects. It means passing characteristics from parent objects to child objects. 
Inheritance enables code reusability and the structuring of relationships between objects. It creates a hierarchy in which a child object can access the functionality and features of 
its parent object. Using inheritance, we can create new classes from existing ones, and child classes can reuse the properties and methods of their parent classes. 
example:-
class Student {
  ask() {
    console.log("Student ask");
  }
}

class Vidya extends Student {
  solveExample() {
    console.log("Vidya solveExample");
  }
}
const vidya = new Vidya();
vidya.ask();
vidya.solveExample();


7.User → Admin class:-
class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }
  login() {
    console.log(`${this.username} logged in`);
  }
  logout() {
    console.log(`${this.username} logged out`);
  }
  getDetails() {
    return `Username: ${this.username}, Email: ${this.email}`;
  }
}
class Admin extends User {
  constructor(username, email, adminLevel) {
    super(username, email); 
    this.adminLevel = adminLevel;
  }
  deleteUser(user) 
  {
    console.log(`Admin ${this.username} 
deleted user ${user.username}`);
  }
  getDetails() {
    return `Admin: ${this.username}, Email: ${this.email}, Level: ${this.adminLevel}`;
  }
}
const user1 = new User("Gayatri_wasulkar", "gayatriw@gmail.com");
const admin1 = new Admin("Vidya_ghule", "ghulevidya@gmail.com",1);

user1.login();
console.log(user1.getDetails());
admin1.login(); 
admin1.deleteUser(user1);
console.log(admin1.getDetails());


8.Implement private fields:-
class User {
  #username;   
  #email;      
  constructor(username, email) {
    this.#username = username;
    this.#email = email;
  }
  login() {
    console.log(`${this.#username} logged in`);
  }
  logout() {
    console.log(`${this.#username} logged out`);
  }
  getDetails() {
    return `Username: ${this.#username}, Email: ${this.#email}`;
  }
  get username() {
    return this.#username;
  }
}
class Admin extends User {
  #adminLevel;   
  constructor(username, email, adminLevel) {
    super(username, email);
    this.#adminLevel = adminLevel;
  }
  deleteUser(user) {
    console.log(`Admin ${this.username} deleted user ${user.username}`);
  }
  getDetails() {
    return `Admin: ${this.username}, Level: ${this.#adminLevel}`;
  }
}
const user1 = new User("Gayatri_wasulkar", "gayatriw@gmail.com");
const admin1 = new Admin("Vidya_ghule", "ghulevidya@gmail.com", 1);

user1.login();
console.log(user1.getDetails());

admin1.login();  
admin1.deleteUser(user1);
console.log(admin1.getDetails());

9.Build prototype-based utility functions:-
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.greet = function () {
  return `Hi, I'm ${this.name}`;
};
User.prototype.isAdult = function () {
  return this.age >= 25;
};

User.prototype.getBirthYear = function () {
  const currentYear = new Date().getFullYear();
  return currentYear - this.age;
};
const user1 = new User("Gayatri", 25);
const user2 = new User("Vidya", 23);
console.log(user1.greet());      
console.log(user1.isAdult());      
console.log(user2.isAdult());      
console.log(user1.getBirthYear()); 
  

