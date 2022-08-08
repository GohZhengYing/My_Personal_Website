
import './App.css';
import Home from './pages/home/home';
import Error from './pages/error/error';
import Edit from './pages/edit/edit';
import Login from './pages/login/login'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'







function App() {



  
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/edit' element={<Edit/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route path='/*' element={<Error/>}/>
          </Routes>
    </Router>
    </div>
  );
}

export default App;
