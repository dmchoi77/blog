import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import styled from "styled-components";
import axios from "axios";

export default function Comment({ idx }) {
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");
  const history = useHistory();
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    axios
      .get("http://15.164.220.78:8000/api/comments", {
        params: {
          idx: idx,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setCommentList(res.data.comments);
        } else {
          // alert("댓글 정보를 가져오는 것에 실패했습니다.")
        }
      });
  }, []);

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

  const refreshFunction = (variables) => {
    if (typeof variables === "object") {
      //댓글 등록 시
      setCommentList(commentList.concat(variables));
    } else {
      //댓글 삭제 시
      setCommentList((comments) =>
        comments.filter(
          (comment) =>
            comment._id !== variables && comment.responseTo !== variables
        )
      );
    }
  };

  return (
    <>
      <h5 style={{ fontWeight: 700, marginBottom: "30px" }}>
        총 {commentList.length} 개의 댓글이 있습니다.
      </h5>
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
    </>
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

const Button = styled.button`
  background-color: #e05194;
  text-align: cetner;
  padding: 8px;
  color: #ffff;
  border: none;
  width: 80px;
  height: 40px;
  margin-bottom: 15px;
`;
