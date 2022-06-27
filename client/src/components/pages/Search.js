import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { paginate } from "../Pagination";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import { useHistory } from "react-router-dom";

function Search() {
  const [search, setSearch] = useState();
  const [list, setList] = useState({
    data: "",
    pageSize: 12, //한 페이지에 글목록 10개
    currentPage: 1,
  });
  const { data, pageSize, currentPage } = list;
  const pagedList = paginate(data, currentPage, pageSize);
  const history = useHistory();

  useEffect(() => {
    axios.get("http://15.164.220.78:8000/api/articles").then((response) => {
      let data = response.data.reverse();

      if (!search) return;

      setList({
        data: data.filter((word) => word.title.includes(search)),
        pageSize: 10,
        currentPage: 1,
        searchKeyword: "",
      });
    });
  }, [search]);

  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      <SearchBar>
        <img
          src="/img/search.png"
          alt="serach"
          style={{ width: "25px", height: "25px" }}
        />
        <Input
          type="search"
          placeholder="검색어를 입력하세요."
          autoFocus
          onChange={handleInputSearch}
        />
      </SearchBar>

      {list.data.length > 0 && (
        <h5 style={{ marginTop: "2rem", width: "780px" }}>
          총 {list.data.length}개의 포스트를 찾았습니다.
        </h5>
      )}
      <Articles>
        {pagedList.map(
          (rowData, i) =>
            rowData.idx !== "" && (
              <Article
                onClick={() => history.push(`/board/view/${rowData.index}`)}
                key={i}
              >
                <Thunmbnail>
                  <img
                    src={
                      rowData.url
                        ? rowData.url
                        : `https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png`
                    }
                    width="100%"
                    height="100%"
                    alt="thumbnail"
                  />
                </Thunmbnail>
                <Title>{rowData.title}</Title>
                <Content>
                  <MDEditor.Markdown source={rowData.content} />
                </Content>
                <Date>{rowData.date}</Date>
              </Article>
            )
        )}
      </Articles>
    </Container>
  );
}

export default Search;

const Container = styled.div`
  padding: 4rem 2rem 0;
  margin: 0 auto 4rem;
  width: 768px;
  display: flex;
  min-height: 100%;
  flex-direction: column;

  @media (max-width: 790px) {
    width: 100%;
  }
`;

const SearchBar = styled.div`
  display: flex;
  font-size: 140%;
  display: flex;
  // width : 780px;
  width: 100%;
  height: 70px;
  border: 1.5px solid #e05194;
  padding: 0px 1.5rem;
  align-items: center;
  margin: 0 auto;
`;
const Input = styled.input`
  border: none;
  width: 100%;
  display: flex;
  height: 60px;
  padding-left: 1rem;
  outline: 0;
  padding: 1rem 2rem;
`;

const Articles = styled.div`
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Article = styled.div`
  margin-top: 2rem;
  width: 100%;
  background-color: #fff;
  border: 1px solid #dae1e6;
  position: relative;
  cursor: pointer;
  transition: 0.5s all;
  border-radius: 10px;
  border: none;
  box-shadow: 0 2px 16px 0 rgb(0 0 0 / 5%);

  &:hover {
    background-color: rgba($bg-color-dark-0, 0.1);
    transform: translateY(-5px);
  }
`;

const Thunmbnail = styled.div`
  position: relative;
  height: 500px;
  overflow-y: hidden;
  border-radius: 10px 10px 0 0;
  border: none;
`;

const Title = styled.div`
  font-size: 1.5rem;
  height: 45px;
  padding: 2px 10px;
  margin: 5px 0;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`;
const Content = styled.div`
  height: 42px;
  padding: 2px 10px;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  line-height: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  div,
  span,
  object,
  iframe,
  figure,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  code,
  em,
  img,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  b,
  u,
  i,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  main,
  canvas,
  embed,
  footer,
  header,
  nav,
  section,
  video {
    font-size: 0.75rem !important;
    font-weight: normal !important;
    margin: 0 !important;
    padding: 0 !important;
    padding-right: 1px !important;
    border: 0 !important;
    display: inline !important;
    word-break: break-all !important;
  }
  img,
  hr,
  br,
  pre,
  code {
    display: none !important;
  }
`;

const Date = styled.div`
  height: 20px;
  padding: 20px 10px;
  font-size: 0.65em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
`;
