import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import Pagination from '../modules/Pagination';
import { paginate } from '../modules/Pagination';
import Preview from '../modules/Preview';


function Home() {

  const [list, setList] = useState({
    data: {
      idx: '',
      title: '',
      content: '',
      date: '',
      writer: ''
    },
    pageSize: 12, //한 페이지에 글목록 10개
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
            pageSize: 12,
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
      <Container >
        <Preview list={pagedList} />
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

export default Home;