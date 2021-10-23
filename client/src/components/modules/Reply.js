/*eslint-disable*/

import React, { useEffect, useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

function Reply(props) {

    const [reply, setReply] = useState();
    const [content, setContent] = useState('');
    const index = props.index;
    const [mount, setMount] = useState(true);
    const [replyIdx, setReplyIdx] = useState(0);
    const name = sessionStorage.getItem('id');

    useEffect(() => {
        setMount(true)
        //console.log("component did mount")
        axios.get(`http://13.124.169.57:8000/api/board/${index}/replies`, {
            params: {
                'idx': index
            }
        }).then(res => {
            setReply([...res.data]);
            setReplyIdx(res.data.length);
        })
        return () => {
            setMount(false)
            //console.log("component will unmount")
        };
    }, [mount])

    const onHandleInput = (e) => {
        setContent(e.target.value);
    }

    const onSubmit = (e) => {

        if (content === "") {
            alert("내용을 입력해주세요.");
            return;
        }
        else {
            axios.post(`http://13.124.169.57:8000/api/board/${index}/replies/${replyIdx}`, {
                content_idx: props.index,
                name: name ? name : "익명",
                content: content,
                replyIdx: replyIdx === 0 ? 1 : replyIdx + 1,

            }).then((res) => {
                if (res.data === "null!") {
                    alert("내용을 입력하세요.");
                }
            })
            alert("댓글이 작성되었습니다.");
            setContent('');
        }
        setMount(!mount);
    }

    const refresh = () => {
        setMount(!mount);
    }

    return (
        <div>
            <hr />
            <h4>댓글 작성하기</h4>
            <TextArea value={content} onChange={onHandleInput} />
            <Button className="reply-btn" variant="primary" type='button' onClick={onSubmit}>
                등록
            </Button>
            <hr />
            <RefreshButton onClick={refresh} src="/img/refresh.png"></RefreshButton>
            <hr />
            <ReplyList reply={reply} index={index} setMount={setMount} />
        </div>
    )
}

function ReplyList(props) {
    let reply = props.reply;
    let index = props.index;
    let replyIdx = props.replyIdx;

    return (
        <div>
            {reply === undefined || reply.length === 0 ?
                "아직 작성된 댓글이 없습니다."
                :
                reply.map((rowData, i) => (
                    <div key={i}>
                        <Toast show={true} onClose={() => {
                            if (sessionStorage.getItem('id') === reply[i].user_name) {
                                axios.delete(`http://13.124.169.57:8000/api/board/${index}/replies/delete/${replyIdx}`, {
                                    data: {
                                        content_idx: props.index,
                                        replyIdx: reply[i].reply_idx,
                                    }
                                })
                            } else {
                                alert("삭제 권한이 없습니다.");
                            }
                            props.setMount(false);
                        }}>
                            <Toast.Header>
                                <strong className="me-auto">{reply[i].user_name}</strong>
                            </Toast.Header>
                            <Toast.Body>{reply[i].content}</Toast.Body>
                        </Toast>
                    </div>
                ))
            }
        </div>
    )
}

const TextArea = styled.textarea`
    width : 100%;
    height : 70px
`
const RefreshButton = styled.img`
    display :flex;
    justify-content : end;
    width : 25px;
    height : 25px;
    margin-top : -10px;
    margin-bottom : 20px;
`

export default Reply;