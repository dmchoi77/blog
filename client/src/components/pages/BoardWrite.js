import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

function BoardWrite(props) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const writer = sessionStorage.id;
    const history = useHistory();

    const handleInputTitle = (e) => {
        setTitle(e.target.value);
        //console.log(title);
    }

    const submit = (e) => {
        //console.log(title, content);
        axios.post('http://localhost:8000/api/insert', {
            title: title,
            content: content,
            writer: writer
        }).then((res) => {
            if (res.data === "null!") {
                alert("내용을 입력하세요.");

            } else {
                // alert("게시글이 등록되었습니다.");
                history.push("/board/list");
            }
        })
    }

    return (
        <Wrapper>
            <h1>게시글 작성</h1>
            <TitleInput type='text' placeholder='제목' name='title' onChange={handleInputTitle} />
            <CKEditor
                editor={ClassicEditor}
                data=""
                name='content'

                onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data)
                }}

                onBlur={(event, editor) => {
                    // console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    //console.log('Focus.', editor);
                }}
            />
            <Button className="post-write-btn" variant="primary" type='button' onClick={submit} >
                등록
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding : 3rem 0 0;
    margin : 0 auto 7rem;
    width : 100%;
`;

const TitleInput = styled.input`
    width: 100%;
    height: 40px;
    margin: 10px 0 10px;
`

export default BoardWrite;