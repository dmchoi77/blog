import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toast } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { CommentForm, TextArea } from "./Comment";

function SingleComment({ isReply, comment, idx, refreshFunction }) {
  const user = useSelector((state) => state.user);
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const history = useHistory();

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };

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
      content: commentValue,
      writer: user.userData._id,
      postId: idx,
      responseTo: comment._id,
    };

    axios
      .post("http://15.164.220.78:8000/api/comments", variables)
      .then((res) => {
        if (res.data.success) {
          setCommentValue("");
          refreshFunction(res.data.result);
          setOpenReply(!openReply);
        } else {
          alert("저장을 실패하였습니다.");
        }
      });
  };

  const onDelete = (e) => {
    if (user.userData._id === comment.writer._id) {
      axios
        .delete("http://15.164.220.78:8000/api/comments", {
          data: {
            _id: comment._id,
          },
        })
        .then((res) => {
          refreshFunction(comment._id);
          alert("삭제되었습니다.");
        });
    } else {
      alert("삭제 권한이 없습니다.");
      e.preventDefault();
    }
  };

  return (
    <div>
      <Toast onClose={onDelete}>
        <Toast.Header>
          <strong className="me-auto">{comment.writer.name}</strong>
        </Toast.Header>
        <Toast.Body>{comment.content}</Toast.Body>
        {!isReply ? (
          <span onClick={onClickReplyOpen} style={{ margin: "10px" }}>
            Reply to
          </span>
        ) : null}
      </Toast>
      {openReply && (
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
      )}
    </div>
  );
}

export default SingleComment;

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
