import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import BoardWrite from './BoardWrite';

function BoardList() {

    const [list, setList] = useState([{
        idx: '',
        title: '',
        content: '',
        date: '',
        writer : ''
    }]);

    const writer = sessionStorage.id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/get')
            .then((response) => {
                setList(response.data.reverse());
            });
    }, [])

    return (
        <div>
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
                            list.map(rowData => (
                                console.log(rowData),
                                rowData.idx !== '' &&
                                // 최초 선언한 기본값은 나타내지 않음
                                <tr>
                                    <td>
                                        <Link to={`/board/view/${rowData.idx}`} index={rowData.idx} >{rowData.idx}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/board/view/${rowData.idx}`} index={rowData.idx}>{rowData.title}</Link>
                                    </td>
                                    <td>
                                        <Link>{rowData.date}</Link>
                                    </td>
                                    <td>
                                        <Link>{rowData.writer}</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Button className="post-write-btn" variant="primary" type='button'  >
                    <Link to={"/board/write"} className="link">글쓰기</Link>

                </Button>
            </Container >
        </div>


    )
}


export default BoardList;