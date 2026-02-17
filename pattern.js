1.Observer pattern deep explanation:-
Observer design pattern, a staple of behavioral design patterns in JavaScript, provides a means to establish a one-to-many relationship between objects. This design pattern is 
especially valuable for decoupling components and facilitating extensibility in software applications. By employing this pattern, you can have one object (the subject) notify multiple 
observers (subscribers) about changes or events without requiring them to have direct knowledge of each other. This decoupling enhances maintainability and extensibility in your software projects.
example:-
class EventObserver {
  constructor() {
    this.handlers = new Set();
  }
  subscribe(fn) {
    this.handlers.add(fn);
  }
  unSubscribe(fn) {
    this.handlers.delete(fn);
  }

  fire(o, thisObj = null) {
    this.handlers.forEach((handler) => handler.call(thisObj, o));
  }
}
// Usage
const event = new EventObserver();

const observer1 = function (data) {
  console.log("Observer 1:", data);
};

const observer2 = function (data) {
  console.log("Observer 2:", data, "Context:", this);
};
event.subscribe(observer1);
event.subscribe(observer2);
event.fire("Event Fired", { customContext: "Hello" });
event.unSubscribe(observer1);
event.fire("Event After Unsubscribe", { customContext: "Hi" });

2.Factory pattern implementation:-
The Factory Pattern can be implemented in JavaScript using a simple factory function. This function takes an identifier or properties as parameters and returns a new 
object instance corresponding to the parameters. Here's a step-by-step guide to creating a basic Factory Pattern implementation:
example:-
function CarFactory(model, year) {
  return {
    model: model,
    year: year,
    displayInfo: function() {
      console.log(`Model: ${this.model}, Year: ${this.year}`);
    }
  };
}

3.Singleton pitfalls:-
The Singleton Pattern is one of the simplest & important design patterns, yet it is frequently misunderstood and misused.
Think of the Singleton pattern like having a single source of truth in your application. It’s like having one master configuration file that everyone refers to, 
rather than multiple copies that could get out of sync. In technical terms, a Singleton is a class that ensures only one instance of itself exists and provides a 
global point of access to that instance. The Singleton Pattern ensures that a class or object has only one instance and provides a global access point to that instance.
example:-
class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }

    this.logs = [];
    Logger.instance = this;
  }

  log(message) {
    const entry = `[${new Date().toISOString()}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  getLogs() {
    return this.logs;
  }
}

// Usage
const logger1 = new Logger();
const logger2 = new Logger();

logger1.log("Application started");
logger2.log("User logged in");

console.log(logger1 === logger2); 

4.Module pattern best usage:-
JavaScript module patterns help structure code into distinct, manageable sections, making it easy to maintain, test, and reuse. By organizing code into modules, we reduce the chance 
of naming conflicts and improve modularity, which is essential in modern JavaScript applications. This post will explore the various module patterns in JavaScript, discussing their strengths, 
weaknesses, and when to use them. The Module Pattern is a design pattern that creates an IIFE (Immediately Invoked Function Expression) which encapsulates variables and functions within a local scope, 
exposing only certain properties and methods to the outer scope. This creates a form of private data and helps keep the global namespace clean.

5.MVC architecture:-
In recent times, the MVC pattern is applied to a diverse range of programming languages, including JavaScript. JavaScript consists of a number of frameworks to support 
MVC architecture or variations on it. It allows the developers to add structure to their applications easily and without much effort.
MVC consists of three components:
1.Model
2.View
3.Controller
1.Models:-
Models are used for managing the data for an application. They are not concerned with the user-interface or presentation layers. Instead, they represent unique 
forms of data that an application may require. When a model is changed or updated, it will typically notify its observers about the change that has occurred so that they can act accordingly.
2.view:-
Views are a visual representation of models that provide a filtered view of their current state. The JavaScript views are used for building and maintaining a DOM element. 
A view typically observes a model and is notified when the model changes, allowing the view to update itself accordingly.
3.Controller:-
Controllers act like intermediates between models and views, which are responsible for updating the model when the user manipulates the view. In the above example of our photo gallery 
application, a controller would be responsible for handling changes the user made to the edit view for a particular photo, updating a specific photo model when a user has finished editing.

6.Implement an event bus:-
class EventBus {
  constructor() {
    this.eventObject = {};
    this.callbackId = 0;
  }
  publish(eventName, ...args) {
    const callbackObject = this.eventObject[eventName];

    if (!callbackObject) return console.warn(eventName + " not found!");

    for (let id in callbackObject) {
      callbackObject[id](...args);

      if (id[0] === "d") {
        delete callbackObject[id];
      }
    }
  }
  subscribe(eventName, callback) {
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = {};
    }
    const id = this.callbackId++;
    this.eventObject[eventName][id] = callback;
    const unSubscribe = () => {
      delete this.eventObject[eventName][id];
      if (Object.keys(this.eventObject[eventName]).length === 0) {
        delete this.eventObject[eventName];
      }
    };
    return { unSubscribe };
  }
  subscribeOnce(eventName, callback) {
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = {};
    }
    const id = "d" + this.callbackId++;
    this.eventObject[eventName][id] = callback;

    const unSubscribe = () => {
      delete this.eventObject[eventName][id];

      if (Object.keys(this.eventObject[eventName]).length === 0) {
        delete this.eventObject[eventName];
      }
    };
    return { unSubscribe };
  }

  clear(eventName) {
    if (!eventName) {
      this.eventObject = {};
      return;
    }
    delete this.eventObject[eventName];
  }
}
const eventBus = new EventBus();
eventBus.subscribe("eventX", (obj, num) => {
  console.log("Module A", obj, num);
});
eventBus.subscribe("eventX", (obj, num) => {
  console.log("Module B", obj, num);
});
eventBus.subscribe("eventX", (obj, num) => {
  console.log("Module C", obj, num);
});
eventBus.publish("eventX", { msg: "EventX published!" }, 1);
eventBus.clear("eventX");
eventBus.publish("eventX", { msg: "EventX published again!" }, 2);


7.Create a factory for dynamic component creation:-
const TextField = ({ name, label, value, onChange }) => (
  <div className="form-field">
    <label htmlFor={name}>{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}/>
  </div>
);
const SelectField = ({ name, label, options, value, onChange }) => (
  <div className="form-field">
    <label htmlFor={name}>{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}/>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
const CheckboxField = ({ name, label, checked, onChange }) => (
  <div className="form-field checkbox">
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={checked}
      onChange={onChange}/>
    <label htmlFor={name}>{label}</label>
  </div>
);
// Form Field Factory
class FormFieldFactory {
  createField(fieldType, props) {
    switch (fieldType) {
      case 'text':
        return <TextField {...props} />;
      case 'select':
        return <SelectField {...props} />;
      case 'checkbox':
        return <CheckboxField {...props} />;
      default:
        return <TextField {...props} />;
    }
  }
}
// Usage in a React component
function DynamicForm({ formConfig, formValues, onChange }) {
  const fieldFactory = new FormFieldFactory();
  return (
    <form>
      {formConfig.fields.map(field => (
        <div key={field.id}>
          {fieldFactory.createField(field.type, {
            name: field.name,
            label: field.label,
            value: formValues[field.name] || '',
            checked: field.type === 'checkbox' ? !!formValues[field.name] : undefined,
            options: field.options,
            onChange: onChange
          })}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
// Example usage
function UserProfileForm() {
  const [values, setValues] = useState({
    name: '',
    role: 'user',
    receiveNotifications: true
  });
  const formConfig = {
    fields: [
      { id: 'name', name: 'name', type: 'text', label: 'Full Name' },
      { 
        id: 'role', 
        name: 'role', 
        type: 'select', 
        label: 'Role',
        options: [
          { value: 'user', label: 'User' },
          { value: 'admin', label: 'Administrator' },
          { value: 'editor', label: 'Editor' }]
      },
      { id: 'notifications', name: 'receiveNotifications', type: 'checkbox', label: 'Receive Notifications' }]
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  return <DynamicForm formConfig={formConfig} formValues={values} onChange={handleChange} />;
}


2.simple example:-
//index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);

//App.js
import Table from './component/Table';

function App(){
    const data=[
        {
            name:"Gayatri",
            city:"Pune"
        },
        {
            name:"Vishal",
            city:"Mumbai"
        },
        {
            name:"Shantanu",
            city:"Lonavala"
        }
        
    ];
    return(
        <Table item={data}/>
    );
}
export default App;
//Table.js
function Table(props){
    return<>
    <table>
        <tr>
            <th>Name</th>
            <th>City</th>
        </tr>
        {props.item.map((data)=>
        <tr>
            <td>{props.name}</td>
            <td>{props.city}</td>
        </tr>
        )}
        
    </table>
    </>;
}

