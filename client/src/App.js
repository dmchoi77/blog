import './App.css';
import BoardWrite from './component/BoardWrite';
import BoardList from './component/BoardList';
import { Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <button><Link to={"/board/list"} >글목록</Link></button>
      <button><Link to={"/board/write"} >글쓰기</Link></button>
      <Route exact path="/board/list" component={BoardList} />
      <Route exact path="/board/write" component={BoardWrite} />
    </div>
  );
}

export default App;
