import React from 'react';
import './Button.css'

interface Props {
  onClick?: () => void
  children: string
  className?: string
}

const Button = (props: Props) => {

  return (
    <div className='btn-container' style={{display: 'inline-block'}}>
      <div className='top-bottom-border'></div>
      <div style={{display: 'flex'}}>
        <div style={{borderLeftStyle: 'solid'}}></div>
          <button type="button" className={`nes-btn ${props.className}`} onClick={props.onClick}>{props.children}</button>
        <div style={{borderLeftStyle: 'solid'}}></div>
      </div>
      <div className='top-bottom-border'></div>
    </div>
  );
}

export default Button;