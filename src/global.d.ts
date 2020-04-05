import 'reactn';
import { PullRequest, GithubResponse, StackOverflowResponse } from './types';

declare module 'reactn/default' {

  export interface Reducers {
    getGithubData: () => Pick<State, 'githubData'>
    getStackOverflowData: () => Pick<State, 'stackOverflowData'>
    getGithubColours: () => Pick<State, 'githubColours'>
  }

  export interface State {
    githubData: GithubResponse
    stackOverflowData: StackOverflowResponse
    githubColours: GithubColours
  }
}