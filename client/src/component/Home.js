import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { paginate } from './Pagination';

function Home() {

  const [list, setList] = useState({
    data: {
      idx: '',
      title: '',
      content: '',
      date: '',
      writer: ''
    },
    pageSize: 10, //한 페이지에 글목록 10개
    currentPage: 1,
  });

  useEffect(() => {
    let isComponentMounted = true;
    axios.get('http://localhost:8000/api/get')
      .then((response) => {
        let data = response.data.reverse();
        if (isComponentMounted) {
          setList({
            data,
            pageSize: 10,
            currentPage: 1,
          });
        }
      })
    return () => {
      isComponentMounted = false
    }
  }, [])

  //페이징
  const handlePageChange = (page) => {
    setList({
      ...list,
      currentPage: page
    });
  }

  const { data, pageSize, currentPage } = list;
  const { length: count } = list.data;

  const pagedList = paginate(data, currentPage, pageSize);

  return (
    <div className="body">
      <h1>전체글</h1>
      <hr />
      <Container className="home-list-wrapper">
        {
          pagedList.map(rowData => (
            rowData.idx !== '' &&
            <div className="summary" key={rowData.idx}>
              <Link to={`/board/view/${rowData.idx}`} index={rowData.idx} >
                <h1>{rowData.title}</h1>
              </Link>
              <h5>{rowData.date}</h5>
              <h4>Posted by {rowData.writer}</h4>
              <hr className="cover-hr" />
            </div>
          ))
        }
        <Pagination
          itemCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </div>
  )
}

export default Home;