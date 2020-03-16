import React from 'react';
import { Switch,Route } from 'react-router-dom';
import BookList from './containers/BookList'

function App() {
  return (
    <div className="App">
       <Switch>
         <Route path="/" component={BookList} />
       </Switch>
    </div>
  );
}

export default App;
