
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import Body from './pages'
import LoginPage from './pages/LoginPage'
import { Provider } from 'react-redux'
import { appStore } from './utils/appStore'


function App() {

  return (
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/login" element={<LoginPage/>}/>
          <Route path="*" element={<div>404 - Page Not Found</div>} />

        </Route>

      </Routes>
    </BrowserRouter>
    </Provider>

  )
}

export default App
