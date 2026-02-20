1.useState deep dive: batching updates:-
A deep dive into useState batching is really about understanding when React re-renders and how it groups multiple state updates into a single render cycle.
update example:-
function handleClick() {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
}

2.State immutability and how mutation breaks UI:-
React state must be treated as immutable because React relies on reference equality to detect changes. Mutating state keeps the same reference, preventing React 
from re-rendering and breaking memoization and effects. Immutable updates create new references, enabling efficient change detection and predictable UI updates.
example:-
const [items, setItems] = useState(["apple", "banana"]);
function addItem() {
  items.push("orange"); 
  setItems(items);       
}

3.Controlled vs uncontrolled inputs:-
-Uncontrolled Input
In uncontrolled inputs the input value is not managed by the component's state. It maintains its own internal state with the help of DOM. It remembers what 
you typed in the field. That value can be exploited by pulling it using the ref keyword whenever it needs to be used. In uncontrolled inputs, the value you 
submit is the value you get.
.How It Works
-The input stores its own value internally (inside the DOM).
-Instead of useState, we use refs (useRef) to grab the value when needed.
-React does not control what’s inside the input.
example:-
import { useRef } from "react";
function UncontrolledInput() {
  const inputRef = useRef(null); 
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You entered: ${inputRef.current.value}`); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
export default UncontrolledInput;

-Controlled input
In controlled inputs the value is fully controlled by the component state. Any update or change in the input value is done by the event handler like onChange 
and onInput that first update the value in state and then it is reflected in the input. The component state is the single source of truth in case of controlled components.
.How It Works
-The input’s value is stored in React state using useState.
-Every time a user types, an onChange event updates the state.
-Since React is in charge, the input is always in sync with the app’s state.
example:-
import { useState } from "react";
function ControlledInput() {
  const [text, setText] = useState(""); 
  return (
    <div>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <p>You typed: {text}</p>
    </div>
  );
}
export default ControlledInput;


4.React rendering lifecycle:-
React rendering happens in four major phases:

1. Trigger Phase — What Causes a Component to Re-render?
A component renders when:
-Initial Mount: ReactDOM.render() runs.
-State Change: setState or useState updater is called.
-Parent Re-render: If the parent re-renders, the child usually does too.
-Context Change: useContext value updates.
-Force Update: forceUpdate() is used (rare — avoid this).

2. Render Phase — React Calculates the Virtual UI
-React calls your component function.
-Your component returns JSX.
-React creates a new Virtual DOM representation.
-React takes a snapshot of props + state.
-Child components are recursively processed.

3. Reconciliation Phase — React Figures Out What Changed
-React compares the new Virtual DOM to the previous one.
-It identifies what actually changed.
-React calculates the minimum DOM operations needed.
-It prepares a list of DOM updates (effect list).
-Still — no real DOM updates yet.
-This process is extremely fast thanks to React’s diffing algorithm.

4. Commit Phase — Real DOM Updates Happen
-React applies updates to the actual DOM.
-Runs cleanup from previous effects.
-Runs useLayoutEffect synchronously before paint.
-Browser repaints the screen.
-Runs useEffect asynchronously after paint.

5.Common state mistakes and fixes:-
Common React state mistakes include mutating state, relying on stale closures, duplicating derived state, incorrectly updating nested objects, and causing infinite 
effect loops. These issues arise from misunderstanding immutability and React’s render cycle. Proper fixes involve functional updates, immutable patterns, minimal state 
design, and correct effect dependencies.
mistakes example:-
const [user, setUser] = useState({ name: "Parth" });
user.name = "Abc";
setUser(user);

fixes example:-
useEffect(() => {
  console.log(count);
}, [count]);

6.Build form with controlled inputs:-
import { useState } from "react";

export default function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agree: false
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function validate() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.email.includes("@")) {
      newErrors.email = "Valid email required.";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.agree) {
      newErrors.agree = "You must accept terms";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", form);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
          />
          I agree to terms
        </label>
        {errors.agree && <p>{errors.agree}</p>}
        <br></br>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}


7.Implement multi-field form state:-
import { useState } from "react";

export default function JobApplicationForm() {
  const [form, setForm] = useState({
    fullName: "",
    position: "",
    experience: "junior",
    bio: "",
    subscribe: false
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Application submitted:", form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Position:</label>
        <select
          name="position"
          value={form.position}
          onChange={handleChange}
        >
          <option value="">Select a role</option>
          <option value="frontend">Frontend Developer</option>
          <option value="backend">Backend Developer</option>
          <option value="designer">Designer</option>
        </select>
      </div>
      <div>
        <label>Experience Level:</label>

        <label>
          <input
            type="radio"
            name="experience"
            value="junior"
            checked={form.experience === "junior"}
            onChange={handleChange}
          />
          Junior
        </label>

        <label>
          <input
            type="radio"
            name="experience"
            value="mid"
            checked={form.experience === "mid"}
            onChange={handleChange}
          />
          Mid
        </label>

        <label>
          <input
            type="radio"
            name="experience"
            value="senior"
            checked={form.experience === "senior"}
            onChange={handleChange}
          />
          Senior
        </label>
      </div>

      <div>
        <label>Short Bio:</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="subscribe"
            checked={form.subscribe}
            onChange={handleChange}
          />
          Subscribe to updates
        </label>
      </div>

      <button type="submit">Apply</button>
    </form>
  );
}


8.Create dynamic form validation:-
import { useState } from "react";

export default function JobApplicationForm() {
  const [form, setForm] = useState({
    fullName: "",
    position: "",
    experience: "junior",
    bio: "",
    subscribe: false
  });

  const [errors, setErrors] = useState({});

  function validateField(name, value) {
    switch (name) {
      case "fullName":
        return value.trim() ? "" : "Full name required.";

      case "position":
        return value ? "" : "Please select a position.";

      case "bio":
        return value.length >= 10
          ? ""
          : "Bio must be at least 10 characters.";

      default:
        return "";
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setForm(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, fieldValue)
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Application submitted:", form);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
      />
      {errors.fullName && <p>{errors.fullName}</p>}

      <select
        name="position"
        value={form.position}
        onChange={handleChange}
      >
        <option value="">Select role</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
      </select>
      {errors.position && <p>{errors.position}</p>}

      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
      />
      {errors.bio && <p>{errors.bio}</p>}

      <button type="submit">Apply</button>
    </form>
  );
}
