import React, { useState, useEffect } from 'react';
import { useHistory, Link, Switch, Route } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import BoardList from './BoardList';
import BoardModify from './BoardModify';
import Reply from './Reply';

function View(props) {
    const [index, setIndex] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [writer, setWriter] = useState('');

    const { params } = props.match;
    const id = sessionStorage.id;
    const idx = params.data;
    const history = useHistory();

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

    const onModify = (e) => {
        if (id !== writer) {
            alert("수정 권한이 없습니다.");
            e.preventDefault();
        }
        else {
            sessionStorage.setItem('title', title);
            sessionStorage.setItem('content', content);
            sessionStorage.setItem('idx', idx);
            sessionStorage.setItem('writer', writer);
        }
    }

    const onDelete = (e) => {
        if (writer !== sessionStorage.id) {
            alert("삭제 권한이 없습니다.");
            e.preventDefault();
        }
        else {
            axios.post('http://localhost:8000/api/delete', {
                title: title,
                content: content,
                idx: idx
            }).then((res) => {
                // alert("삭제되었습니다.");
            })
        }
    }


    return (
        <div className="body">
            <Switch>
                <>
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
                            <Link to={`/board/modify/${idx}`} className="link">
                                <Button className="post-view-go-modify-btn" variant="primary" type='button' onClick={onModify}>
                                    수정
                            </Button>
                            </Link>
                            <Link to={"/board/list"} className="link">
                                <Button className="post-view-go-modify-btn" variant="primary" type='button' onClick={onDelete}>
                                    삭제
                            </Button>
                            </Link>
                        </div>
                        <Reply></Reply>
                    </div>
                    <Route exact path="/board/modify/:data" component={BoardModify} />
                    <Route exact path="/board/list" component={BoardList} />
                </>
            </Switch>
        </div>

    )
}

export default View;