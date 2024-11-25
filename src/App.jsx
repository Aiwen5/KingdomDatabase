import { BrowserRouter as Router } from 'react-router-dom';
import Countries from './components/Countries/Countries';
import Details from './components/Details/Details';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="content">
          <Countries />
          <Details />
        </div>
      </div>
    </Router>
  );
}

export default App;