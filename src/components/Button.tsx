import React from 'react';
import './Button.css'
import Border from './Border';

interface Props {
  onClick?: () => void
  children: string
  className?: string
  disable?: boolean
}

const Button = (props: Props) => {

  return (
    <Border>
      <button type="button" disabled={props.disable} className={`nes-btn ${props.className}`} onClick={props.onClick}>{props.children}</button>
    </Border>
  );
}

export default Button;