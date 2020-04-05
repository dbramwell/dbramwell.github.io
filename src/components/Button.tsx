import React from 'react';

interface Props {
  onClick?: () => void
  children: string
  className?: string
}

const Button = (props: Props) => {

  return (
    <button type="button" className={`nes-btn ${props.className}`} onClick={props.onClick}>{props.children}</button>
  );
}

export default Button;