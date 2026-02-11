1.Event Loop:- Understanding the event loop involves exploring several interconnected JavaScript concepts, including the call stack, callback queue, and microtasks. This article endeavors 
to provide a comprehensive overview of these components, how they interact within the event loop, and why this knowledge is indispensable for modern web development. Through this exploration, 
the mysteries of the event loop will be revealed, empowering developers with the knowledge to leverage JavaScript's capabilities to their fullest.
the event loop monitors the call stack and the callback queue. When the call stack is empty, the event loop moves the first event from the queue into the call stack, making sure that callbacks 
are executed in a timely and orderly fashion.

2.Microtask queue:- Microtasks (higher priority) are fully processed in one batch before the event loop moves to the next macrotask.

3.Macrotask queue:- Macrotasks (lower priority) run one per event loop cycle (or "tick"), and after each macrotask is executed, the microtask queue is checked and drained again.

4.Promises & internal state transitions:-
-An object that represents the future result of an async operation. a Promise is the container/object, while the internal state transition is the process/lifecycle the container goes through.
The Promise object is designed around state management. When you initiate an asynchronous task (like fetch), it immediately returns a pending Promise object.
-The change in a Promise's internal state property. An internal state transition is the mechanism by which a Promise moves from one state to another (e.g., from pending to fulfilled) to signal 
the outcome of that operation.The internal state transition occurs when the task finishes and calls resolve or reject, updating the object’s internal state to fulfilled or rejected, which 
subsequently triggers the .then or .catch callbacks. 

5.async/await compilation behavior:-
-The keyword async means that a function always returns a promise. Other values are wrapped in a resolved promise automatically. The keyword can be applied to traditional functions declared with 
the function keyword, arrow functions, class methods, and object methods.
The keyword await pauses in a non-blocking way until the promise settles. For a fulfilled promise, the value is returned. For a rejected promise, an exception is thrown. Await can only be applied 
to something that returns a promise. Await cannot be used at the top level. Top-level usage would require wrapping in an anonymous async function. Also, await supports “thenable” objects (those with 
a callable then method). A third-party, non-promise object is promise-compatible if it supports a then method.
example:- 
async function weatherData() 
{
  console.log("Weather Data");
  const value = await Promise.resolve(2);
  console.log("Success");
  return value + 1;
}
weatherData().then(console.log);

6.Fetch API pipeline & error propagation:-
-The Fetch API pipeline involves a two-step process using promises to make an HTTP request and then process the response body. The most common 
example is a GET request to retrieve JSON data from a server. With the Fetch API, you make a request by calling fetch(), which is available as a global 
function in both window and worker contexts. You pass it a Request object or a string containing the URL to fetch, along with an optional argument to configure the request.
The fetch() function returns a Promise which is fulfilled with a Response object representing the server's response. You can then check the request status and extract the 
body of the response in various formats, including text and JSON, by calling the appropriate method on the response. 
-Error propagation in JavaScript refers to how errors are passed through the call stack. When an error occurs in a function, it can be caught and handled using try...catch 
blocks. If not caught, the error propagates up the call stack until it is either caught or causes the program to terminate.
example:-
function a() {
  throw new Error('An error');
}
function b() {
  a();
}
try {
  b();
} catch (e) {
  console.error(e.message); 
}

Hands-on Tasks:-
7.
function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      if (retries === 0) {
        throw error;
      }

      return new Promise(resolve => setTimeout(resolve, delay))
        .then(() => fetchWithRetry(url, options, retries - 1, delay));
    });
}
fetchWithRetry("https://api.example.com/data", {}, 3, 1000)
  .then(data => {
    console.log("Success:", data);
  })
  .catch(err => {
    console.error("Failed after retries:", err.message);
  });


8.
function delay(ex, value) {
  return new Promise(resolve =>
    setTimeout(() => resolve(value), ex));
}
async function parallelExample() {
  const results = await Promise.all([
    delay(100, "Gayatri"),
    delay(100, "Vaishnavi"),
    delay(100, "Mayuri")
  ]);

  console.log(results);
}
parallelExample();


9.
function delay(ex, value) 
{
  return new Promise(resolve =>
    setTimeout(() => resolve(value), ex));
}
async function serialExample() {
  const Gayatri = await delay(1000, "Gayatri");
  console.log(Gayatri);

  const Vidya = await delay(1000, "Vidya");
  console.log(Vidya);

  const Shantanu = await delay(1000, "Shantanu");
  console.log(Shantanu);
}
serialExample();


10.
console.log("10");
setTimeout(() => {
  console.log("20");
}, 0);

Promise.resolve().then(() => {
  console.log("30");
});

async function test() {
  console.log("40");
  await Promise.resolve();
  console.log("50");
}

test();
console.log("60");
