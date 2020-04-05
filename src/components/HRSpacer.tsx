import React from 'reactn';
import { Fragment } from 'react';
import './HRSpacer.css'

interface Props {
  children: JSX.Element[]
}

const HRSpacer = (props: Props) => {

  return (
    <div className="HRSpacer" >
      {props.children.reduce((acc, cur) => <Fragment>{[acc, <hr />, cur]}</Fragment>)}
    </div>
  );
}

export default HRSpacer;
