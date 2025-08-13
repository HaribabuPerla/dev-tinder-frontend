
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import Body from './pages'
import LoginPage from './pages/LoginPage'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import Requests from './pages/Requests'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { appStore,persistor } from './utils/appStore'
import Connections from './pages/Connections'


function App() {

  return (
    <Provider store={appStore}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/feed" element={<Feed/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/requests" element={<Requests/>}/>
        <Route path="/connections" element={<Connections/>}/>
        <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Route>

      </Routes>
    </BrowserRouter>
    </PersistGate>
    </Provider>

  )
}

export default App
