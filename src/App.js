import Page from './misc/Page';
import Card from './misc/Card';

const Col = ({children}) => (
  <div className="mx-5 mb-1 bg-gray-300 rounded w-1/3 h-full overflow-scroll py-2" style={{boxShadow: 'inset #00000040 0px 1px 3px 1px'}}>
    {children}
  </div>
)

const cards = Array.from({length: 7}).map((_, i) => ({
  title: `Item #${i + 1}`,
  content: 'Has to finish this issue tracker'
}));

function App() {
  return (
    <Page>
      <header className="flex mx-5 justify-between">
        <a>Todo</a>
        <a>Doing</a>
        <a>Done</a>
      </header>  
      <div className="flex h-full">
        <Col>
          {cards.map(({title, content}) => (
            <Card className="m-2" title={title}>
              <p>{content}</p>
            </Card>
          ))}
        </Col>
        <Col/>
        <Col/>
      </div>
    </Page>
  );
}

export default App;
