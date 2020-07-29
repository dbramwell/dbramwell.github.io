import React, {useGlobal} from 'reactn';
import { Fragment } from 'react';

const Bio: React.FC = () => {

  const [githubData] = useGlobal('githubData');

  if (githubData) {
    return (
      <Fragment>
        <section>
          <h1>Bio</h1>
        </section>
        <section>
          <p>{githubData.bio}</p>
        </section>
      </Fragment>
    );
  }

  return null
}

export default Bio;
