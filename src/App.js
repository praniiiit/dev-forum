import './App.css';
import Header from './components/Header';
import Community from './components/Community';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Box from '@mui/material/Box'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Box
          sx={{
            p: 2,
          }}
        >
          <Switch>
            <Route exact path='/'>
              <Community />
            </Route>
            <Route path='/dashboard'>
              <Dashboard user = 'Pranit'/>
            </Route>
          </Switch>
        </Box>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
