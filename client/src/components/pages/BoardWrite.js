import React, { useState, createRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

function BoardWrite(props) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const writer = sessionStorage.id;
    const history = useHistory();
    const editorRef = createRef();

    const handleInputTitle = (e) => {
        setTitle(e.target.value);
        //console.log(title);
    }

    const submit = (e) => {
        axios.get('http://localhost:8000/api/board/index') //인덱스 조회
            .then((response) => {
                axios.post('http://localhost:8000/api/board/post', {
                    index: null ? 1 : response.data[0].index + 1, //첫 번째 게시글일 경우 indx가 null이므로 1로 설정
                    title: title,
                    content: content,
                    writer: writer
                }).then((res) => {
                    if (res.data === "null") {
                        alert("내용을 입력하세요.");

                    } else {
                        // alert("게시글이 등록되었습니다.");
                        history.push("/board/list");
                    }
                }).catch(error => console.log(error));
            });
    }

    const uploadImage = async (blob) => {

        let formData = new FormData();

        formData.append('image', blob);
        const result = await axios.post('http://localhost:8000/api/image', formData, {
            data: formData,
            headers: { 'Content-type': 'multipart/form-data' }
        });
        //console.log(result);

        return result.data;
    };

    return (
        <Wrapper>
            <h1>게시글 작성</h1>
            <TitleInput type='text' placeholder='제목' name='title' onChange={handleInputTitle} />
            <Editor
                previewStyle='vertical'
                height='800px'
                plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
                data=""
                name='content'
                ref={editorRef}
                hooks={{
                    addImageBlobHook: async (blob, callback) => {
                        if (blob.size > 5 * 1024 * 1024) {
                            alert('용량 초과');
                        }
                        else {
                            const upload = await uploadImage(blob);
                            callback(upload, "alt-text");
                        }
                        return false;

                    }
                }}

                onChange={() => {
                    const data = editorRef.current.getInstance().getMarkdown();
                    setContent(data)
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