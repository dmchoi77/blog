import React, { useState } from 'react';
import { Button, Toast } from 'react-bootstrap';

function Reply() {
    
    const [data, setData] = useState([
        {
            content: "댓글 1빠다"
        },
        {
            content: "댓글 2빠다."
        }
    ]);

    const [write, setWrite] = useState("");

    const onHandleInput = (e) => {

        setWrite(e.target.value);
    }

    const onSubmit = () => {

        if (write === "") {
            alert("내용을 입력해주세요.");
            return;
        }
        setData([
            ...data,
            {
                content: write
            }
        ])

        setWrite("");
        alert("댓글이 작성되었습니다.");
    }
    return (
        <div>
            <hr />
            <h4>댓글 작성하기</h4>
            <textarea className="text-area" value={write} onChange={onHandleInput}></textarea>
            <Button className="reply-btn" variant="primary" type='button' onClick={onSubmit}>
                등록
            </Button>
            <hr/>
            {
                data !== null ?
                    <ReplyList data={data} />
                    : null
            }
        </div>
    )
}

function ReplyList(props) {
    return (
        props.data.map(i => (
            <div key={i.content}>
                <Toast>
                    <Toast.Header closeButton={false}>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">익명</strong>
                    </Toast.Header>
                    <Toast.Body>{i.content}</Toast.Body>
                </Toast>
            </div>
        ))
    )
}



export default Reply;