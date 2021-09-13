/*eslint-disable*/

import React, { useEffect, useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

function Reply(props) {

    const [reply, setReply] = useState('');
    const [content, setContent] = useState('');
    const index = props.index;
    const [mount, setMount] = useState(true);
    const [replyIdx, setReplyIdx] = useState(0);


    useEffect(() => {
        //console.log("component did mount")
        axios.get('http://localhost:8000/api/reply', {
            params: {
                'idx': index
            }
        }).then(res => {
            setReply([...res.data]);
            setReplyIdx(res.data.length);
        })
        return () => {
            setMount(true)
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
            axios.post('http://localhost:8000/api/reply/insert', {
                content_idx: props.index,
                name: sessionStorage.getItem('id'),
                content: content,
                replyIdx: replyIdx === 0 ? 1 : replyIdx + 1
            }).then((res) => {
                if (res.data === "null!") {
                    alert("내용을 입력하세요.");
                }
            })
            alert("댓글이 작성되었습니다.");
            setContent('');
        }
        setMount(false);
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
            <ReplyList reply={reply} index={index} setMount={setMount} />
        </div>
    )
}

function ReplyList(props) {
    let reply = props.reply;

    return (
        <div>
            {reply ?
                reply.map((rowData, i) => (
                    <div key={i}>
                        <Toast show={true} onClose={() => {
                            if (sessionStorage.getItem('id') === reply[i].user_name) {
                                axios.post('http://localhost:8000/api/reply/delete', {
                                    content_idx: props.index,
                                    replyIdx: reply[i].reply_idx,
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
                : null

            }
        </div>
    )
}

const TextArea = styled.textarea`
    width : 100%;
    height : 70px
`

export default Reply;