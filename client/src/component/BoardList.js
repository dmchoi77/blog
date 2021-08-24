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
        currentPage: 1
    });

    //검색어 상태 관리
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/get')
            .then((response) => {
                let data = response.data.reverse();

                setList({
                    data,
                    pageSize: 10,
                    currentPage: 1,
                });

            });
    }, [])

    //페이징
    const handlePageChange = (page) => {
        setList({
            ...list,
            currentPage: page
        });
    }

    const { data, pageSize, currentPage } = list;
    const { length: count } = list.data;
    const pagedList = paginate(data, currentPage, pageSize);

    //게시글 제목 검색
    const onSearch = () => {

        if (search === "" || search.includes(" ")) { //공백이나 띄어쓰기를 검색할 경우
            alert("검색어를 입력하세요.");
            return;
        }

        setList({
            data: data.filter(word => word.title.includes(search)),
            pageSize: 10,
            currentPage: 1,
        });
    }

    //검색어 입력값 가져오기
    const handleInputTitle = (e) => {
        setSearch(e.target.value);
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
                    itemCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
                <Link to={"/board/newpost"} className="link">
                    <Button className="post-write-btn" variant="primary" type='button'  >
                        글쓰기
                    </Button>
                </Link>
                <Form >
                    <Row align="center" className="search-bar">
                        <Col sm={3} className="my-1">
                            <Form.Control id="inlineFormInputName" placeholder="Search" onChange={handleInputTitle}/>
                        </Col>
                        <Col xs={1} className="my-1">
                            <Link>
                                <Button type="button" onClick={onSearch}>검색</Button>
                            </Link>
                        </Col>
                    </Row>
                </Form>
            </Container >
        </div>
    )
}


export default BoardList;