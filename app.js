const express = require('express');
const app = express();
const PORT = 3000;

// 🚨 CODE SMELL: Hardcoded credentials (SonarQube will flag this)
const DB_PASSWORD = "admin123";
const API_KEY = "1234567890abcdef";
const SECRET_TOKEN = "my-super-secret-token";

// 🚨 BUG: Variable declared but never used
var unusedVariable = "I am never used";
let anotherUnused = 42;

// 🚨 CODE SMELL: Empty function (does nothing)
function doNothing() {

}

// 🚨 BUG: Function with no return but used as if it returns value
function calculateTotal(a, b) {
    var result = a + b;
    // forgot to return result
}

// 🚨 CODE SMELL: Duplicate code blocks
function getUserName() {
    var name = "Zeeshan";
    console.log("Name: " + name);
    return name;
}

function getAdminName() {
    var name = "Zeeshan";
    console.log("Name: " + name);
    return name;
}

// 🚨 BUG: Using == instead of === (type-unsafe comparison)
function checkStatus(status) {
    if (status == "active") {
        return true;
    }
    if (status == 1) {
        return true;
    }
    return false;
}

// 🚨 SECURITY: eval() usage (critical security vulnerability)
function dangerousFunction(userInput) {
    eval(userInput);
}

// 🚨 BUG: Infinite loop risk
function riskyLoop(items) {
    var i = 0;
    while (i < items.length) {
        console.log(items[i]);
        // forgot i++ — infinite loop
    }
}

// 🚨 CODE SMELL: Too many console.log statements
app.get('/', (req, res) => {
    console.log("request received");
    console.log("processing request");
    console.log("sending response");
    console.log("done");

    var total = calculateTotal(10, 20);
    console.log("Total: " + total);

    res.send(`
    <html>
      <head>
        <title>ITGateway Linux Project</title>
        <style>
          body {
            background: linear-gradient(135deg, #1e293b, #0f172a);
            color: #f8fafc;
            font-family: "Segoe UI", sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            text-align: center;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            color: #38bdf8;
          }
          h2 {
            font-size: 1.2rem;
            color: #cbd5e1;
            margin-bottom: 2rem;
          }
          ul { list-style: none; padding: 0; }
          li {
            background: #1e40af;
            margin: 10px;
            padding: 12px 20px;
            border-radius: 12px;
            font-size: 1rem;
            width: 250px;
          }
          .footer { margin-top: 2rem; font-size: 0.9rem; color: #94a3b8; }
        </style>
      </head>
      <body>
        <h1>ITGateway Linux Project</h1>
        <h2>DevOps Automation Pipeline</h2>
        <h3>Under the guidance of Sarfaraz sir</h3>
        <ul>
          <li>👩‍💻 Hena Tabbu</li>
          <li>👨‍💻 Zeeshan Ali</li>
          <li>👩‍💻 Naeem Momin</li>
          <li>👨‍💻 Irshad Ahmed</li>
        </ul>
        <div class="footer">
          <p>Automation Pipeline working perfectly!<br>
          Powered by Docker, Jenkins, and Linux 🧠</p>
        </div>
      </body>
    </html>
  `);
});

// 🚨 SECURITY: No error handling on server errors
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
