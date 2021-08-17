import './App.css';
import BoardWrite from './component/BoardWrite';
import BoardList from './component/BoardList';
import SignUp from './component/SignUp';
import View from './component/View';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">My Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link><Link to={"/board/list"} className= "link">Board</Link></Nav.Link>
                <Nav.Link><Link to={"/board/list"} className= "link">Board</Link></Nav.Link>
              </Nav>
            <Nav>
            <Nav.Link><Link to={"/board/signup"} className= "link">Sign Up</Link></Nav.Link>
            <Nav.Link><Link to={"/board/signup"} className= "link">Login</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <button><Link to={"/board/write"} >글쓰기</Link></button>
      <Route exact path="/board/list" component={BoardList} />
      <Route exact path="/board/write" component={BoardWrite} />
      <Route exact path="/board/signup" component={SignUp} />
      <Route exact path="/board/view/:data" component={View} />

    </div >
  );
}

export default App;
