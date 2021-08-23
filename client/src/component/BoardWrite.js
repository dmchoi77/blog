import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function BoardWrite(props) {



    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const writer = sessionStorage.id;

    const handleInputTitle = (e) => {
        setTitle(e.target.value);
        //console.log(title);
    }

    const submit = () => {
        console.log(title, content);
        axios.post('http://localhost:8000/api/insert', {
            title: title,
            content: content,
            writer: writer
        }).then((res) => {
            if (res.data === "null!") {
                alert("내용을 입력하세요.");
            } else {
                alert("게시글이 등록되었습니다.");
                document.location.href = '/board/list';
            }
        })
    }

    return (
        <div className="body">
            <div className='write-wrapper'>
                <input className="title-input" type='text' placeholder='제목' name='title' onChange={handleInputTitle} />
                <CKEditor
                    editor={ClassicEditor}
                    data=""
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
                    등록
                </Button>
            </div>
        </div>
    )
}


export default BoardWrite;