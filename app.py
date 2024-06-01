from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from flask_cors import CORS

# Set up Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Importing OpenAI and initializing the client
from openai import OpenAI
client = OpenAI()

# Define routes and methods
@app.route('/')
@app.route('/generate_data', methods=['POST'])
def generate_data():
    
    data = request.json
    
    print('\n\n\n----------------------------------------------\n\n\n')
    print(data)
    print('\n\n\n----------------------------------------------\n\n\n')
    
    roleSystem = "Eres un exporto en diseño de Json y csv, recibiras la infroma de schema, count, tipo(json o csv), esto se usara para generar la cantida de objeto que indique count unicamente debe retornar formato json o csv , y tampo debes retorna text que no sea eso"
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": roleSystem},
            {"role": "user", "content":str(data) }
        ]
    )
    

    # Printing the first choice message
    print('\n\n\n----------------------------------------------\n\n\n')
    response = completion.choices[0]
    message = response.message
    messageContent = response.message.content
    # print(message)
    print(messageContent)
    print('\n\n\n----------------------------------------------\n\n\n')

    # Correct response format with proper JSON syntax
    return messageContent

    
# Main function to run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

