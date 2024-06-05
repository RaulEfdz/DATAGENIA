import React, { useState, useRef } from "react";
import "./index.css"; // Asegúrate de que Tailwind CSS esté correctamente importado aquí si no lo está.

function App() {
  const [loading, setLoading] = useState(false);
  const schemaRef = useRef(null);
  const countRef = useRef(null);
  const type5fRef = useRef(null);

  const handleGenerateData = () => {
    if (schemaRef.current && countRef.current && typeRef.current) {
      generateData(
        setLoading,
        schemaRef.current.value,
        countRef.current.value,
        typeRef.current.value
      );
    }
  };

  const handleTestConnection = () => {
    testConnection(setLoading);
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center bg-blue-100">
      <div className="w-[50rem] rounded-xl shadow-lg overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-10 "></div>

        <div className="p-6">
          <div className="flex items-center mb-5">
            <img
              src="./logo.png"
              height={80}
              width={120}
              className="rounded-full p-2 px-3 bg-gradient-to-r from-blue-500 to-blue-600 "
            />
            <h1 className=" font-bold text-blue-500 h-full m-0 ml-5 " style={{fontSize:'2rem'}}>
              DataGenAI!
            </h1>
          </div>
          <p className="text-justify">
            DataGenAI es una aplicación web diseñada para facilitar la
            generación automática de datos basada en esquemas JSON.
          </p>
          <p className="mt-5 font-bold">
            Usar API:
          </p>
          <img
              src="./cURL.png"
              className=""
            />
        </div>
        <div className="p-6">
          <form id="dataForm" className="space-y-4">
            <div>
              <label
                htmlFor="schema"
                className="block text-lg font-medium text-gray-700 text-center uppercase mb-5"
              >
                Esquema JSON
              </label>
              
              <textarea
                ref={schemaRef}
                id="schema"
                name="schema"
                rows="20"
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-20 m-0 p-[11px] focus:ring-5 ring-offset-5  ring-gray-900 outline-0"
                defaultValue='{"name": "string", "age": "integer"}'
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleGenerateData}
                disabled={loading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Cargando..." : "Generar Datos"}
              </button>
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={loading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {loading ? "Probando..." : "Probar Conexión"}
              </button>
            </div>
          </form>
          <h2 className="text-2xl font-bold mt-6">Resultados:</h2>
          <pre
            id="results"
            className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md"
          ></pre>
        </div>
      </div>
    </div>
  );
}

export default App;
