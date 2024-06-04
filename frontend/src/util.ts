// util.ts
interface DataOptions {
    schema: { [key: string]: string };
    count: number;
    type: string;
  }
  
  export function generateData(setLoading: (loading: boolean) => void, schemaInput: string, countInput: string, typeInput: string): void {
    setLoading(true);
    const schema = JSON.parse(schemaInput);
    const count = parseInt(countInput);
    const type = typeInput;
  
    const data: DataOptions = {
      schema: schema,
      count: count,
      type: type,
    };
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  
    fetch('/generate_data', options)
      .then(response => response.json())
      .then(data => {
        document.getElementById('results')!.textContent = JSON.stringify(data, null, 2);
        setLoading(false);
      })
      .catch(error => {
        document.getElementById('results')!.textContent = 'Error: ' + error;
        setLoading(false);
      });
  }
  
  export function testConnection(setLoading: (loading: boolean) => void): void {
    setLoading(true);
    const testData: DataOptions = {
      schema: { "name": "string", "age": "integer" },
      count: 1,
      type: "json",
    };
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    };
  
    fetch('/generate_data', options)
      .then(response => response.json())
      .then(data => {
        document.getElementById('results')!.textContent = 'Conexión exitosa: ' + JSON.stringify(data, null, 2);
        setLoading(false);
      })
      .catch(error => {
        document.getElementById('results')!.textContent = 'Error de conexión: ' + error;
        setLoading(false);
      });
  }
  