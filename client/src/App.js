import React from "react"
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from './pages/Update';
import { BrowserRouter, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />}/>
          <Route path="/add" element={<Add />}/>
          <Route path="/update/:id" element={<Update />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
