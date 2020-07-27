import React, {useGlobal} from 'reactn';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import 'nes.css/css/nes.min.css';
import './App.css';
import Header from './components/Header'
import Github from './sections/Github'

Amplify.configure(awsconfig);

const App: React.FC = () => {

  const [githubData] = useGlobal('githubData');
  const [stackOverflowData] = useGlobal('stackOverflowData');


  if (githubData && stackOverflowData) {
    return (
      <div className="App">
        <Header />
        <div className="content">
          <Github />
        </div>
      </div>
    );
  }

  return null
}

export default App;
