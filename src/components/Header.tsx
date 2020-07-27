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
        <img alt="Profile Pic" src={githubData.avatarUrl} />
      </div>
      <div className="headerText">
        <h1>{githubData.name}</h1>
        <a href={stackoverflowProfile}>
          <h3>Stack Overflow Reputation: {stackOverflowData.reputation}</h3>
        </a>
      </div>
    </header>
  );
}

export default Header;
