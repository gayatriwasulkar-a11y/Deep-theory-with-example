1.DOM Tree Structure:-
When a web page loads, the browser creates a tree-like representation of the HTML document.
Each part of the document are nodes in the tree:
 Node	                   Description
Document	          Owner of all nodes in the document
<html>	            Element Node
<head>	            Element Node
<body>              Element Node
<a>	                Element Node
href	              Attribute Node
<h1>	              Element Node
My Header	          Text Node

2.Reflow vs Repaint performance costs:-
-Reflow (Layout): The browser calculates the position and size of all elements in the DOM, which can cascade and affect other elements. 
It is triggered by changing DOM elements, resizing, or modifying layout CSS (width, height, font-size). It is the most costly operation and directly impacts performance.

-Repaint (Redraw): Occurs when changing visual properties that don't affect layout, such as color, background-color, or visibility. While less expensive than reflow, 
excessive repaints can still degrade performance, particularly on low-power devices. 

3.Event bubbling, capturing, delegation patterns:-
-Event Capturing (Trickling):-The event travels down from the Window through the DOM tree to the target element.
Direction: Top-to-bottom (Ancestor Target).
Usage: It is less common, but enabled by setting the capture option to true in addEventListener.
Use Case: Useful for intercepting events before they reach their intended target. 

-Event Bubbling:- The event starts at the target element and propagates up through its ancestors to the root.
Direction: Bottom-to-top (Target Ancestor).
Default Behavior: addEventListener listens during this phase by default.
Stopping: Use event.stopPropagation() to prevent the event from bubbling further up. 

-Event Delegation Pattern:- Instead of attaching listeners to multiple individual child elements, a single listener is added to a parent element to manage events for all children.
Mechanism: It relies on event bubbling, where the parent catches the event after it bubbles up from the specific child element that was interacted with.
Performance: Reduces memory usage by having fewer event handlers.
Dynamic Elements: Handles events for elements added to the DOM after the initial page load.
Pitfall: Some events (e.g., focus, blur, scroll, mouseenter, mouseleave) do not bubble, making them hard to delegate. 

4.Browser rendering pipeline:-
The browser rendering pipeline converts HTML, CSS, and JavaScript into pixels on the screen through a series of stages: parsing (DOM/CSSOM creation), style calculation, layout 
(geometry calculation), painting (layer creation), and compositing. This process, often running at 60 frames per second, transforms code into visual elements using both the CPU and GPU. 
The browser orchestrated transformation process of HTML and CSS into pixels is fairly opaque, and as a result, most web developers don't consider how or when it runs.
-Key Stages of the Browser Rendering Pipeline
-Parsing (DOM & CSSOM): The browser parses HTML to create the Document Object Model (DOM) and parses CSS to create the CSS Object Model (CSSOM).
-Style (Recalculate Style): The browser matches CSS rules to DOM nodes to determine the computed styles for each element.
-Layout (Reflow): The browser calculates the exact geometry—position and size—of each element based on the DOM and CSSOM.
-Pre-paint: The browser determines which elements need to be repainted, optimizing performance.
-Paint: The browser fills in pixels, creating layers for different elements.
-Layerize (Composite Layers): The browser breaks the page into layers based on stacking contexts, transforms, or specialized properties (like will-change or transform: translate3d).
-Rasterize & Draw (Compositing): The compositor thread takes these layers, arranges them in the correct order, and sends the final image to the GPU for display. 

5.Virtual DOM vs Real DOM conceptual intro to React:-
In React, the Virtual DOM (VDOM) is a conceptual "blueprint" of your UI that allows React to manage updates efficiently without immediately touching the actual browser screen.
-Real DOM:-
The Real DOM (Document Object Model) is the tree structure of your webpage. While updating a single node in this tree is technically fast, the aftermath is slow. Every 
change triggers the browser's rendering pipeline, forcing expensive recalculations of layout and style (reflows) and redrawing pixels (repaints) for large portions of the page. 
-Virtual DOM:-
The Virtual DOM is a lightweight copy of the Real DOM kept entirely in memory as JavaScript objects. 
Decoupled from the Screen: Because it is just a plain object, changing it doesn't trigger any browser painting or layout.
Lightweight: It lacks the "heavy" properties of real browser nodes (like event listeners or style calculation logic), making it incredibly fast to create and destroy.

6.Build a fully interactive DOM app:-
-HTML CODE:-
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HOME | WELCOME</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Add My Task List</h1>
        <input type="text" id="taskInput" placeholder="Add a new task...">
        <button id="addButton">Add Task</button>
        <ul id="taskList"></ul>
    </div>
    <script src="script.js"></script>
</body>
</html>

-CSS CODE:-
body {
    font-family: sans-serif;
    background-color: #6e3c3c;
}
.container {
    max-width: 400px;
    margin: 20px auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
}
.completed {
    text-decoration: line-through;
    color: gray;
}

-Javascript CODE:-
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', addTask);
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="completeBtn">Complete</button>
            <button class="deleteBtn">Delete</button>
        `;
        
        taskList.appendChild(li);
        taskInput.value = '';
        li.querySelector('.completeBtn').addEventListener('click', toggleComplete);
        li.querySelector('.deleteBtn').addEventListener('click', deleteTask);
    }
}
function toggleComplete(event) {
    const taskItem = event.target.parentElement;
    taskItem.classList.toggle('completed'); 
}

function deleteTask(event) {
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem); 
}


7.Implement event delegation for list actions:-
-HTML CODE:-
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Delegation | Example</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Event Delegation for List Actions</h1>
    <ul id="item-list">
        <li data-action="complete">Task 1</li>
        <li data-action="delete">Task 2</li>
        <li data-action="complete">Task 3</li>
    </ul>
    <button id="add-item-btn">Add New Task</button>

    <script src="script.js"></script>
</body>
</html>

-CSS CODE:-
body {
    font-family: sans-serif;
    background-color: rgb(39, 8, 90);
}

ul {
    list-style-type: none;
    padding: 0;
    width: 300px;
}
h1{
    background-color: #f0f0f0;
}
li {
    margin: 5px;
    padding: 10px;
    border: 1px solid #435dac;
    cursor: pointer;
    background-color: #f9f9f9;
}
li:hover {
    background-color: #f0f0f0;
}

-Javascript Code:-
const itemList = document.getElementById('item-list');
const addItemBtn = document.getElementById('add-item-btn');

itemList.addEventListener('click', function(event) {
    if (event.target && event.target.tagName === 'LI') {
        const action = event.target.dataset.action; 

        if (action === 'complete') {
            alert('Completing task: ' + event.target.textContent);
            event.target.style.textDecoration = 'line-through';
        } else if (action === 'delete') {
        
            alert('Deleting task: ' + event.target.textContent);
            event.target.remove();
        }
    }
});

addItemBtn.addEventListener('click', function() {
    const newItem = document.createElement('li');
    const taskCount = itemList.children.length + 1;
    newItem.textContent = 'Task ' + taskCount;
    newItem.setAttribute('data-action', 'complete'); 
    itemList.appendChild(newItem);
});


