import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function BoardModify(props) {

    const [index, setIndex] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [writer, setWriter] = useState('');
    
    const { params } = props.match;
    const idx = params.data;
    const history = useHistory();
    const id = sessionStorage.id;

    const handleInputTitle = (e) => {
        setTitle(e.target.value);
        //console.log(title);
    }

    useEffect(async () => {
        let isComponentMounted = true;
        try {//데이터를 호출하는 동안 대기할 수 있도록 async, await 사용
            const res = await axios.get('http://localhost:8000/api/view', {
                params: {
                    'idx': idx
                }
            })
            if (isComponentMounted) {
                setIndex(res.data[0].idx);
                setTitle(res.data[0].title);
                setContent(res.data[0].content);
                setDate(res.data[0].date);
                setWriter(res.data[0].writer);
            }
        } catch (e) {
            console.error(e.message);
        }
        return () => {
            isComponentMounted = false;
        }
    }, [])



    const submit = () => {
        axios.post('http://localhost:8000/api/modify', {
            title: title,
            content: content,
            idx: idx
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
                        // console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        // console.log('Focus.', editor);
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