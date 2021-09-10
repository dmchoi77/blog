/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
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
        <Wrapper>
            <hr />
            <div>
                <h2>{title}</h2>
            </div>
            <hr />
            <div>
                <label>작성자 : {writer} <DateBefore />{date}</label>
            </div>
            <hr />
            <div>
                <div>
                    {ReactHtmlParser(content)}
                </div>
            </div>
            <hr />
            <Button className="post-view-go-list-btn" variant="primary" type='button' onClick={() => history.push('/board/list')} >
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
            <Reply index={idx} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding : 30px 0 0 0;
    margin : 0 auto 7rem;
    width : 100%;
    min-height: 100%;
`

const DateBefore = styled.span`
    content: "";
    display: inline-block;
    width: 0.1rem;
    height: 0.8rem;
    background: #ccc;
    margin: 0 10px 0 6px;
    vertical-align: -2px;
`
export default View;