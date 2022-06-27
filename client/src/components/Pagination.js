import React from "react";
import _ from "lodash";
import styled from "styled-components";

function Pagination({ itemCount, pageSize, currentPage, onPageChange }) {
  const pageCount = Math.ceil(itemCount / pageSize); // 몇 개의 페이지가 필요한지 계산

  if (pageCount === 1) return null;
  //   console.log(pageCount); // ex) 2
  const pages = _.range(1, pageCount + 1);
  //   console.log(pages); // [1,2]

  return (
    <Paging>
      {pages.map((page) => (
        <li
          key={page}
          className={page === currentPage ? "page-item active" : "page-item"} // Bootstrap을 이용하여 현재 페이지를 시각적으로 표시
          style={{ cursor: "pointer" }}
        >
          <div className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </div>
        </li>
      ))}
    </Paging>
  );
}

export default Pagination;

// 페이지 별로 포스팅 보여주기
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; //자를 배열의 시작점

  return _(items)
    .slice(startIndex) //시작점부터 배열을 자르는데
    .take(pageSize) //pageSize만큼 배열을 취함
    .value(); // lodash wrapper 객체를 regular 배열로 변환
}

const Paging = styled.ul`
  display: flex;
  padding-left: 0;
  list-style: none;
  justify-content: center;

  .page-item.active > .page-link {
    color: #ffff;
    background-color: #e05194;
    border-color: #e05194;
  }
  .page-link {
    color: black;
  }
`;
