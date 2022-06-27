import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Pagination from "../Pagination";
import { paginate } from "../Pagination";
import Notice from "../Notice";
import PostPreview from "../PostPreview";
import Comments from "../Comments";
import SEO from "../modules/SEO";

function Home() {
  const [list, setList] = useState({
    data: "",
    pageSize: 10, //한 페이지에 글목록 10개
    currentPage: 1,
  });

  useEffect(() => {
    axios.get("http://15.164.220.78:8000/api/articles").then((response) => {
      let data = response.data.reverse();
      setList({
        data,
        pageSize: 10,
        currentPage: 1,
      });
    });
  }, []);

  //페이징
  const handlePageChange = (page) => {
    setList({
      ...list,
      currentPage: page,
    });
  };

  const { data, pageSize, currentPage } = list;
  const { length: count } = list.data;

  const pagedList = paginate(data, currentPage, pageSize);

  return (
    <Container>
      <SEO title={"dmchoi blog"} description={"dmchoi 블로그입니다."} />
      <Notice />
      <h1>전체글</h1>
      <hr />
      <div>
        <PostPreview list={pagedList} />
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
  );
}

const Container = styled.div`
  padding: 20px 30px 0;
  margin: 0 auto 7rem;
  width: 1100px;

  @media (max-width: 987px) {
    width: 100%;
  }
`;

export default Home;
