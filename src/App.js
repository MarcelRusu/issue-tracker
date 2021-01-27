import Page from './misc/Page';
import Board from './components/board';
import Button from './misc/Button';
import UserLink from './components/UserLink';

const App = () => (
  <Page>
    <header className="flex justify-between">
      <UserLink user={'Marcel Rusu'} />
      <h1 className="text-5xl">
        eFocus
      </h1>
      <Button className="justify-right">
        Sign Out
      </Button>
    </header>
    <hr className="my-5"/>
    <Board />
  </Page>
);

export default App;
