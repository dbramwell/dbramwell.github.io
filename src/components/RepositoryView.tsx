import React from 'reactn';
import './RepositoryView.css'
import { Repository, PullRequest } from '../types'
import PullsDialogue from './PullsDialogue'

interface Props {
  repo: Repository
  pulls?: PullRequest[]
}

const RepositoryView = (props: Props) => {

  const [owner, repoName] = props.repo.nameWithOwner.split('/')

  let dialog = null
  if (props.pulls) {
    dialog = <PullsDialogue pulls={props.pulls}/>
  }

  return (
    <div className="repository" >
      <div className="repoHeader" >
        <div>
          <a href={props.repo.url} >
            <h2>{owner}/&#8203;{repoName}</h2>
          </a>
          {dialog}
        </div>
        <div>
          <span>
            <i className="nes-icon star"></i>
            <h2>x{props.repo.stargazers.totalCount}</h2>
          </span>
          <h2 className="language" style={{color: props.repo.primaryLanguage.color}}>{props.repo.primaryLanguage.name}</h2>
        </div>
      </div>
      <p>{props.repo.description}</p>
    </div>
  );
}

export default RepositoryView;
