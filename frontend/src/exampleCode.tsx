import React, { useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface Data {
  schema: {
    name: string;
    age: string;
  };
  count: number;
  type: string;
}

interface ServerResponse {
  [key: string]: any;
}

export const ExampleCode: React.FC = () => {
  const [codeString, setCodeString] = useState<string>(`// Comando curl para hacer la misma solicitud:
// curl -X POST https://datagenia.onrender.com/generate_data \\
// -H "Content-Type: application/json" \\
// -d '{"schema": {"ID": "number","name": "string","lastName": "string=>A","age": "integer","date-birthday": "date>2000"}, "count": 10, "type": "json"}'

const url: string = 'https://datagenia.onrender.com/generate_data';
const data: Data = {
  schema: {
    name: 'string',
    age: 'integer'
  },
  count: 10,
  type: 'json'
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then((response: Response) => response.json() as Promise<ServerResponse>)
.then((data: ServerResponse) => console.log(data))
.catch((error: any) => console.error('Error:', error));
`);

  const [showCode, setShowCode] = useState<boolean>(false);

  // Función para copiar el código al portapapeles
  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    alert('Código copiado!');
  };

  const handleShowCode = () => {
    setShowCode(!showCode);
  };

  return (
    <div>
      {!showCode && (
        <button onClick={handleShowCode} className="btn">API</button>
      )}
      {showCode && (
        <>
          <div>
            <button onClick={copyCodeToClipboard} className="btn">Copiar Código</button>
            <button onClick={handleShowCode} className="btn ml-1">Ocultar</button>
          </div>
          <div>
            <SyntaxHighlighter language="javascript" style={tomorrowNight}>
              {codeString}
            </SyntaxHighlighter>
          </div>
        </>
      )}
    </div>
  );
};
