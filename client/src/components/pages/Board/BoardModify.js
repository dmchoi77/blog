/*eslint-disable*/

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
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

function BoardModify(props) {

    const user = useSelector(state => state.user)
    const history = useHistory();
    const editTitle = useRef();
    const editContent = useRef();
    const writer = user.length > 0 ? user.userData.name : null;
    const [index, setIndex] = useState(props.location.state.index);
    const [title, setTitle] = useState(props.location.state.title);
    const [content, setContent] = useState(props.location.state.content);

    const handleInputTitle = () => {
        const data = editTitle.current.value;
        setTitle(data);
        //console.log(title);
    }

    const submit = () => {
        
        if (title !== "" && content !== "") {

            axios.put(`/api/articles/${index}`, {
                title: title,
                content: content,
                index: index
            }).then((res) => {
                if (res.data.success) history.push("/board/list");
            })
        }

        else alert("내용을 입력하세요.");
    }

    const uploadImage = async (blob) => {

        let formData = new FormData();

        formData.append('image', blob);
        const result = await axios.post('/api/images', formData, {
            data: formData,
            headers: { 'Content-type': 'multipart/form-data' }
        });
        //console.log(result);

        return result.data;
    };

    return (
        <Container>
            <h2>게시글 수정</h2>
            <TitleInput type='text' placeholder='제목' name='title' ref={editTitle} onChange={handleInputTitle} value={title} />
            <Editor
                previewStyle='vertical'
                height='400px'
                plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
                initialValue={content}
                name='content'
                ref={editContent}
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
                    const data = editContent.current.getInstance().getMarkdown();
                    setContent(data)
                }}
            />
            <Button className="post-write-btn" variant="primary" type='button' onClick={submit}  >
                수정
            </Button>
        </Container>
    )
}

const Container = styled.div`
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