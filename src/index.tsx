import React, { addReducer, getDispatch } from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { API } from 'aws-amplify';

addReducer("getGithubData", async () => {
  const resp = await API.get("githubapi", "/githubData", {})
  return {githubData: resp}
})

addReducer("getStackOverflowData", async () => {
  const resp = await API.get("stackoverflowapi", "/data", {})
  return {stackOverflowData: resp}
})

addReducer("getGithubColours", async () => {
  const resp = await fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json")
  const json = await resp.json()
  const colours: {[key: string]: string} = {}
  Object.keys(json).forEach(lang => {
    colours[lang.replace(' ', '').toLowerCase()] = json[lang].color
  })
  return {githubColours: colours}
})

getDispatch().getGithubData()
getDispatch().getStackOverflowData()
getDispatch().getGithubColours()

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
