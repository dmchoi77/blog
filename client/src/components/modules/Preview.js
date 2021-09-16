/*eslint-disable*/

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MDEditor from "@uiw/react-md-editor"

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
                            <Content>
                                <MDEditor.Markdown source={rowData.content} />
                            </Content>
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

    width: 240px;
    height: 260px;
    background-color: #fff;
    border: 1px solid #dae1e6;
    position: relative;
`

const Thunmbnail = styled.div`

    position: relative;
    width: 100%;
    height: 140px;
    overflow-y: hidden;
`

const Title = styled.div`

    font-size: .95rem;
    height: 20px;
    padding: 2px 10px;
    margin: 5px 0;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
`
const Content = styled.div`
   
    height:42px;
    padding: 2px 10px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    line-height: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    div,
    span,
    object,
    iframe,
    figure,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    code,
    em,
    img,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    b,
    u,
    i,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    main,
    canvas,
    embed,
    footer,
    header,
    nav,
    section,
    video {
      font-size: 0.75rem !important;
      font-weight: normal !important;
      margin: 0 !important;
      padding: 0 !important;
      padding-right: 1px !important;
      border: 0 !important;
      display: inline !important;
      word-break: break-all !important;
    }
    img,
    hr,
    br,
    pre,
    code {
      display: none !important;
    }

`

const Date = styled.div`

    height: 20px;
    padding: 20px 10px;
    font-size: .65em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888;
`

export default Preview;