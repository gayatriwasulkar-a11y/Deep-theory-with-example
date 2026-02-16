1.Costom Error class:-
In JavaScript, the recommended way to create a custom error class is by extending the built-in Error class. This approach allows custom errors to inherit all standard error 
properties (like message, name, and stack) and ensures they work correctly with the instanceof operator. 
Example:-
class ValidationError extends Error {
  constructor(message) {
    super(message); 
    this.name = 'ValidationError'; 
  }
}

2.Error boundaries:-
Error boundaries are specialized React components that catch JavaScript errors in their child component tree during rendering, in lifecycle methods, and in constructors.
Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component 
tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

3.Debugging memory leaks:-
Debugging JavaScript memory leaks involves using browser developer tools, primarily Chrome DevTools, to profile memory usage, identify common leak patterns, and analyze object retention paths. 
A memory leak occurs when JavaScript code unintentionally holds references to objects that are no longer needed, preventing the garbage collector from reclaiming their memory. 
The primary indicator is memory usage that continuously increases over time without plateauing. 

4.Chrome DevTools advanced usage:-
Explore advanced Network panel techniques, including how to find performance bottlenecks, debug popups, configure network conditions, use shortcuts to determine network request initiators and more.
I casually use Chrome developer tools for debugging AJAX & JavaScript. Mostly that means the console to check on element/variable/method state, occasionally 'network' tab to debug issues fed 
through ajax, very occasionally break points in debugger if I can't hunt down a JS bug.
Google collects usage statistics (such as tool invocation success rates, latency, and environment information) to improve the reliability and performance of Chrome DevTools MCP.

Data collection is enabled by default. You can opt-out by passing the --no-usage-statistics flag when starting the server:

"args": ["-y", "chrome-devtools-mcp@latest", "--no-usage-statistics"]
Google handles this data in accordance with the Google Privacy Policy.

Google's collection of usage statistics for Chrome DevTools MCP is independent from the Chrome browser's usage statistics. Opting out of Chrome metrics does not automatically 
opt you out of this tool, and vice-versa.

5.Handling async errors properly:-
Properly handling asynchronous errors in JavaScript primarily involves using try...catch blocks with async/await and the .catch() method with Promises. 
Example:-
this.basicAuthLogin= async function(user)
{
    "use strict";
    const login = new Login(this.host, this.url, user, user.pw);
 this.sessionID=getSessionID(result.request.response);
}

6. how to handle custom errors:-
class ErrorDetails extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ErrorDetails';
  }
}

class ValidationError extends Error { /*...*/ }
class MissingPropertyError extends ValidationError { /* ... */ }

function validateBook(book) {
  if (!book.pages) {
    throw new MissingPropertyError("pages");
  }

  if (!book.title) {
    throw new MissingPropertyError("title");
  }
}

function readBook(book) {
  let book;

  try {
    book = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ErrorDetails("Syntax Error", err);
    } else {
      throw err;
    }
  }

  try {
    validatebook(book);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ErrorDetails("Validation Error", err);
    } else {
      throw err;
    }
  }

}

try {
  readBook('{bad json}');
} catch (e) {
  if (e instanceof ErrorDetails) {
    alert(e);
    alert("Original error: " + e.cause);
  } else {
    throw e;
  }
}

7.
1)<!DOCTYPE html>
<html>
<body>
  <h2>Debugging with Breakpoints Example</h2>

  <label for="num1">Number 1:</label>
  <input type="text" id="num1" value="5"><br><br>
  <label for="num2">Number 2:</label>
  <input type="text" id="num2" value="1"><br><br>
  <button onclick="calculateSum()">Add Numbers</button>
  <p>Result: <span id="result"></span></p>

  <script>
    function calculateSum() {
      let num1 = document.getElementById("num1").value;
      let num2 = document.getElementById("num2").value;
      let sum = num1 + num2; 
    document.getElementById("result").textContent = sum;
    }
  </script>
</body>
</html>


