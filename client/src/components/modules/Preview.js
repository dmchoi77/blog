/*eslint-disable*/

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Preview(props) {

    return (
        <Articles>
            {
                props.list.map(rowData => (
                    rowData.idx !== '' &&
                    <Link to={`/board/view/${rowData.idx}`} index={rowData.idx} >
                        <Article>
                            <Thunmbnail>
                                <img
                                    src="https://reactjs-kr.firebaseapp.com/logo-og.png"
                                    width='100%'
                                    height='100%'
                                    alt='thumbnail' />
                            </Thunmbnail>
                            <Title>{rowData.title}</Title>
                            <Date>{rowData.date}</Date>
                        </Article>
                    </Link>
                ))
            }
        </Articles>

    )
}

const Articles = styled.div`
    
    height: auto;
    background-color: #fff;
    display: grid;
    grid-auto-rows: 280px;
    justify-items: center;
    align-items: center;

    @media (min-width : 1400px) {
        grid-template-columns: repeat(4,1fr);
    }
    @media (max-width: 1399px){
        grid-template-columns: repeat(3,1fr);
    }

    @media (max-width : 976px){
        grid-template-columns: repeat(2,1fr);
    }

    @media (max-width : 753px){
        grid-template-columns: repeat(1,1fr);
    }
`

const Article = styled.div`

    width: 80%px;
    height: 200px;
    background-color: #fff;
    border: 1px solid #dae1e6;
    position: relative;

    @media (max:width: 1399px) {
        width: 100%;
    }

    @media (max-width : 977px){
        width: 100%;
    }
`

const Thunmbnail = styled.div`

    position: relative;
    width: 100%;
    height: 140px;
    overflow-y: hidden;
`

const Title = styled.div`

    font-size: .85rem;
    line-height: 1.2;
    height: 20px;
    padding: 2px 10px;
    margin: 5px 0;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
`
const content = styled.div`

    height: 50px;
    padding: 2px 10px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    line-height: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
`

const Date = styled.div`

    height: 20px;
    padding: 2px 10px;
    font-size: .65em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888;
`

export default Preview;