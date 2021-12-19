import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Toast } from 'react-bootstrap';
import axios from 'axios';

function SingleComment(props) {

    const user = useSelector(state => state.user);
    const [openReply, setOpenReply] = useState(false)
    const [commentValue, setCommentValue] = useState('')
    const history = useHistory();

    const onClickReplyOpen = () => {
        setOpenReply(!openReply)
    }

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!user.userData.isAuth) {
            alert('로그인이 필요합니다.');
            history.push("/login");
            return
        }
        if (commentValue === "") {
            alert("내용을 입력하세요.")
            return
        }

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: props.idx,
            responseTo: props.comment._id
        }

        axios.post('http://15.164.220.78:8000/api/comments', variables)
            .then(res => {
                if (res.data.success) {
                    setCommentValue('')
                    props.refreshFunction(res.data.result);
                    setOpenReply(!openReply)
                } else {
                    alert("저장을 실패하였습니다.")
                }
            })
    }

    const onDelete = (e) => {
        if (user.userData._id === props.comment.writer._id) {
            axios.delete('http://15.164.220.78:8000/api/comments', {
                data: {
                    _id: props.comment._id
                }
            }).then((res) => {

                props.refreshFunction(props.comment._id)
                alert("삭제되었습니다.");
            })
        }
        else {
            alert("삭제 권한이 없습니다.");
            e.preventDefault();
        }
    }

    return (
        <div>
            <Toast onClose={onDelete}>
                <Toast.Header>
                    <strong className="me-auto">{props.comment.writer.name}</strong>
                </Toast.Header>
                <Toast.Body>{props.comment.content}</Toast.Body>
                {!props.isReply ?
                    <span onClick={onClickReplyOpen} style={{ margin: "10px" }}>Reply to</span> : null
                }
            </Toast >
            {openReply &&
                <form style={{ display: 'flex', flexDirection: "column", marginTop: '15px' }} onSubmit={onSubmit}>
                    <textarea
                        style={{ padding: "10px", width: '100%', height: '70px', marginTop: '5px', resize: "none", border: "1px solid rgb(233, 236, 239)" }}
                        onChange={onHandleChange}
                        value={commentValue}
                        placeholder="댓글을 작성해주세요."
                    />
                    <br />
                    <Button style={{ width: '15%', height: '40px', marginBottom: '15px' }} className="reply-btn" variant="primary" type='button' onClick={onSubmit}>
                        등록
             </Button>
                </form>
            }
        </div>
    )
}


export default SingleComment;