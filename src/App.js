import Page from './misc/Page';
import Board from './components/Board';

function App() {
  return (
    <Page>
      <header className="flex mx-5 justify-between">
        <a href="#sdf">Todo</a>
        <a href="#sdf">Doing</a>
        <a href="#sdf">Done</a>
      </header>  
      <Board />
    </Page>
  );
}

export default App;
