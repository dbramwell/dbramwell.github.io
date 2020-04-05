import React, { setGlobal, addReducer, getDispatch } from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { PullRequest } from './types';
import { API } from 'aws-amplify';

const baseApi = "https://api.github.com/users/"

setGlobal({
  talkyData: [],
  talkyIndex: 0
});

// addReducer("incrementTalkyIndex", (state) => {
//   if (state.talkyIndex + 1 >= state.talkyData.length) {
//     return {talkyIndex: 0}
//   }
//   return {talkyIndex: state.talkyIndex + 1}
// });

// addReducer("clearTalkyData", () => {
//   return {talkyData: []}
// });

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

// setInterval(getDispatch().incrementTalkyIndex, 2000)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
