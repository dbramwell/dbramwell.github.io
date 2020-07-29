import React, { FC } from 'react';
import './Border.css'

interface Props {
  onClick?: () => void
  className?: string
}

const Border: FC<Props> = (props) => {

  return (
    <div className='nes-border'>
      <div className='top-bottom-border'></div>
      <div style={{display: 'flex'}}>
        <div style={{borderLeftStyle: 'solid'}}></div>
          {props.children}
        <div style={{borderLeftStyle: 'solid'}}></div>
      </div>
      <div className='top-bottom-border'></div>
    </div>
  );
}

export default Border;