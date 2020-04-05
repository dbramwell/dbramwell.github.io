import React from 'reactn';
import { ReactNode } from 'react';

interface Props {
  title?: string
  children?: ReactNode
}

const Container = (props: Props) => {

  return (
    <div className={`nes-container is-rounded${props.title ? ' with-title' : ''}`}>
      {props.title ? <p className="title">{props.title}</p> : null}
      {props.children}
    </div>
  );
}

export default Container;
