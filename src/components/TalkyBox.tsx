import React from 'reactn';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode
}

const TalkyBox = (props: Props) => {

  return (
    <div className="nes-balloon from-left">
      {props.children}
    </div>
  );
}

export default TalkyBox;
