import React, {useGlobal} from 'reactn';
import './TopAnswerView.css'
import { TopAnswer } from '../types'

interface Props {
  answer: TopAnswer
}

const TopAnswerView = (props: Props) => {

  const [colours] = useGlobal('githubColours');

  return (
    <div className="answer" >
      <div className="section">
        <h2>Question:</h2>
        <div className="answerContent">
          <p dangerouslySetInnerHTML={{__html: props.answer.question}} />
        </div>
      </div>
      <div className="section">
        <h2>Tags:</h2>
        <div className="answerContent">
          {props.answer.tags.map(it => <h3 style={{color: colours[it.replace(' ', '').toLowerCase()]}}>{it}</h3>)}
        </div>
      </div>
      <div className="section">
        <h2>Votes:</h2>
        <div className="answerContent">
          <p>{props.answer.score}</p>
        </div>
      </div>
      <div className="section">
        <h2>Accepted:</h2>
        <div className="answerContent">
          <p>{props.answer.accepted ? '✔' : '✘'}</p>
        </div>
      </div>
      <div className="section">
        <h2><a href={props.answer.link}>Link</a></h2>
      </div>
    </div>
  );
}

export default TopAnswerView;
