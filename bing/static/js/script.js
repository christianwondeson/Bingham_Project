// script.js
document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');

    function appendMessage(sender, message, clickable = false) {
        const messageElement = document.createElement('div');
        messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
        messageElement.innerHTML = clickable ? `<div class="clickable">${message}</div>` : message;
        chatBox.appendChild(messageElement);

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;

        // Attach animation to clickable questions
        if (clickable) {
            const clickableDiv = messageElement.querySelector('.clickable');

            // Add click event to automatically send the question to the bot
            clickableDiv.addEventListener('click', function () {
                userInput.value = clickableDiv.innerText;
                sendMessage();
            });
        }
    }

    function sendMessage() {
        const userMessage = userInput.value;
        if (!userMessage.trim()) return;

        appendMessage('user', userMessage);


        
        // Send user message to the server and get the bot's response
        fetch('/get_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_message: userMessage }),
        })
            .then(response => response.json())
            .then(data => {
                const botResponse = data.bot_response;
                appendMessage('bot', botResponse);
            });

        // Clear the user input
        userInput.value = '';
    }

    // Attach the sendMessage function to the click event of the button
    document.getElementById('send-button').addEventListener('click', sendMessage);

    // Trigger sendMessage when the user presses Enter in the input field
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Predefined clickable questions
    const clickableQuestions = [
        "Tell me about admissions",
        "What is the curriculum?",
        "Can you explain the facilities?",
        "Who are the teachers?",
        "What sports do you offer?",
        "Any upcoming events?",
    ];

    // Add clickable questions to the chatbox
    clickableQuestions.forEach(question => appendMessage('bot', question, true));
});
