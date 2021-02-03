import React from 'react';
//Pages
import Home from './pages/Home';
//Components
import Nav from './components/Nav'
//Global Style
import GlobalStyles from './components/GlobalStyles';
//Router
import {Route} from 'react-router-dom';

function App() {
 
  return (
    <div className="App">
      <GlobalStyles/>
      <Route path={['/game/:id', '/']}>
        <Nav/>
        <Home/>
      </Route>
    </div>
  );
}

export default App;
