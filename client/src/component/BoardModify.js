import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function BoardModify() {

    const [title, setTitle] = useState(sessionStorage.getItem('title'));
    const [content, setContent] = useState(sessionStorage.getItem('content'));
    const id = sessionStorage.id;
    const writer = sessionStorage.writer;
    const index = sessionStorage.getItem('idx');
    const history = useHistory();

    const handleInputTitle = (e) => {
        setTitle(e.target.value);
        //console.log(title);
    }

    const submit = () => {
        axios.post('http://localhost:8000/api/modify', {
            title: title,
            content: content,
            idx: index
        }).then((res) => {
            if (res.data === "null!") {
                alert("내용을 입력하세요.");
            } else {
                // alert("게시글이 수정되었습니다.");
                history.push("/board/list");
            }
        })
        sessionStorage.removeItem('title');
        sessionStorage.removeItem('content');
        sessionStorage.removeItem('idx');
        sessionStorage.removeItem('writer');
    }

    return (
        <div className="body">
            <div className='write-wrapper'>
                <h2>게시글 수정</h2>
                <input className="title-input" type='text' placeholder='제목' name='title' onChange={handleInputTitle} value={title} />

                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    name='content'

                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data)
                        //console.log(content);
                    }}

                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
                <Button className="post-write-btn" variant="primary" type='button' onClick={submit}  >
                    수정
                </Button>
            </div>
        </div>
    )
}


export default BoardModify;