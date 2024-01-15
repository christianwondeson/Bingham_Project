from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import spacy

app = Flask(__name__)
CORS(app)

# Load Spacy English model
nlp = spacy.load("en_core_web_sm")

# Merge the general responses and clickable questions into one dictionary
responses = {
    "greeting": "Hello! How can I assist you with information about our international school?",
    "goodbye": "Goodbye! If you have more questions, feel free to ask.",
    "admissions": "Our admissions process typically includes an application, interviews, and required documents. Do you have specific questions about admissions?",
    "curriculum": "We follow a [Your School's Name] curriculum, which focuses on [Brief Description of Curriculum].",
    "facilities": "Our school provides state-of-the-art facilities, including classrooms, laboratories, sports facilities, and more.",
    "teachers": "Our teaching staff is highly qualified and experienced in delivering quality education. Do you want to know more about a specific teacher or department?",
    "sports": "We offer a variety of sports activities and have dedicated facilities for sports enthusiasts. What specific sport are you interested in?",
    "events": "We host various events throughout the academic year, including sports meets, cultural events, and parent-teacher conferences.",
    "default": "I'm here to help! If you have specific questions about Bingham Academy, feel free to ask.",
}

# Dictionary to map lowercase versions of clickable questions to responses
clickable_questions_dict = {
    "tell me about admissions": "The admissions process at Bingham Academy involves submitting an application, attending an interview, and providing necessary documents. Do you have specific questions about admissions?",
    "what is the curriculum?": "Bingham Academy follows a curriculum designed to provide a well-rounded education with a Christian perspective. It covers a range of subjects to prepare students for a globally competitive world.",
    "can you explain the facilities?": "Our school boasts modern facilities, including spacious classrooms, well-equipped laboratories, a library, sports fields, and more. Is there a specific facility you would like to know more about?",
    "who are the teachers?": "Our teaching staff at Bingham Academy is composed of highly qualified and experienced educators dedicated to providing quality education. If you have a specific teacher or department in mind, feel free to ask.",
    "what sports do you offer?": "Bingham Academy offers a variety of sports, including soccer, basketball, volleyball, and track and field. Students are encouraged to participate in sports activities for physical fitness and character development.",
    "any upcoming events?": "We regularly organize events such as sports meets, cultural festivals, and parent-teacher conferences at Bingham Academy. Stay tuned for our upcoming events and join us in the celebrations!",
}

def process_text(text):
    # Process the text using spaCy
    doc = nlp(text)
    # Extract lemmatized tokens
    tokens = [token.lemma_ for token in doc]
    return tokens

def get_response(user_input):
    # Process user input
    processed_input = process_text(user_input)

    # Check for clickable questions first
    for keyword, response in clickable_questions_dict.items():
        if any(keyword.lower() in processed_input for keyword in response.split()):
            return response

    # Example logic for generating responses
    for keyword, response in responses.items():
        if any(keyword in processed_input):
            return response

    # If no match is found, respond with the default message
    return responses["default"]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_bot_response():
    try:
        user_message = request.json['user_message']
        bot_response = get_response(user_message)
        return jsonify({'bot_response': bot_response})
    except Exception as e:
        return jsonify({'bot_response': f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
