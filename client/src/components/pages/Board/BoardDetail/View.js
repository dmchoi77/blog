/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import MDEditor from "@uiw/react-md-editor"
import { useSelector } from 'react-redux';
import Comment from './Sections/Comment'


function View(props) {

    const user = useSelector(state => state.user);
    const [post, setPost] = useState([])
    const { title, content, date, writer, index, view, _id } = post;
    const [comments, setComments] = useState([])
    const idx = props.match.params.data
    const history = useHistory();

    useEffect(() => {
        
        axios.get('http://localhost:8000/api/view', {
            params: {
                'idx': idx,
            }
        }).then(res => {
            setPost(res.data[0])
            axios.put('http://localhost:8000/api/view', { //조회수 증가
                index: res.data[0].index
            })

            axios.get('http://localhost:8000/api/comment/getComment', {
                params: {
                    'idx': idx,
                }
            }).then(res => {
                if (res.data.success) {
                    setComments(res.data.comments)
                } else {
                    // alert("댓글 정보를 가져오는 것에 실패했습니다.")
                }
            })
        })
    }, [])

    const refreshFunction = (variables) => {

        if (typeof (variables) === 'object') { //댓글 등록 시
            setComments(comments.concat(variables))
        }

        else { //댓글 삭제 시
            setComments(comments => comments.filter(comment => comment._id !== variables))
        }
    }

    const onDelete = (e) => {
        if (user.userData.role) {
            axios.delete(`http://localhost:8000/api/board/${index}`, {
                data: {
                    idx: idx
                }
            }).then((res) => {
                alert("삭제되었습니다.");
                history.push("/board/list");
            })
        }
        else {
            alert("삭제 권한이 없습니다.");
            e.preventDefault();
        }
    }

    return (
        <Container>
            <hr className="view-hr" />
            <div>
                <h1>{title}</h1>
            </div>
            <hr />
            <div>
                <label>작성자 : {writer} <DateBefore /> {date} <DateBefore /> 조회수 : {view} </label>
            </div>
            <hr />
            <div>
                <div>
                    <MDEditor.Markdown source={content} />
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
                    index: idx,
                    title: title,
                    content: content
                }
            }} className="link">
                <Button className="post-view-go-modify-btn" variant="primary" type='button'>
                    수정
                </Button>
            </Link>
            <Button className="post-view-go-modify-btn" variant="primary" type='button' onClick={onDelete}>
                삭제
            </Button>
            <hr />
            <Comment idx={idx} commentList={comments} refreshFunction={refreshFunction} />
        </Container>

    )
}


const Container = styled.div`
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