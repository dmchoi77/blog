import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReply, setOpenReply] = useState(false);
  const isReply = true;

  useEffect(() => {
    let commentNumber = 0;

    props.commentList.map((comment, index) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });

    setChildCommentNumber(commentNumber);
  }, [props.commentList, props.parentCommentId]);

  const renderReplyComment = (parentCommentId) =>
    props.commentList.map((comment, index) => (
      <>
        {comment.responseTo === parentCommentId && (
          <div
            style={{ width: "100%", marginLeft: "40px", marginBottom: "15px" }}
          >
            <SingleComment
              isReply={isReply}
              comment={comment}
              idx={props.idx}
              commentList={props.commentList}
              refreshFunction={props.refreshFunction}
            />
          </div>
        )}
      </>
    ));

  const onHandleChange = () => {
    setOpenReply(!openReply);
  };

  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: "10px" }}
          onClick={onHandleChange}
        >
          더보기 ({childCommentNumber})
        </p>
      )}
      {openReply && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
