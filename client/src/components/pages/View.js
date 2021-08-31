/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Reply from '../modules/Reply';

function View(props) {
    const [data, setData] = useState({
        title: '',
        content: '',
        date: '',
        writer: '',
        index: ''
    })

    const { title, content, date, writer, index } = data;

    const { params } = props.match;
    const id = sessionStorage.id;
    const idx = params.data;
    const history = useHistory();

    useEffect(() => {
        let isComponentMounted = true;
        axios.get('http://localhost:8000/api/view', {
            params: {
                'idx': idx
            }
        }).then(res => {
            if (isComponentMounted) {
                setData({

                    title: res.data[0].title,
                    content: res.data[0].content,
                    date: res.data[0].date,
                    writer: res.data[0].writer,
                    index: res.data[0].idx
                })
            }
        })
        return () => {
            isComponentMounted = false;
        }
    }, [])

    const onModify = (e) => {
        if (id !== writer) {
            alert("수정 권한이 없습니다.");
            e.preventDefault();
        }
    }

    const onDelete = (e) => {
        if (data.writer !== sessionStorage.id) {
            alert("삭제 권한이 없습니다.");
            e.preventDefault();
        }
        else {
            axios.post('http://localhost:8000/api/delete', {
                title: title,
                content: content,
                idx: index
            }).then((res) => {
                // alert("삭제되었습니다.");
                history.push("/board/list");
            })
        }
    }

    return (
        <div className="body">

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
                    <Link to={{
                        pathname: `/board/modify/${idx}`,
                        state: {
                            writer: writer, //BoardModify로 props 전달
                            index: index,
                            title: title,
                            content: content
                        }
                    }} className="link">
                        <Button className="post-view-go-modify-btn" variant="primary" type='button' onClick={onModify}>
                            수정
                        </Button>
                    </Link>
                    <Button className="post-view-go-modify-btn" variant="primary" type='button' onClick={onDelete}>
                        삭제
                    </Button>
                </div>
                <Reply index={idx} />
            </div>
        </div >

    )
}

export default View;