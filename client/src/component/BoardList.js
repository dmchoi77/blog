import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Container, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { paginate } from './Pagination';

function BoardList() {

    const [list, setList] = useState({
        data: [{
            idx: '',
            title: '',
            content: '',
            date: '',
            writer: ''
        }],
        pageSize: 10, //한 페이지에 글목록 10개
        currentPage: 1,
        searchKeyword: ''
    });

    //검색어 상태 관리
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        try {           
            const result = await axios.get('http://localhost:8000/api/get')
            let data = result.data.reverse();
            setList({
                data,
                pageSize: 10,
                currentPage: 1,
                searchKeyword: ''
            });
        }
        catch {
        }
    }

    useEffect(() => {
        fetchData();
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
        <div className="body">
            <Container className="list-wrapper">
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>글번호</th>
                            <th>제목</th>
                            <th>작성일</th>
                            <th>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pagedList.map(rowData => (
                                rowData.idx !== '' &&
                                // 최초 선언한 기본값은 나타내지 않음
                                <tr key={rowData.idx}>
                                    <td>
                                        <Link to={`/board/view/${rowData.idx}`} index={rowData.idx} >{rowData.idx}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/board/view/${rowData.idx}`} index={rowData.idx}>{rowData.title}</Link>
                                    </td>
                                    <td>
                                        {rowData.date}
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
                <Link to={"/board/newpost"} className="link">
                    <Button className="post-write-btn" variant="primary" type='button'  >
                        글쓰기
                    </Button>
                </Link>
                <Form onSubmit={handleSubmit}>
                    <Row align="center" className="search-bar">
                        <Col sm={3} className="my-1">
                            <Form.Control id="inlineFormInputName" placeholder="Search" value={search} onChange={handleInputTitle}
                            />
                        </Col>
                        <Col xs={1} className="my-1">
                            <Button type="button" onClick={onSearch}>검색</Button>
                        </Col>
                    </Row>
                </Form>
            </Container >
        </div>
    )
}


export default BoardList;