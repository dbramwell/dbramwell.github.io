import React from 'react';
import './Input.css'
import Border from './Border';

interface Props {
  placeholder?: string
  className?: string
  id?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  style?: any
}

const Input = (props: Props) => {

  return (
    <Border>
      <input value={props.value} onChange={props.onChange} style={props.style} placeholder={props.placeholder} type="text" id={props.id} className={props.className} />
    </Border>
  );
}

export default Input;