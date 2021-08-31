/*eslint-disable*/

import React, { useEffect, useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import axios from 'axios';

function Reply(props) {

    const [reply, setReply] = useState('');
    const [content, setContent] = useState('');
    const index = props.index;
    const [mount, setMount] = useState(true);

    useEffect(() => {
        setMount(true);
        console.log("component did mount")
        axios.get('http://localhost:8000/api/reply', {
            params: {
                'idx': index
            }
        }).then(res => {
            if (mount) {
                setReply([...res.data]);
            }
        })
        return () => {
            setMount(false)
            console.log("component will unmount")
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
                idx: props.index,
                name: sessionStorage.getItem('id'),
                content: content,
            }).then((res) => {
                if (res.data === "null!") {
                    alert("내용을 입력하세요.");
                }
            })
            // alert("댓글이 작성되었습니다.");
            setContent('');
        }
        setMount(false);

    }


    return (
        <div>
            <hr />
            <h4>댓글 작성하기</h4>
            <textarea className="text-area" value={content} onChange={onHandleInput} ></textarea>
            <Button className="reply-btn" variant="primary" type='button' onClick={onSubmit}>
                등록
            </Button>
            <hr />
            <ReplyList reply={reply} />
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
                        <Toast>
                            <Toast.Header closeButton={false}>
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



export default Reply;