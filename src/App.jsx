
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import Body from './pages'


function App() {

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/login" element={<div>Login page</div>}/>
          <Route path="*" element={<div>404 - Page Not Found</div>} />

        </Route>

      </Routes>
    </BrowserRouter>

  )
}

export default App
