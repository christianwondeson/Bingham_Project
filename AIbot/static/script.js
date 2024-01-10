// Chatbot Popup Logic
document.getElementById('chatbot-button').addEventListener('click', function () {
    document.getElementById('chatbot-popup').style.display = 'block';
    document.getElementById('chatbot-button').style.display = 'none';
});

document.getElementById('close-button').addEventListener('click', function () {
    document.getElementById('chatbot-popup').style.display = 'none';
    document.getElementById('chatbot-button').style.display = 'block';
});

// Function to populate the question dropdown
function populateQuestionDropdown() {
    // Fetch custom patterns from the server
    fetch('/api/bingham-bot-questions')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        var dropdown = document.getElementById('questions');
        data.forEach(function (question, index) {
            var option = document.createElement('option');
            option.value = index;
            option.text = question;
            dropdown.add(option);
        });
    })
    .catch(error => {
        console.error('Error fetching questions:', error);
    });
}

// Function to ask a selected question
function askQuestion() {
    var selectedIndex = document.getElementById('questions').selectedIndex;
    if (selectedIndex !== -1) {
        var selectedQuestion = document.getElementById('questions').options[selectedIndex].text;
        sendMessage(selectedQuestion);
    } else {
        console.error('No question selected');
    }
}

// Function to handle user input and display chatbot responses
function sendMessage(message) {
    // Display user message
    appendMessage('User', message);

    // Send user message to the server (server-side implementation with NLTK)
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then(response => response.json())
    .then(data => {
        // Display chatbot response
        appendMessage('ChatBot', data.response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to append messages to the chatbot content
function appendMessage(sender, message) {
    var chatContent = document.getElementById('chatbot-content');
    var newMessage = document.createElement('p');
    newMessage.innerHTML = '<strong>' + sender + ':</strong> ' + message;
    chatContent.appendChild(newMessage);

    // Scroll to the bottom of the content to show the latest message
    chatContent.scrollTop = chatContent.scrollHeight;
}

// Example usage
document.addEventListener('DOMContentLoaded', function () {
    populateQuestionDropdown();
});
