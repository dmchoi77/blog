import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

export default function Comment({ idx, commentList, refreshFunction }) {
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");
  const history = useHistory();

  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!user.userData.isAuth) {
      alert("로그인이 필요합니다.");
      history.push("/login");
      return;
    }
    if (commentValue === "") {
      alert("내용을 입력하세요.");
      return;
    }

    const variables = {
      writer: user.userData._id,
      postId: idx,
      content: commentValue,
    };

    axios
      .post("http://15.164.220.78:8000/api/comments", variables)
      .then((res) => {
        if (res.data.success) {
          setCommentValue("");
          refreshFunction(res.data.result);
        } else {
          alert("저장을 실패하였습니다.");
        }
      });
  };

  return (
    <div style={{ width: "100%" }}>
      {commentList &&
        commentList.map(
          (comment, index) =>
            !comment.responseTo && (
              <>
                <SingleComment
                  comment={comment}
                  idx={idx}
                  commentList={commentList}
                  refreshFunction={refreshFunction}
                />
                <ReplyComment
                  parentCommentId={comment._id}
                  idx={idx}
                  commentList={commentList}
                  refreshFunction={refreshFunction}
                />
              </>
            )
        )}
      {user && user.userData.isAuth ? (
        <CommentForm onSubmit={onSubmit}>
          <TextArea
            onChange={onHandleChange}
            value={commentValue}
            placeholder="댓글을 작성해주세요."
          />
          <br />
          <Button
            style={{ width: "15%", height: "40px" }}
            className="reply-btn"
            variant="primary"
            type="button"
            onClick={onSubmit}
          >
            등록
          </Button>
        </CommentForm>
      ) : (
        <Message>댓글을 작성하려면 로그인이 필요합니다.</Message>
      )}
    </div>
  );
}

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  width: 100%;
  height: 70px;
  margin-top: 5px;
  resize: none;
  border: 1px solid rgb(233, 236, 239);
`;

const Message = styled.div`
  margin-top: 2rem;
  background-color: rgb(224, 81, 148);
  color: #ffff;
  text-align: center;
`;
