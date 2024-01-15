function getCurrentTimestamp() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function appendUserMessage(message) {
  $(".chat-body").append(`
        <div class="chat-bubble you">
            <div class="message">${message}</div>
            <div class="timestamp">${getCurrentTimestamp()}</div>
        </div>`);
}
function sendToServer(message) {
  $.ajax({
    type: "POST",
    url: "/get_response",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({ user_message: message }),
    success: function (response) {
      handleBotResponse(response.bot_response);
    },
    error: function () {
      console.error("Error sending message to server");
    },
  });
}
function handleBotResponse(botResponse) {
    const timestamp = getCurrentTimestamp();
    showLoadingIndicator();

    // Use the direct URL for the bot icon
    const botIconUrl = '{{ url_for("static", filename="img/bot.png") }}';

    const botMessageHTML = `
        <div class="chat-bubble bot bot-message">
            <div class="loading"></div>
            <img class="bot-icon" src="${botIconUrl}" alt="Bot Icon">
            <div class="message">${botResponse}</div>
            <div class="timestamp">${timestamp}</div>
        </div>`;

    appendBotMessage(botMessageHTML, function () {
        // Hide loading indicator after bot response is appended
        hideLoadingIndicator();
    });
}

  
function appendBotMessage(botMessageHTML, callback) {
  // Append the bot message to the chat body
  $(".chat-body").append(botMessageHTML);

  // Scroll to the bottom
  scrollToBottom();

  // Execute the callback function
  if (callback && typeof callback === "function") {
    callback();
  }
}
function showLoadingIndicator() {
  // Show loading indicator
  $(".loading").show();
}

function hideLoadingIndicator() {
  // Hide loading indicator
  $(".loading").hide();
}
function addBotResponse(message) {
  var botResponse = '<div class="chat-bubble bot">' + message + "</div>";
  $(".chat-body").append(botResponse);
  scrollToBottom();
}

function scrollToBottom() {
  // $('.chat-body').animate({ scrollTop: $('.chat-body')[0].scrollHeight }, "slow");
  var chatBody = $("#chatBody");
  chatBody.scrollTop(chatBody[0].scrollHeight);
}

function updateClickableQuestions(questions) {
  var clickableContainer = $(".chat-body");
  questions.forEach(function (question) {
    var clickableQuestion = $(
      '<div class="chat-bubble clickable" data-question="' +
        question.toLowerCase() +
        '">' +
        question +
        "</div>"
    );
    clickableQuestion.click(function () {
      appendUserMessage(question);
      sendToServer(question);
    });
    clickableContainer.append(clickableQuestion);
  });
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  var userMessage = $("#userInput").val();
  if (userMessage.trim() !== "") {
    appendUserMessage(userMessage);
    // Clear the input field
    $("#userInput").val("");
  }
}

function getBotResponse(userMessage) {
  // Simulate processing logic on the server side
  var processedMessage = processText(userMessage);

  // Simulate different bot responses based on processed input
  if (processedMessage.includes("admissions")) {
    addBotResponse(
      "Our admissions process at Bingham Academy includes submitting an application form, attending an interview, and providing necessary documents. If you have specific questions, feel free to ask."
    );
  } else if (processedMessage.includes("curriculum")) {
    addBotResponse(
      "Bingham Academy follows an internationally recognized curriculum, incorporating elements from the International Baccalaureate (IB) program. Our curriculum emphasizes a well-rounded education."
    );
  } else if (processedMessage.includes("facilities")) {
    addBotResponse(
      "Bingham Academy boasts modern facilities, including well-equipped classrooms, science laboratories, sports facilities, and a library. We prioritize providing a conducive learning environment."
    );
  } else if (processedMessage.includes("teachers")) {
    addBotResponse(
      "Our teaching staff at Bingham Academy consists of highly qualified and experienced educators dedicated to fostering a supportive learning environment. If you have specific teachers in mind, let me know!"
    );
  } else if (processedMessage.includes("sports")) {
    addBotResponse(
      "Bingham Academy offers a range of sports, including soccer, basketball, volleyball, track and field, and more. We encourage students to participate in physical activities for their holistic development."
    );
  } else if (processedMessage.includes("events")) {
    addBotResponse(
      "Bingham Academy hosts various events throughout the academic year, such as cultural festivals, sports meets, and parent-teacher conferences. Stay tuned for announcements!"
    );
  } else {
    // Default response for unrecognized input
    addBotResponse(
      "I'm sorry, I didn't understand that. Please feel free to ask another question about Bingham Academy."
    );
  }
  scrollToBottom();
}

function processText(text) {
  // Simulate processing logic (e.g., tokenization, lemmatization)
  return text.toLowerCase();
}

$(document).ready(function () {
  const timestamp = getCurrentTimestamp();
  const botMessageHTML = `
        <div class="chat-bubble bot">
            <div class="message">${botResponse}</div>
            <div class="timestamp">${timestamp}</div>
        </div>`;
  $(".chat-body").append(botMessageHTML);
});

$(document).ready(function () {
  $(".chat-bot-icon").click(function (e) {
    $(this).children("img").toggleClass("hide");
    $(this).children("svg").toggleClass("animate");
    $(".chat-screen").toggleClass("show-chat");
  });

  $(".chat-mail button").click(function () {
    const userMessage = $(".form-control").val();
    appendUserMessage(userMessage);
    sendToServer(userMessage);

    $(".chat-mail").addClass("hide");
    $(".chat-body").removeClass("hide");
    $(".chat-input").removeClass("hide");
    $(".chat-header-option").removeClass("hide");
  });

  $(".end-chat").click(function () {
    $(".chat-body").addClass("hide");
    $(".chat-input").addClass("hide");
    $(".chat-session-end").removeClass("hide");
    $(".chat-header-option").addClass("hide");
  });

  // Example: Handling a button click
  $("#submitButton").click(function () {
    sendMessage();
  });

  // Example: Handling enter key press in the input field
  $("#userInput").keypress(function (event) {
    handleKeyPress(event);
  });

  setTimeout(function () {
    updateClickableQuestions([
      "Tell me about admissions",
      "What is the curriculum?",
      "Can you explain the facilities?",
      "Who are the teachers?",
      "What sports do you offer?",
      "Any upcoming events?",
    ]);
  }, 1000);
});
