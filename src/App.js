import React from 'react';
import './App.css';
import FileUpload from './FileUpload';

function App() {

  console.log("App component is rendering");  // Log pour déboguer

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blockchain CV Interface</h1>
        <FileUpload />
      </header>
    </div>
  );
}

export default App;
