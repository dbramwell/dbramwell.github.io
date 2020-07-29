import React, {useGlobal} from 'reactn'
import './Header.css'
import EmailPopup from './EmailPopup'

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
        <div>
          <h1>{githubData.name}</h1>
          <a href="https://www.linkedin.com/in/david-bramwell-423b2136">
            <i className="nes-icon linkedin" />
          </a>
          <a href="https://github.com/dbramwell">
            <i className="nes-icon github" />
          </a>
          <EmailPopup />
        </div>
        <a href={stackoverflowProfile}>
          <h3>Stack Overflow Reputation: {stackOverflowData.reputation}</h3>
        </a>
      </div>
    </header>
  );
}

export default Header;
