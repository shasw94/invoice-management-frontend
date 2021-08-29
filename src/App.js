import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './components/Menu';
import OrderPage from './pages/OrderPage';
import OrderDetail from './pages/OrderDetail';

function App() {
  return (
    <div >
      <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />
      <main id="page-wrap">
      <Switch>
        <Route exact path={['/', '/home']} component={Home} />
        <Route exact path='/orders' component={OrderPage} />
        <Route exact path='/orders/:id' component={OrderDetail} />
      </Switch>
      </main>
    </div>
  );
}

export default App;
