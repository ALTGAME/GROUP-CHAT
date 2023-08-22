// Get the login and chat elements
const login = document.getElementById("login");
const chat = document.getElementById("chat");
const messages = document.getElementById("messages");

// Check if the user is already logged in
const username = localStorage.getItem("username");
if (username) {
    // Hide the login element and show the chat element
    login.style.display = "none";
    chat.style.display = "block";
    // Fetch the messages from the server and display them
    fetchMessages();
} else {
    // Hide the chat element and show the login element
    chat.style.display = "none";
    login.style.display = "block";
}

// Handle the login form submission
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", function(event) {
    // Prevent the default form behavior
    event.preventDefault();
    // Get the username from the input field
    const username = loginForm.username.value;
    // Store the username in the local storage
    localStorage.setItem("username", username);
    // Hide the login element and show the chat element
    login.style.display = "none";
    chat.style.display = "block";
    // Fetch the messages from the server and display them
    fetchMessages();
});

// Handle the chat form submission
const chatForm = document.getElementById("chat-form");
chatForm.addEventListener("submit", function(event) {
    // Prevent the default form behavior
    event.preventDefault();
    // Get the message from the input field
    const message = chatForm.message.value;
    // Clear the input field
    chatForm.message.value = "";
    // Send the message to the server using fetch API
    fetch("/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: localStorage.getItem("username"),
            message: message
        })
    }).then(function(response) {
        // Check if the response is ok
        if (response.ok) {
            // Fetch the messages from the server and display them
            fetchMessages();
        } else {
            // Display an error message
            alert("Something went wrong!");
        }
    });
});

// Define a function to fetch and display the messages from the server
function fetchMessages() {
    // Use fetch API to get the messages from the server
    fetch("/messages")
        .then(function(response) {
            // Check if the response is ok
            if (response.ok) {
                // Parse the response as JSON
                return response.json();
            } else {
                // Display an error message
                alert("Something went wrong!");
            }
        })
        .then(function(data) {
            // Clear the messages element
            messages.innerHTML = "";
            // Loop through the data array and create a paragraph element for each message
            for (let item of data) {
                let p = document.createElement("p");
                p.textContent = item.username + ": " + item.message;
                messages.appendChild(p);
            }
        });
}
