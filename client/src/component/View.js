import React, { useState, useEffect } from 'react';
import { useHistory, Link, Switch } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import BoardModify from './BoardModify';


function View(props) {
    const [index, setIndex] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');

    const [babo, setBabo] = useState(false);

    const { params } = props.match;
    const idx = params.data;
    const history = useHistory();
    const writer = sessionStorage.id;

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

    const onModify=()=>{
        sessionStorage.setItem('title', title); 
        sessionStorage.setItem('content', content); 
        sessionStorage.setItem('idx', idx);
    }


    return (
        <Switch>
            <div className="post-view-wrapper">
                <hr />
                <div>
                    <div className="post-view-row">
                        <h2>{title}</h2>
                    </div>
                    <hr />
                    <div className="post-view-row">
                        <label>작성자 : {writer} <span className="date-before"> </span>{date}</label>
                    </div>
                    <hr />
                    <div className="post-view-row">
                        <div>
                            {ReactHtmlParser(content)}
                        </div>
                    </div>
                    <hr />
                    <Button className="post-view-go-list-btn" variant="primary" type='button' onClick={() => history.goBack()} >
                        전체글
                </Button>
                    <Button className="post-view-go-modify-btn" variant="primary" type='button' onClick = {onModify}>
                        <Link to={`/board/modify/${idx}`} className="link">수정</Link>
                    </Button>
                </div>
            </div>

            <BoardModify></BoardModify>
        </Switch>
    )
}

export default View;