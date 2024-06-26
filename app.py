from flask import Flask, send_from_directory, request, jsonify, render_template
import os
from dotenv import load_dotenv
from flask_cors import CORS
from openai import OpenAI
from roleSystem import roleSystem

app = Flask(__name__, static_folder='static')
CORS(app)
client = OpenAI()

@app.route('/')
def home():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/generate_data', methods=['POST'])
def generate_data():
    data = request.json

    print('\n\n\n----------------------------------------------\n\n\n')
    print(data)
    print('\n\n\n----------------------------------------------\n\n\n')

     
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": roleSystem},
            {"role": "user", "content":str(data) }
        ]
    )

    response = completion.choices[0]
    messageContent = response.message.content

    return messageContent

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
