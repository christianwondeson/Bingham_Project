# app.py

from flask import Flask, render_template, request, jsonify, url_for
from flask_cors import CORS
import nltk
from nltk.stem import WordNetLemmatizer

app = Flask(__name__, static_url_path='/static')
CORS(app)

# Initialize NLTK
nltk.download('punkt')
nltk.download('wordnet')
lemmatizer = WordNetLemmatizer()

# Bingham Academy specific responses for the chatbot
responses = {
    "greeting": "Hello! How can I assist you with information about Bingham Academy?",
    "goodbye": "Goodbye! If you have more questions, feel free to ask.",
    "admissions": "Our admissions process at Bingham Academy includes submitting an application form, attending an interview, and providing necessary documents. If you have specific questions, feel free to ask.",
    "curriculum": "Bingham Academy follows an internationally recognized curriculum, incorporating elements from the International Baccalaureate (IB) program. Our curriculum emphasizes a well-rounded education.",
    "facilities": "Bingham Academy boasts modern facilities, including well-equipped classrooms, science laboratories, sports facilities, and a library. We prioritize providing a conducive learning environment.",
    "teachers": "Our teaching staff at Bingham Academy consists of highly qualified and experienced educators dedicated to fostering a supportive learning environment. If you have specific teachers in mind, let me know!",
    "sports": "Bingham Academy offers a range of sports, including soccer, basketball, volleyball, track and field, and more. We encourage students to participate in physical activities for their holistic development.",
    "events": "Bingham Academy hosts various events throughout the academic year, such as cultural festivals, sports meets, and parent-teacher conferences. Stay tuned for announcements!",
    "default": "I'm sorry, I didn't understand that. Please feel free to ask another question about Bingham Academy.",
}

# Dictionary to map lowercase versions of clickable questions to responses
clickable_questions_dict = {
    "tell me about admissions": responses["admissions"],
    "what is the curriculum?": responses["curriculum"],
    "can you explain the facilities?": responses["facilities"],
    "who are the teachers?": responses["teachers"],
    "what sports do you offer?": responses["sports"],
    "any upcoming events?": responses["events"],
}


def process_text(text):
    # Tokenize and lemmatize the input text
    tokens = nltk.word_tokenize(text)
    lemmatized_tokens = [lemmatizer.lemmatize(token) for token in tokens]

    # Perform additional processing if needed

    return lemmatized_tokens


def get_response(user_input):
    # Process user input
    processed_input = process_text(user_input)

    # Example logic for generating responses
    if any(keyword in processed_input for keyword in ["hello", "hi", "hey"]):
        return responses["greeting"]
    elif any(keyword in processed_input for keyword in ["bye", "goodbye"]):
        return responses["goodbye"]
    elif any(keyword in processed_input for keyword in ["admissions", "apply"]):
        return responses["admissions"]
    elif any(keyword in processed_input for keyword in ["curriculum", "courses"]):
        return responses["curriculum"]
    elif any(keyword in processed_input for keyword in ["facilities", "building", "infrastructure"]):
        return responses["facilities"]
    elif any(keyword in processed_input for keyword in ["teacher", "faculty"]):
        return responses["teachers"]
    elif any(keyword in processed_input for keyword in ["sports", "athletics"]):
        return responses["sports"]
    elif any(keyword in processed_input for keyword in ["events", "activities"]):
        return responses["events"]
    else:
        return get_clickable_response(processed_input)


def get_clickable_response(processed_input):
    # Respond to clickable questions based on the predefined responses
    for keyword, response in clickable_questions_dict.items():
        if any(word in processed_input for word in keyword.split()):
            return response

    return responses["default"]


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/get_response', methods=['POST'])
def get_bot_response():
    user_message = request.json['user_message']
    bot_response = get_response(user_message)
    return jsonify({'bot_response': bot_response})

@app.route('/get_bot_icon_url', methods=['GET'])
def get_bot_icon_url():
    bot_icon_url = url_for('static', filename='img/robot.png')
    return jsonify({'bot_icon_url': bot_icon_url})


if __name__ == '__main__':
    app.run(debug=True)
