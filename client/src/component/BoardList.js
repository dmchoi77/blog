import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function BoardList() {

    const [list, setList] = useState([{
        idx: '',
        title: '',
        content: '',
        date: '',
    }]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/get')
            .then((response) => {
                setList(response.data.reverse());
            });
    }, [])

    return (
        <div>
        <Container>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(rowData => (
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
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container >

        </div>


    )
}


export default BoardList;