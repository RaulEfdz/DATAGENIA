// util.ts
interface DataOptions {
  schema: { [key: string]: string };
  count: number;
  type: string;
}

const apiUrl = 'https://datagenia.onrender.com/generate_data';

export async function generateData(schema: string, count: number, type: string): Promise<any> {
  const data: DataOptions = { schema: JSON.parse(schema), count, type };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al generar datos: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error al generar datos: ${error.message}`);
  }
}

export async function testConnection(): Promise<any> {
  const testData: DataOptions = { schema: { name: 'string', age: 'integer' }, count: 1, type: 'json' };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      throw new Error(`Error al probar la conexión: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error al probar la conexión: ${error.message}`);
  }
}
