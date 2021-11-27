import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default function Comment(props) {
    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState('');
    const history = useHistory();

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
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
            writer: user.userData._id,
            postId: props.idx,
            content: commentValue,
        }

        axios.post('/api/comments', variables)
            .then(res => {
                if (res.data.success) {
                    setCommentValue('')
                    props.refreshFunction(res.data.result);
                } else {
                    alert("저장을 실패하였습니다.")
                }
            })
    }


    return (
        <div style={{ width: '100%' }}>
            <h3>Comment</h3>
            <hr />
            {props.commentList && props.commentList.map((comment, index) => (
                (!comment.responseTo &&
                    <>
                        <SingleComment comment={comment} idx={props.idx} commentList={props.commentList} refreshFunction={props.refreshFunction} />
                        <ReplyComment parentCommentId={comment._id} idx={props.idx} commentList={props.commentList} refreshFunction={props.refreshFunction} />
                    </>
                )
            ))}
            <form style={{ display: 'flex', marginTop: '15px' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', height: '40px', marginTop: '5px' }}
                    onChange={onHandleChange}
                    value={commentValue}
                    placeholder="댓글을 작성해주세요."
                />
                <br />
                <Button style={{ width: '15%', height: '40px' }} className="reply-btn" variant="primary" type='button' onClick={onSubmit}>
                    등록
                </Button>
            </form>
        </div>
    )
}
