import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import { useSelector } from "react-redux";
import Comment from "./Sections/Comment";
import SEO from "../../../modules/SEO";

function PostContent({ match }) {
  const user = useSelector((state) => state.user);
  const [post, setPost] = useState([]);
  const { title, content, date, writer, index, url } = post;
  const idx = match.params.data;
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchIndex = await axios.get(
        `http://15.164.220.78:8000/api/articles/${idx}`,
        {
          params: {
            idx: idx,
          },
        }
      );
      const postData = fetchIndex.data[0];
      setPost(postData);
      await axios.put(`http://15.164.220.78:8000/api/articles/views/${idx}`, {
        //조회수 증가
        index: postData.index,
      });
    } catch (err) {
      console.log("ERROR");
    }
  };

  const onDelete = (e) => {
    if (user.userData.isAdmin) {
      axios
        .delete(`http://15.164.220.78:8000/api/articles/${index}`, {
          data: {
            idx: idx,
          },
        })
        .then((res) => {
          alert("삭제되었습니다.");
          history.push("/post/list");
        });
    } else {
      alert("삭제 권한이 없습니다.");
      e.preventDefault();
    }
  };

  return (
    <Container>
      <SEO title={title} description={content} url={`post/view/${index}`} />
      {!content ? (
        <Spinner
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "200px auto",
          }}
          animation="border"
          role="status"
        />
      ) : (
        <>
          <div style={{ margin: "0 auto" }}>
            <h1
              style={{
                fontSize: "2.3rem",
                marginBottom: "30px",
                fontWeight: "900",
              }}
            >
              {title}
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{writer}</div>
              <DateBefore />
              <div>{date}</div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <img src={url} style={{ width: "100%" }} />
            </div>
          </div>
          <hr />
          <div>
            <div>
              <MDEditor.Markdown source={content} />
            </div>
          </div>
          <hr />
          <div style={{ marginBottom: "20px" }}>
            <Button
              className="post-view-go-list-btn"
              variant="primary"
              type="button"
              onClick={() => history.push("/")}
            >
              전체글
            </Button>
            {user.userData.isAdmin && (
              <>
                <Button
                  className="post-view-go-modify-btn"
                  variant="primary"
                  type="button"
                  onClick={() => {
                    if (user.userData.isAdmin) {
                      history.push({
                        pathname: `/post/modify/${index}`,
                        state: {
                          writer, //PostModify로 props 전달
                          index: idx,
                          title,
                          content,
                        },
                      });
                    } else {
                      alert("글쓰기 권한이 없습니다.");
                    }
                  }}
                >
                  수정
                </Button>
                <Button
                  className="post-view-go-modify-btn"
                  variant="primary"
                  type="button"
                  onClick={onDelete}
                >
                  삭제
                </Button>
              </>
            )}
          </div>
          <div>
            <Comment idx={idx} />
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.main`
  padding: 3rem 1.5rem 0;
  margin: 0 auto 7rem;
  min-height: 100%;
  width: 768px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DateBefore = styled.span`
  content: "";
  display: inline-block;
  width: 0.1rem;
  height: 1rem;
  background: #ccc;
  margin: 0 10px 0 6px;
  vertical-align: -2px;
`;

const Button = styled.button`
  background-color: #e05194;
  text-align: cetner;
  padding: 8px;
  color: #ffff;
  border: none;
  width: 80px;
`;

export default PostContent;
