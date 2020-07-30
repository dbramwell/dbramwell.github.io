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
          <div style={{textAlign: 'center'}}>
            <a href="david_bramwell_cv.docx">Download CV</a>
          </div>
        </section>
      </Fragment>
    );
  }

  return null
}

export default Bio;
