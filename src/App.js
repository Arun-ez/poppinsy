import './App.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { RouteProvider } from './routes/RouteProvider';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <RouteProvider />
    </div>
  );
}

export default App;
