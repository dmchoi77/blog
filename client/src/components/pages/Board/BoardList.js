import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Button, Table, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Pagination from '../../modules/Pagination';
import { paginate } from '../../modules/Pagination';

function BoardList(props) {

    const user = useSelector(state => state.user)

    const [list, setList] = useState({
        data: {
            index: '',
            title: '',
            content: '',
            date: '',
            writer: '',
            view: ''
        },
        pageSize: 10, //한 페이지에 글목록 10개
        currentPage: 1,
        searchKeyword: ''
    });

    //검색어 상태 관리
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('http://15.164.220.78:8000/api/articles')
            .then((response) => {
                let data = response.data.reverse();
                setList({
                    data,
                    pageSize: 10,
                    currentPage: 1,
                    searchKeyword: ''
                });
            })
    }, [])

    //페이징
    const handlePageChange = (page) => {
        setList({
            ...list,
            currentPage: page
        });
    }

    const { data, pageSize, currentPage, searchKeyword } = list;
    const { length: count } = list.data;

    const pagedList = paginate(searchKeyword ? searchKeyword : data, currentPage, pageSize);

    //게시글 제목 검색
    const onSearch = () => {

        const filtered = data.filter(word => word.title.includes(search));

        if (search === "") { //공백을 검색할 경우
            alert("검색어를 입력하세요.");
        }
        else if (filtered.length === 0) { //검색 결과가 없을 경우
            alert("검색결과가 없습니다.");
        }
        else {
            setList({
                ...list,
                searchKeyword: filtered
            })
        }
        setSearch("");
    }

    //검색어 입력값 가져오기
    const handleInputTitle = (e) => {
        setSearch(e.target.value);
    }
    //form에서 엔터 시 새로고침 막음
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Container>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>조회수</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pagedList.map(rowData => (
                            rowData.idx !== '' &&
                            // 최초 선언한 기본값은 나타내지 않음
                            <tr key={rowData.index}>
                                <td>
                                    <Link to={`/board/view/${rowData.index}`} index={rowData.index} >{rowData.index}</Link>
                                </td>
                                <td>
                                    <Link to={`/board/view/${rowData.index}`} index={rowData.index}>{rowData.title}</Link>
                                </td>
                                <td>
                                    {rowData.date}
                                </td>
                                <td>
                                    {rowData.view}
                                </td>
                                <td>
                                    {rowData.writer}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Pagination
                itemCount={searchKeyword.length ? searchKeyword.length : count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            <Button className="post-write-btn" variant="primary" type='button'
                onClick={() => {
                    if (user.userData.isAdmin) {
                        props.history.push('/board/newpost')
                    }
                    else {
                        alert('글쓰기 권한이 없습니다.')
                    }
                    return
                }}>
                글쓰기
            </Button>
            <Form onSubmit={handleSubmit}>
                <Row align="center" className="search-bar">
                    <Form.Control id="inlineFormInputName" placeholder="Search" value={search} onChange={handleInputTitle}
                    />
                    <Search src="/img/search.png" onClick={onSearch} />
                </Row>
            </Form>
        </Container >
    )
}

const Container = styled.div`
    padding : 4rem 0 0 0;
    margin : 0 auto 4rem;
    width : 100%;
    min-height: 100%;
`

const Search = styled.img`
    width : 38px;
    height : 38px;
    padding : 5px;
`

export default BoardList;