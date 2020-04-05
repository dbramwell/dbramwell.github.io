import React, {useGlobal} from 'reactn';
import Container from '../components/Container'
import RepositoryView from '../components/RepositoryView'
import HRSpacer from '../components/HRSpacer'
import { Fragment } from 'react';
import { Repository } from '../types';

const Github: React.FC = () => {

  const [githubData] = useGlobal('githubData');

  const uniqueRepositories = () => {
    const repos = githubData.pullRequests.nodes.map(pull => pull.baseRepository)
    return repos.filter((repo, i) => {
      return repos.findIndex(it => it.nameWithOwner === repo.nameWithOwner) === i
    }).sort((a, b) => a.stargazers.totalCount < b.stargazers.totalCount ? 1 : -1)
  }

  const pullsInRepository = (repo: Repository) => {
    const pulls = githubData.pullRequests.nodes
    return pulls.filter(pull => pull.baseRepository.nameWithOwner === repo.nameWithOwner)
  }

  if (githubData) {
    return (
      <Fragment>
        <section>
          <h2>Github</h2>
        </section>
        <section>
          <Container title="Popular Repositories">
            <HRSpacer>
              {githubData.repositories.nodes.filter(it => it.stargazers.totalCount >= 10)
                .map(it => <RepositoryView repo={it} />)
              }
            </HRSpacer>
          </Container>
        </section>
        <section>
          <Container title="Contributions">
            <HRSpacer>
              {uniqueRepositories().map(it => <RepositoryView repo={it} pulls={pullsInRepository(it)} />)}
            </HRSpacer>
          </Container>
        </section>
      </Fragment>
    );
  }

  return null
}

export default Github;
