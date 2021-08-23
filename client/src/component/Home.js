import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import main from '../main.jpeg';
import ReactHtmlParser from 'react-html-parser';


function Home() {

  const [list, setList] = useState([{
    idx: '',
    title: '',
    content: '',
    date: '',
    writer: ''
  }]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/get')
      .then((response) => {
        setList(response.data.reverse());
      });
  }, [])


  return (
    <div className="body">
      <div className="cover-image">
        <img
          src={main}
          width='100%'
          height='500px'
          alt='cover-image'>
        </img>
        <div className="text">
          <p>Welecome My blog!</p>
        </div>
      </div>
      <Container className="list-wrapper">
        {
          list.map(rowData => (
            rowData.idx !== '' &&
            <div className="summary">
              <Link to={`/board/view/${rowData.idx}`} index={rowData.idx} ><h1>{rowData.title}</h1></Link>
              <h5>{rowData.date}</h5>
              <hr className="cover-hr" />
            </div>
          ))
        }

      </Container>
    </div>
  )
}

export default Home;