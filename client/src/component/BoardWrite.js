import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

function BoardWrite() {

    const [post, setPost] = useState({
        title: '',
        content: ''
    });

    const getValue = e => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: value
        })
        //console.log(name, value);
    };

    const submit = () => {
        axios.post('http://localhost:8000/api/insert', {
            title: post.title,
            content: post.content
        }).then((res) => {
            console.log(res.data);
            if (res.data === "null!") {
                alert("내용을 입력하세요.");
            } else {
                alert("게시글이 등록되었습니다.");
                document.location.href = '/board/list';
            }
        })
    };
    return (
        <div className="write-form">
            <div className='form-wrapper'>
                <input className="title-input" type='text' placeholder='제목' name='title' onChange={getValue} />
                <CKEditor
                    editor={ClassicEditor}
                    data=""
                    name = 'content'


                    onChange={(event, editor) => {
                        const data = editor.getData();
                        //console.log({ event, editor, data });
                        setPost({
                            ...post,
                            content: data
                        })
                        console.log(post);
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