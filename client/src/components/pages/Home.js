import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Pagination from '../modules/Pagination';
import { paginate } from '../modules/Pagination';
import Preview from '../modules/Preview';
import Comments from '../modules/Comments'

function Home() {

  const [list, setList] = useState({
    data: {
      idx: '',
      title: '',
      content: '',
      date: '',
      writer: '',
      url: ''
    },
    pageSize: 12, //한 페이지에 글목록 10개
    currentPage: 1,
  });

  useEffect(() => {

    axios.get('/api/articles')
      .then((response) => {
        let data = response.data.reverse();
        setList({
          data,
          pageSize: 12,
          currentPage: 1,
        });
      })
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
    <Container>
      <h1>전체글</h1>
      <hr />
      <div>
        <Preview list={pagedList} />
        <Pagination
          itemCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <div style={{ paddingTop: "50px" }}>
        <h3>방명록</h3>
        <hr />
        <Comments repo="Dong-min-choi/Blog" />
      </div>
    </Container>
  )
}
const Container = styled.div`
  padding : 3rem 0 0;
  margin : 0 auto 7rem;

  @media(max-width : 811px) {
    width : 100%;
}
`

export default Home;