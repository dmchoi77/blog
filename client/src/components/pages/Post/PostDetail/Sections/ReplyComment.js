import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment({ parentCommentId, idx, commentList, refreshFunction }) {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReply, setOpenReply] = useState(false);
  const isReply = true;

  useEffect(() => {
    let commentNumber = 0;

    commentList.map((comment, index) => {
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    });

    setChildCommentNumber(commentNumber);
  }, [commentList, parentCommentId]);

  const renderReplyComment = (parentCommentId) =>
    commentList.map((comment, index) => (
      <>
        {comment.responseTo === parentCommentId && (
          <div
            style={{ width: "100%", marginLeft: "40px", marginBottom: "15px" }}
          >
            <SingleComment
              isReply={isReply}
              comment={comment}
              idx={idx}
              refreshFunction={refreshFunction}
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
      {openReply && renderReplyComment(parentCommentId)}
    </div>
  );
}

export default ReplyComment;
