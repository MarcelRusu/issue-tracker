import Page from './misc/Page';

const Col = ({children}) => (
  <div className="mx-5 bg-gray-300 rounded w-1/3 h-full">
    {children}
  </div>
)

function App() {
  return (
    <Page>
      <header className="flex mx-5 justify-between">
        <a>Todo</a>
        <a>Doing</a>
        <a>Done</a>
      </header>  
      <div className="flex h-full">
        <Col/>
        <Col/>
        <Col/>
      </div>
    </Page>
  );
}

export default App;
