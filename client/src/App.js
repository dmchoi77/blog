import './App.css';
import BoardWrite from './component/BoardWrite';
import BoardList from './component/BoardList';
import SignUp from './component/SignUp';

import { Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <button><Link to={"/board/list"} >글목록</Link></button>
      <button><Link to={"/board/write"} >글쓰기</Link></button>
      <button><Link to={"/board/signup"} >회원가입</Link></button>
      <Route exact path="/board/list" component={BoardList} />
      <Route exact path="/board/write" component={BoardWrite} />
      <Route exact path="/board/signup" component={SignUp} />

    </div>
  );
}

export default App;
