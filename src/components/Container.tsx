import React from 'reactn';
import { ReactNode } from 'react';

interface Props {
  title?: string
  children?: ReactNode
}

const Container = (props: Props) => {

  return (
    <div className={`nes-container${props.title ? ' with-title' : ''}`}>
      {props.title ? <h2 className="title">{props.title}</h2> : null}
      {props.children}
    </div>
  );
}

export default Container;
