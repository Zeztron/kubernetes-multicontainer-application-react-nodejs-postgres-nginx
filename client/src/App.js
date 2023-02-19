import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import OtherPage from './components/OtherPage';
import MainComponent from './components/MainComponent';
import { Fragment } from 'react';

function App() {
  return (
    <Router>
      <Fragment>
        <header className="header">
          This is a multicontainer application
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </header>
        <div className="main">
          <Routes>
            <Route exact path="/" element={<MainComponent />} />
            <Route path="/otherpage" element={<OtherPage />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
