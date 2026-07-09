import { Route, Routes } from 'react-router';

//PAGES
import HomePage  from './pages/HomePage.js'

const App = () => {
  return (  
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </div>
  )
}

export default App