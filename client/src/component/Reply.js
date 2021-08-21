import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function Reply() {
    const data = useState({
        content: "",
    })
    return (
        <div>

            <hr />
            <h4>댓글 작성하기</h4>

            <textarea className="text-area"></textarea>
            <Button className="reply-btn" variant="primary" type='button' >
                등록
            </Button>
        </div>
    )
};


export default Reply;