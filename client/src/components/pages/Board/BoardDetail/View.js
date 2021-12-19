/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import MDEditor from "@uiw/react-md-editor"
import { useSelector } from 'react-redux';
import Comment from './Sections/Comment'
import SEO from '../../../modules/SEO';

function View(props) {

    const user = useSelector(state => state.user);
    const [post, setPost] = useState([])
    const { title, content, date, writer, index, url } = post;
    const [comments, setComments] = useState([])
    const idx = props.match.params.data
    const history = useHistory();

    useEffect(() => {

        axios.get(`http://15.164.220.78:8000/api/articles/${idx}`, {
            params: {
                'idx': idx,
            }
        }).then(res => {
            setPost(res.data[0])
            axios.put(`http://15.164.220.78:8000/api/articles/views/${idx}`, { //조회수 증가
                index: res.data[0].index
            })

            axios.get('http://15.164.220.78:8000/api/comments', {
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
            setComments(comments =>
                comments.filter(comment => comment._id !== variables && comment.responseTo !== variables))
        }
    }

    const onDelete = (e) => {
        if (user.userData.isAdmin) {
            axios.delete(`http://15.164.220.78:8000/api/articles/${index}`, {
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
            <SEO
                title={title}
                description={content}
                url={`board/view/${index}`}
            />
            <div style={{ margin: "0 auto", width: "95%" }}>
                <h1 style={{ fontSize: "2.3rem", marginBottom: "30px", fontWeight: "900" }}>{title}</h1>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "bold" }}>{writer}</div>
                    <DateBefore />
                    <div>
                        {date}
                    </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <img src={url} style={{ width: "100%" }} />
                </div>
            </div>
            <div>
            </div>

            <hr />
            <div>
                <div>
                    <MDEditor.Markdown source={content} />
                </div>
            </div>
            <hr />
            {/* <Button className="post-view-go-list-btn" variant="primary" type='button' onClick={() => history.push('/board/list')} >
                전체글
            </Button> */}
            {
                user.userData.isAdmin &&
                <>
                    <hr />
                    <Button className="post-view-go-modify-btn" variant="primary" type='button'
                        onClick={() => {
                            if (user.userData.isAdmin) {
                                history.push({
                                    pathname: `/board/modify/${index}`,
                                    state: {
                                        writer: writer, //BoardModify로 props 전달
                                        index: idx,
                                        title: title,
                                        content: content
                                    }
                                })
                            }
                            else {
                                alert('글쓰기 권한이 없습니다.')
                            }
                        }}>
                        수정
            </Button>
                    <Button className="post-view-go-modify-btn" variant="primary" type='button' onClick={onDelete}>
                        삭제
            </Button>
                </>
            }

            <div>
                <h5 style={{ fontWeight: 700, marginBottom: "30px" }}>
                    총 {comments.length} 개의 댓글이 있습니다.
                </h5>
                <Comment idx={idx} commentList={comments} refreshFunction={refreshFunction} />

            </div>
        </Container >

    )
}


const Container = styled.div`
    padding : 3rem 1.5rem 0;
    margin : 0 auto 7rem;
    min-height: 100%;
    width : 768px;


    @media(max-width : 987px) {
      width : 100%;
    }
`

const DateBefore = styled.span`
    content: "";
    display: inline-block;
    width: 0.1rem;
    height: 1rem;
    background: #ccc;
    margin: 0 10px 0 6px;
    vertical-align: -2px;
`

export default View;