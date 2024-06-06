import React, { useState } from "react";
import { generateData, testConnection } from "./util";
import { ExampleCode } from "./exampleCode";

import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import './btn.css';
import AceEditor from 'react-ace';

function App() {
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState('{"name": "string", "age": "integer"}');
  const [count, setCount] = useState(10); // Tipo específico removido para evitar errores de compilación en JS
  const [response, setResponse] = useState<null | String>(null);

  const handleGenerateData = async () => {
    setLoading(true);
    try {
      if (count < 2 || count > 100) {
        throw new Error("El valor de count debe estar entre 2 y 100.");
      }
      const data = await generateData(schema, count, "json");
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setLoading(true);
    try {
      const data = await testConnection();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
  setResponse(error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(String(response));
    alert("Json copiado!");
  };

  const downloadResponse = () => {
    const element = document.createElement("a");
    const file = new Blob([String(response)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = "response.json";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-g">
      <div className="w-[50rem] overflow-hidden bg-white">
        <div className="p-6">
          <div className="flex items-center mb-5">
            <img
              src="./logo.png"
              height={80}
              width={120}
              className="rounded-full p-2 px-3 bg-black"
            />
            <h1 className="font-bold text-g h-full m-0 ml-5" style={{ fontSize: "2rem" }}>
              DataGenAI!
            </h1>
          </div>
          <p className="text-justify">
            DataGenAI es una aplicación web diseñada para facilitar la generación automática de datos basada en esquemas JSON.
          </p>
        </div>

        <div className="p-6 ">
          <form id="dataForm" className="space-y-0 shadow-1 p-2">
            <div>
              <label htmlFor="schema" className="block text-lg font-medium text-black text-left uppercase ">
                Esquema JSON
              </label>
              <div className="mt-2  mx-4">
                <label htmlFor="inputcount" className="block text-gray-800 font-semibold text-sm">
                  Cantidad
                </label>
                <input
                  value={count}
                  type="number"
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  id="count"
                  name="count"
                  className="border border-gray-200 text-sm w-small font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-10 m-0 p-[11px] focus:ring-5 ring-offset-5 ring-gray-900 outline-0"
                />
              </div>

              <div className="mt-2  mx-4">
                <label htmlFor="inputtype" className="block text-gray-800 font-semibold text-sm">
                  Esquema
                </label>
                <AceEditor
                  mode="json"
                  theme="github"
                  value={schema}
                  onChange={setSchema}
                  name="UNIQUE_ID_OF_DIV"
                  editorProps={{ $blockScrolling: true }}
                  fontSize={14}
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  setOptions={{
                    useWorker: false, // Deshabilitar validación en tiempo real para evitar conflictos con JSON no válido
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  style={{ width: '100%', height: '200px' }}
                />
              </div>
            </div>
            <div className="flex space-x-4  mx-4">
              <button
                type="button"
                onClick={handleGenerateData}
                disabled={loading}
                className="btn"
              >
                {loading ? "Cargando..." : "Generar Datos"}
              </button>
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={loading}
                className="btn"
              >
                {loading ? "Probando..." : "Probar Conexión"}
              </button>
            </div>
          </form>

          {response && (
            <>
              <h2 className="text-2xl font-bold mt-6">Resultados:</h2>
              <div>
                <button onClick={copyResponse} className="btn">
                  Copiar Json
                </button>
                <button onClick={downloadResponse} className="btn ml-1">Descargar Json</button>
              </div>
              <SyntaxHighlighter language="javascript" style={tomorrowNight}>
                {response}
              </SyntaxHighlighter>
            </>
          )}
        </div>

        <div className="p-6">
          <ExampleCode />
        </div>
      </div>
    </div>
    
  );
}

export default App;
