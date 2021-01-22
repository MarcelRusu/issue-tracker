import Page from './misc/Page';
import Board from './components/Board';

function App() {
  return (
    <Page>
      <header className="flex mx-5 justify-between">
        <a>Todo</a>
        <a>Doing</a>
        <a>Done</a>
      </header>  
      <Board />
    </Page>
  );
}

export default App;
