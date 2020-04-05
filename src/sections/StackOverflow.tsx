import React, {useGlobal} from 'reactn';
import Container from '../components/Container'
import TopAnswerView from '../components/TopAnswerView'
import HRSpacer from '../components/HRSpacer'
import { Fragment } from 'react';

const StackOverflow: React.FC = () => {

  const [stackOverflowData] = useGlobal('stackOverflowData');

  if (stackOverflowData) {
    return (
      <Fragment>
        <section>
          <h2>Stack Overflow</h2>
          <p>Reputation: {stackOverflowData.reputation}</p>
        </section>
        <section>
          <Container title="Top Answers">
            <HRSpacer>
              {stackOverflowData.topAnswers.map(it => <TopAnswerView answer={it} />)}
            </HRSpacer>
          </Container>
        </section>
      </Fragment>
    );
  }

  return null
}

export default StackOverflow;
