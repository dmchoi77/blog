import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

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
            {
                data !== null ?
                    data.map(i => (
                        <div>{i.content}</div>
                    ))
                    : null

            }
        </div>
    )
};




export default Reply;