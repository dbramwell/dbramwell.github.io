import React from 'reactn';
import './PullsDialogue.css'
import { PullRequest } from '../types'
import Button from './Button'
import HRSpacer from './HRSpacer';
import { useState, Fragment } from 'react';

interface Props {
  pulls: PullRequest[]
}

const PullsDialogue = (props: Props) => {

  const id = Math.random() + '';

  const [shown, setShown] = useState(false)

  if (shown) {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed'
    document.body.style.overflowY = 'scroll'
    document.body.style.top = -scrollY + 'px';
    document.getElementsByTagName('header')[0].style.top = '0px';
  } else {
    document.body.style.position = 'static'
    document.body.style.overflowY = 'auto'
    let scrollTo = 0
    if (document.body.style.top) {
      const y = document.body.style.top.match(/[0-9]+/)
      if (y) {
        scrollTo = parseInt(y[0])
      }
    }
    window.scrollTo(0, scrollTo)
  }

  const formatDate = (date: string) => {
    return date.split('T')[0].replace(/-/g, '/')
  }

  return (
    <Fragment>
      <Button onClick={() => setShown(true)}>
        Contributions
      </Button>
      {shown
      ?
        <div className="backdrop" onClick={() => setShown(false)}>
          <div className="nes-container" id={id} onClick={(evt) => {evt.stopPropagation()}}>
            <h3>{props.pulls[0].baseRepository.nameWithOwner}</h3>
            <HRSpacer>
              {props.pulls.map(it => {
                const date = it.mergedAt ? it.mergedAt : it.closedAt
                return (
                  <Fragment>
                    <p><a href={it.url}>#{it.number}</a> {it.title}</p>
                    <p>Merged: {date ? formatDate(date) : "Still open"}</p>
                  </Fragment>
                )
              })}
            </HRSpacer>
          </div>
        </div>
      :
      null
      }
    </Fragment>
  );
}

export default PullsDialogue;
