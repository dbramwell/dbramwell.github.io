import React from 'react';
import './TextArea.css'
import Border from './Border';

interface Props {
  className?: string
  id?: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  value?: string
}

const TextArea = (props: Props) => {

  return (
    <Border>
      <textarea value={props.value} id={props.id} className={props.className} onChange={props.onChange}></textarea>
    </Border>
  );
}

export default TextArea;