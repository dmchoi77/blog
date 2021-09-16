/*eslint-disable*/

import React, { useState, createRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

function BoardModify(props) {
    const [index, setIndex] = useState(props.location.state.index);
    const [title, setTitle] = useState(props.location.state.title);
    const [content, setContent] = useState(props.location.state.content);

    const id = sessionStorage.id;
    const history = useHistory();
    const editorRef = createRef();

    if (!props.location.state) {
        alert("잘못된 접근입니다."); //url로 직접 접근을 시도할 경우
        history.goBack();
    }
    else if (id !== props.location.state.writer) {
        alert("권한이 없습니다.");
    }


    const handleInputTitle = (e) => {
        setTitle(e.target.value);
        //console.log(title);
    }

    const submit = () => {
        axios.put(`http://localhost:8000/api/board/modify/${index}`, {
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
    }

    return (
        <Wrapper>
            <h2>게시글 수정</h2>
            <TitleInput type='text' placeholder='제목' name='title' onChange={handleInputTitle} value={title} />
            <Editor
                previewStyle='vertical'
                plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
                initialValue={content}
                name='content'
                ref={editorRef}
                onChange={() => {
                    const data = editorRef.current.getInstance().getMarkdown();
                    setContent(data)
                }}
            />
            <Button className="post-write-btn" variant="primary" type='button' onClick={submit}  >
                수정
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

export default BoardModify;