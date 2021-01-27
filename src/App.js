import Page from './misc/Page';
import Board from './components/board';
import Button from './misc/Button';
import UserLink from './components/UserLink';

const App = () => (
  <Page>
    <header className="flex justify-between align-middle">
      <UserLink user={'Marcel Rusu'} />
      <div className="flex flex-col">
        <h1 className="text-5xl text-center">
          eFocus
        </h1>
        <div className="muted">
          The best issue tracker on the web!
        </div>
      </div>
      <Button className="justify-right">
        Sign Out
      </Button>
    </header>
    <hr className="my-5"/>
    <Board />
  </Page>
);

export default App;
