import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import About from "./components/About";
import Users from "./components/Users";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className='container p-2'>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Users} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
