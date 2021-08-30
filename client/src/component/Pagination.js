/*eslint-disable*/

import React from 'react';
import _ from 'lodash';

function Pagination(props) {
    const { itemCount, pageSize, currentPage, onPageChange } = props; // 각각 글 개수, 한 페이지에 보여줄 글 개수

    const pageCount = Math.ceil(itemCount / pageSize); //몇 개의 페이지가 필요한지 계산

    if (pageCount === 1) return null;

    const pages = _.range(1, pageCount + 1); //http://_.com/docs/#range 참고
    // console.log(pages);
    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => (
                    <li
                        key={page}
                        className={page === currentPage ? "page-item active" : "page-item"} // Bootstrap을 이용하여 현재 페이지를 시각적으로 표시
                        style={{ cursor: "pointer" }}>
                        <a className="page-link" onClick={() => onPageChange(page)}>{page}</a> {/* 페이지 번호 클릭 이벤트 처리기 지정 */}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;

//페이지 별로 리스트 보여주기
export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize; //자를 배열의 시작점

    return _(items)
        .slice(startIndex) //시작점부터 배열을 자르는데
        .take(pageSize) //pageSize만큼 배열을 취함
        .value(); //_ wrapper 객체를 regular 배열로 변환
}