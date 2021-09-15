import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Pagination from '../modules/Pagination';
import { paginate } from '../modules/Pagination';

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
    axios.get('http://localhost:8000/api/board/list')
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
    <Wrapper>
      <h1>전체글</h1>
      <hr />
      <Container className="home-list-wrapper">
        {
          pagedList.map(rowData => (
            rowData.idx !== '' &&
            <div className="summary" key={rowData.idx}>
              <Link to={`/board/view/${rowData.idx}`} index={rowData.idx} >
                <Title>{rowData.title}</Title>
              </Link>
              <h5>{rowData.date}</h5>
              <Writer>Posted by {rowData.writer}</Writer>
              <CoverHr />
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
    </Wrapper>
  )
}

const Wrapper = styled.div`
    padding : 3rem 0 0;
    margin : 0 auto 7rem;
    width : 100%;
`;

const CoverHr = styled.hr`
    margin-top: 30px;
    margin-bottom: 40px;
    width : 100%
`
const Title = styled.h1`
    color :rgb(14, 48, 150);
    margin-bottom: 30px;
    font-weight: bolder;
`
const Writer = styled.h4`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
`


export default Home;