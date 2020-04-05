import React, {useGlobal} from 'reactn'
import './Header.css'

const Header: React.FC = () => {

  const [githubData] = useGlobal('githubData');
  const [stackOverflowData] = useGlobal('stackOverflowData');

  //todo: move profile url to backend
  const stackoverflowProfile = "https://stackoverflow.com/users/1147618/dbramwell"

  return (
    <header>
      <div>
        <img src={githubData.avatarUrl} />
        <h1>{githubData.name}</h1>
      </div>
      <div className="column">
        <a href={stackoverflowProfile}>
          <p>Stack Overflow</p>
          <p>Reputation: {stackOverflowData.reputation}</p>
        </a>
      </div>
    </header>
  );
}

export default Header;
