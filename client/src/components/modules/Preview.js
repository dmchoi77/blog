/*eslint-disable*/

import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MDEditor from "@uiw/react-md-editor"

function Preview(props) {

    const history = useHistory();

    return (
        <Articles>
            {
                props.list.map((rowData, i) => (
                    rowData.idx !== '' &&
                    <Article onClick={() => history.push(`/board/view/${rowData.index}`)} key={i}>
                        <Thunmbnail>
                            <img
                                src={rowData.url ? rowData.url : `https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png`}
                                width='100%'
                                height='100%'
                                alt='thumbnail' />
                        </Thunmbnail>
                        <Title>
                            {rowData.title}
                        </Title>
                        <Content>
                            <MDEditor.Markdown source={rowData.content} />
                        </Content>
                        <Date>
                            {rowData.date}
                        </Date>
                    </Article>
                ))
            }
        </Articles >

    )
}

const Articles = styled.div`
    height: auto;
    background-color: #fff;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(3,1fr);
    align-items: center;  

    @media(max-width : 987px) {
        grid-template-columns: repeat(2,2fr);
    }

    @media(max-width : 691px) {
        width : 100%;
        grid-template-columns: repeat(1,2fr);
        margin-top : 1rem;
    }
  
`

const Article = styled.div`
    margin-top : 2rem;
    width: 300px;
    background-color: #fff;
    border: 1px solid #dae1e6;
    position: relative;
    cursor: pointer;
    transition: 0.5s all;
    border-radius : 10px;
    border : none;
    box-shadow: 0 2px 16px 0 rgb(0 0 0 / 5%);

    &:hover {
      background-color: rgba($bg-color-dark-0, 0.1);
      transform: translateY(-20px);
    }

    @media(max-width : 987px) {
        width : 90%;
        margin ; 0.5rem 0 1.5rem 0;
    }

    @media(max-width : 691px) {
        width : 100%;
    }
`

const Thunmbnail = styled.div`
    position: relative;
    height: 300px;
    overflow-y: hidden;
    border-radius : 10px 10px 0 0;
    border : none;

`

const Title = styled.div`

    font-size: 1.5rem;
    height: 45px;
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