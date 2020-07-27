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
            <h3>{owner}/&#8203;{repoName}</h3>
          </a>
          <div style={{maxWidth: '100px'}}>
            {dialog}
          </div>
        </div>
        <div>
          <span>
            <i className="nes-icon star"></i>
            <h3>x{props.repo.stargazers.totalCount}</h3>
          </span>
          <h3 className="language" style={{color: props.repo.primaryLanguage.color}}>{props.repo.primaryLanguage.name}</h3>
        </div>
      </div>
      <p>{props.repo.description}</p>
    </div>
  );
}

export default RepositoryView;
