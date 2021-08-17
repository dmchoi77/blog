import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

function View(props) {
    const [index, setIndex] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');

    const { params } = props.match;
    const idx = params.data;
    const history = useHistory();

    useEffect(async () => {
        try {//데이터를 호출하는 동안 대기할 수 있도록 async, await 사용
            const res = await axios.get('http://localhost:8000/api/view', {
                params: {
                    'idx': idx
                }
            })
            setIndex(res.data[0].idx);
            setTitle(res.data[0].title);
            setContent(res.data[0].content);
            setDate(res.data[0].date);

        } catch (e) {
            console.error(e.message);
        }
    }, [])

    return (
        <>
            <h2 align="center">게시글 상세정보</h2>

            <div className="post-view-wrapper">
                {
                    <>
                        <div className="post-view-row">
                            <label>게시글 번호</label>
                            <label>{index}</label>
                        </div>
                        <div className="post-view-row">
                            <label>제목</label>
                            <label>{title}</label>
                        </div>
                        <div className="post-view-row">
                            <label>작성일</label>
                            <label>{date}</label>
                        </div>
                        <div className="post-view-row">
                            <label>내용</label>
                            <div>
                                {ReactHtmlParser(content)}
                            </div>
                        </div>
                    </>
                }
                <button className="post-view-go-list-btn" onClick={() => history.goBack()}>목록으로 돌아가기</button>
            </div>
        </>
    )
}

export default View;