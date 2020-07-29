import React from 'reactn';
import { PullRequest } from '../types'
import Button from './Button'
import HRSpacer from './HRSpacer';
import Popup from './Popup';
import { Fragment } from 'react';

interface Props {
  pulls: PullRequest[]
}

const PullsPopup = (props: Props) => {

  const formatDate = (date: string) => {
    return date.split('T')[0].replace(/-/g, '/')
  }

  return (
    <Popup clicker={<Button>Contributions</Button>}>
      <h2>{props.pulls[0].baseRepository.nameWithOwner}</h2>
      <HRSpacer>
        {props.pulls.map(it => {
          let mergedOrClosed
          if (it.mergedAt) mergedOrClosed = `Merged: ${formatDate(it.mergedAt)}`
          else if (it.closedAt) mergedOrClosed = `Closed: ${formatDate(it.closedAt)}`
          else mergedOrClosed = "Still Open"
          return (
            <Fragment>
              <p><a href={it.url}>#{it.number}</a> {it.title}</p>
              <p>{mergedOrClosed}</p>
            </Fragment>
          )
        })}
      </HRSpacer>
    </Popup>
  );
}

export default PullsPopup;
