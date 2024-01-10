
import nltk
import spacy
from nltk.chat.util import Chat, reflections

nltk.download('punkt')  # Download the Punkt tokenizer models

# load the english NLP model for spacy
nlp = spacy.load('en_core_web_sm')

# Improved custom patterns and reflections
custom_patterns = [
    (r'hi|hello|hey', ['Hello!', 'Hi there!', 'Hey!']),
    (r'how are you', ['I am doing well, thank you!', 'I am fine, how about you?']),
    (r'what is your name', ['You can call me ChatBot.', 'I am just a chatbot.']),
    (r'school', ['Bingham School is a great place for learning. How can I help you with school-related questions?']),
    (r'(\bstudent\b|\bpupil\b)', ['If you have questions about being a student at Bingham School, feel free to ask.']),
    (r'teacher|professor', ['Our school has dedicated and qualified teachers. How can I assist you with teacher-related inquiries?']),
    (r'(\bassignment\b|\bhomework\b)', ['If you need help with assignments or homework, feel free to ask for guidance.']),
    (r'bye|goodbye', ['Goodbye!', 'Have a great day!', 'See you later.']),
    # Additional patterns
    (r'how old are you', ['I don’t have an age. I’m just a computer program.', 'I exist in the digital realm, so age is not applicable.']),
    (r'what can you do', ['I can help you with school-related questions, provide information, and have casual conversations. Feel free to ask me anything!']),
    (r'(\bthanks\b|\bthank you\b)', ['You’re welcome!', 'No problem, happy to help!', 'Anytime!']),
    (r'weather', ['I\'m sorry, I don’t have real-time information. You can check a weather website for the current conditions.']),
    (r'joke|tell me a joke', ['Why don\'t scientists trust atoms? Because they make up everything!', 'What do you call fake spaghetti? An impasta!']),
    (r'favorite color', ['I don\’t have a favorite color. I appreciate all colors equally.']),
    (r'how do I contact the school', ['You can find contact information on the school website or contact the main office during school hours.']),
]

# Improved reflections
custom_reflections = {
    'I am': 'you are',
    'I was': 'you were',
    'I': 'you',
    'my': 'your',
    'you are': 'I am',
    'you were': 'I was',
    'your': 'my',
    'yours': 'mine',
}

# Create a Chat object
custom_chatbot = Chat(custom_patterns, reflections=custom_reflections)

def chatbot_response(user_input):
    # Check if the user asked a predefined question
    for pattern, responses in custom_patterns:
        if user_input.lower() == pattern.lower():
            return responses[0]  # Return the first response for simplicity

    # If not a predefined question, proceed with the NLTK-based chatbot
    entities = get_named_entities(user_input)
    user_input_with_entities = f"{user_input} ({', '.join(f'{ent[0]}: {ent[1]}' for ent in entities)})"
    response = custom_chatbot.respond(user_input_with_entities)
     # If NLTK-based chatbot response is null, provide a default response
    if response is None:
        response = "I'm sorry, I didn't understand that. Can you please rephrase your question?"

    return response

def get_named_entities(sentence):
    doc = nlp(sentence)
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    return entities