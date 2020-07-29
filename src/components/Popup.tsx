import React from 'reactn';
import './Popup.css'
import { useState, Fragment, FC, ReactNode } from 'react';

interface Props {
  clicker: ReactNode
  onClose?: () => void
}

const Popup: FC<Props> = (props) => {

  const [shown, setShown] = useState(false)

  if (shown) {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed'
    document.body.style.overflowY = 'scroll'
    document.body.style.top = -scrollY + 'px';
    document.getElementsByTagName('header')[0].style.top = '0px';
  } else {
    document.body.style.position = 'static'
    document.body.style.overflowY = 'auto'
    let scrollTo = 0
    if (document.body.style.top) {
      const y = document.body.style.top.match(/[0-9]+/)
      if (y) {
        scrollTo = parseInt(y[0])
      }
    }
    window.scrollTo(0, scrollTo)
  }

  const id = Math.random() + '';

  return (
    <Fragment>
      <div onClick={() => setShown(true)}>
        {props.clicker}
      </div>
      {shown
      ?
        <div className="backdrop" onClick={() => {
          if (props.onClose) props.onClose()
          setShown(false)
        }}>
          <div className="nes-container" id={id} onClick={(evt) => {evt.stopPropagation()}}>
            {props.children}
          </div>
        </div>
      :
      null
      }
    </Fragment>
  );
}

export default Popup;
