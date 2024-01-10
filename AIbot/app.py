from flask import Flask, render_template, request, jsonify
from chatbot import chatbot_response
from flask_cors import CORS

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    bot_response = chatbot_response(user_message)
    return jsonify({'response': bot_response})

@app.route('/api/custom-patterns')
def get_custom_patterns():
    custom_patterns = [(r'hi|hello|hey', ['Hello!', 'Hi there!', 'Hey!']),
        (r'how are you', ['I am doing well, thank you!', 'I am fine, how about you?']),
        (r'what is your name', ['You can call me ChatBot.', 'I am just a chatbot.']),
        (r'school', ['Bingham School is a great place for learning. How can I help you with school-related questions?']),
        (r'(\bstudent\b|\bpupil\b)', ['If you have questions about being a student at Bingham School, feel free to ask.']),
        (r'teacher|professor', ['Our school has dedicated and qualified teachers. How can I assist you with teacher-related inquiries?']),
        (r'(\bassignment\b|\bhomework\b)', ['If you need help with assignments or homework, feel free to ask for guidance.']),
        (r'bye|goodbye', ['Goodbye!', 'Have a great day!', 'See you later.']),
        (r'how old are you', ['I don’t have an age. I’m just a computer program.', 'I exist in the digital realm, so age is not applicable.']),
        (r'what can you do', ['I can help you with school-related questions, provide information, and have casual conversations. Feel free to ask me anything!']),
        (r'(\bthanks\b|\bthank you\b)', ['You’re welcome!', 'No problem, happy to help!', 'Anytime!']),
        (r'weather', ['I\'m sorry, I don’t have real-time information. You can check a weather website for the current conditions.']),
        (r'joke|tell me a joke', ['Why don\'t scientists trust atoms? Because they make up everything!', 'What do you call fake spaghetti? An impasta!']),
        (r'favorite color', ['I don\’t have a favorite color. I appreciate all colors equally.']),
        (r'how do I contact the school', ['You can find contact information on the school website or contact the main office during school hours.'])]
    return jsonify(custom_patterns)


# CORS(app)

# Actual Bingham School bot user questions
bingham_bot_questions = [
    "What courses does Bingham School offer?",
    "How can I apply for admission?",
    "What extracurricular activities are available?",
    # Add more Bingham School-specific questions as needed
]

# Additional general questions
general_questions = [
    "Hello, how are you?",
    "What is your name?",
    "Tell me about Bingham School's history.",
    "Do you offer scholarships?",
    # Add more general questions as needed
]

# Additional international school questions
international_school_questions = [
    "How does Bingham School compare to other international schools?",
    "What is the student body like?",
    "Can international students apply?",
    "Tell me about the faculty.",
    # Add more international school-specific questions as needed
]

# Combine all questions
all_questions = bingham_bot_questions + general_questions + international_school_questions

@app.route('/api/bingham-bot-questions')
def get_bingham_bot_questions():
    return jsonify(all_questions)

if __name__ == '__main__':
    app.run(debug=True)
