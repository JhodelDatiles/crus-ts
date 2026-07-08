import React from 'react';
import { Route, Routes } from 'react-router';
import toast from 'react-hot-toast';
//PAGES
import HomePage  from './pages/HomePage.js'

const App = () => {
  return (  
    <div>
    <button className="btn bg-amber-300" onClick={() => toast.success("burat")}>click me</button>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </div>
  )
}

export default App