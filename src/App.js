import './App.css';
import AllContent from './components/allcontent';
import configuration from './config.json';

function App() {
  const tabGroups = configuration.tabGroups;

  return (
    <div className="App">
      <header>
        
      </header>
      
      <AllContent tabGroups={tabGroups}/>
    </div>
  );
}

export default App;
