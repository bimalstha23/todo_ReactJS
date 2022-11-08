import './App.css';
import { Form } from './components /Form';
import {Todos} from './components /Todos.jsx'
function App() {
  return (

    <div className="App">
      <div className='Container'>
        <h1>TODO</h1>
        <Form />
        <Todos/>
      </div>
    </div>
  );
}

export default App;
