"use client";
import { useState } from "react";
import Papa from 'papaparse';

export default function Home() {
  const [jsonData, setJsonData] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const uploadFileCsv = (e) => {
    const file = e.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            complete: (result) => {
                setCsvData(result.data);
            },
            error: (error) => {
                console.error('Error parsing CSV:', error);
            },
        });
    }
  };

  const handleConvertToJson = (e) => {
    e.preventDefault();
    if (!csvData) {
        alert("Veuillez télécharger un fichier CSV valide");
        return;
    }

    const jsonString = JSON.stringify(csvData, null, 2);
    downloadJson(jsonString);
  };

  const downloadJson = (jsonString) => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'converted.json');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.location.reload();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setJsonData(json);
      } catch (error) {
        console.error("Le fichier n'est pas un fichier JSON valide");
      }
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  const handleConvertToCsv = (e) => {
    e.preventDefault();
    if (!jsonData) {
      alert("Veuillez télécharger un fichier JSON valide");
      return;
    }

    const dataValue = Array.isArray(jsonData) ? jsonData : [jsonData];

    if (dataValue.length === 0) {
      alert("Le fichier JSON ne contient aucune donnée");
      return;
    }

    const headers = Object.keys(dataValue[0]);
    const csvRows = [headers.join(',')];

    dataValue.forEach((row) => {
      const values = headers.map(header => row[header]);
      csvRows.push(values.join(','));
    });

    const csvString = csvRows.join('\n');
    downloadCsv(csvString);
  };

  const downloadCsv = (csvString) => {
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'converted.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.location.reload();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">CSV & JSON Converter</h1>
      
      <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Télécharger un fichier JSON</label>
          <input 
            type="file" 
            accept=".json" 
            onChange={handleFileUpload} 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button 
            onClick={handleConvertToCsv} 
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
          >
            Convertir en CSV
          </button>
        </div>

        <div className="mt-8 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Télécharger un fichier CSV</label>
          <input
              type="file"
              accept=".csv"
              onChange={uploadFileCsv}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
              onClick={handleConvertToJson}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
          >
              Convertir en JSON
          </button>
        </div>
      </form>
    </main>
  );
}
