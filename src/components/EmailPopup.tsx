import React, {useState} from 'reactn';
import './EmailPopup.css';
import Popup from './Popup';
import { FC } from 'react';
import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';
import { API } from 'aws-amplify';


const EmailPopup: FC = () => {

  const [subject, setSubject] = useState('')
  const [sender, setSender] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [failedToSend, setFailedToSend] = useState(false)

  const reset = () => {
    setSending(false)
    setSent(false)
    setFailedToSend(false)
  }

  const sendEmail = async () => {
    setSending(true)
    const resp = await API.post("githubapi", "/email", {body: {subject, body, sender}})
    setSending(false)
    if (resp.success) {
      setSent(true)
    } else {
      setFailedToSend(true)
    }
  }

  const changeSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value)
  }

  const changeSender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSender(event.target.value)
  }

  const changeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value)
  }

  const validEmail = () => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(sender.toLowerCase());
  }

  let content = (
    <div className="emailPopup">
      <h2>Send me an email:</h2>
      <Input value={sender} placeholder="Your Email" id="subject" className="nes-input" onChange={changeSender}/>
      <Input value={subject} placeholder="Subject" id="subject" className="nes-input" onChange={changeSubject}/>
      <TextArea value={body} id="email-content" className="nes-textarea" onChange={changeBody}/>
      {!validEmail() ? <p className="nes-text is-error">Email is invalid</p> : ''}
      <Button onClick={sendEmail} disable={!validEmail()}>Send</Button>
    </div>
  )

  if (sending) {
    content = <div className="emailPopup"><h2>Sending...</h2></div>
  } else if (sent) {
    content = <div className="emailPopup"><h2>Email Sent!</h2></div>
  } else if (failedToSend) {
    content = <div className="emailPopup"><h2>Failed to send email, please try again later</h2></div>
  }

  return (
    <Popup onClose={reset} clicker={
      // eslint-disable-next-line
      <a href="javascript:void(0);">
        <i className="nes-icon gmail" />
      </a>
    }>
      {content}
    </Popup>
  );
}

export default EmailPopup;
