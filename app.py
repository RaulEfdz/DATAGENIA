from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from flask_cors import CORS
import openai

# Cargar variables de entorno desde un archivo .env
load_dotenv()

# Configurar la clave de API de OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

# Configurar la aplicación Flask y habilitar CORS
app = Flask(__name__)
CORS(app)

# Definir rutas y métodos
@app.route('/generate_data', methods=['POST'])
def generate_data():
    data = request.json
    
    print('\n\n\n----------------------------------------------\n\n\n')
    print(data)
    print('\n\n\n----------------------------------------------\n\n\n')
    
    roleSystem = "Eres un exporto en diseño de Json y csv, recibiras la infroma de schema, count, tipo(json o csv), esto se usara para generar la cantida de objeto que indique count unicamente debe retornar formato json o csv , y tampo debes retorna text que no sea eso"
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": roleSystem},
            {"role": "user", "content": str(data)}
        ]
    )

    # Imprimir el primer mensaje de elección
    print('\n\n\n----------------------------------------------\n\n\n')
    response = completion.choices[0]
    message = response['message']
    messageContent = message['content']
    print(messageContent)
    print('\n\n\n----------------------------------------------\n\n\n')

    # Devolver la respuesta con la sintaxis JSON correcta
    return jsonify({'response': messageContent})

# Función principal para ejecutar la aplicación Flask
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
