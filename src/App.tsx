import React, {useGlobal} from 'reactn';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import 'nes.css/css/nes.min.css';
import './App.css';
import Header from './components/Header'
import Github from './sections/Github'
import Bio from './sections/Bio'
import Certified from './sections/Certified'

Amplify.configure(awsconfig);

const App: React.FC = () => {

  const [githubData] = useGlobal('githubData');
  const [stackOverflowData] = useGlobal('stackOverflowData');


  if (githubData && stackOverflowData) {
    return (
      <div className="App">
        <Header />
        <div className="content">
          <Certified />
          <Bio />
          <Github />
        </div>
      </div>
    );
  }

  return <div style={{display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
    <i className="nes-octocat animate is-large"></i>
    <h1>Loading</h1>
  </div>
}

export default App;
