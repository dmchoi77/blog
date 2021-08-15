import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

function BoardWrite() {

    const [content, setContent] = useState({
        title: '',
        content: ''
    });

    const getValue = e => {
        const { name, value } = e.target;
        setContent({
            ...content,
            [name]: value
        })
        //console.log(name, value);
    };

    const submit = () => {
        axios.post('http://localhost:8000/api/insert', {
            title: content.title,
            content: content.content
        }).then(() => {
            alert("게시글이 등록되었습니다.");
            document.location.href = '/board/list'
        })

    };
    return (
        <div className="write-form">
            <div className='form-wrapper'>
                <input className="title-input" type='text' placeholder='제목' name='title' onChange={getValue} />
                <CKEditor
                    editor={ClassicEditor}
                    data=""

                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        setContent({
                            ...content,
                            content: data
                        })
                        console.log(content);
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>
            <button className="submit-button" onClick={submit}>입력</button>
        </div>
    )
}


export default BoardWrite;