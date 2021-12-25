import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../actions/user_action";

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = () => {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        localStorage.removeItem("x_auth");
        window.location.reload();
      } else {
        alert("Failed to log out");
      }
    });
  };

  const onLogin = () => {
    history.push("/login");
  };

  const onSearch = () => {
    history.push("/search");
  };

  return (
    <Container>
      <Nav>
        <div>
          <Link to={"/"}>dmchoi</Link>
        </div>
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "revert",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <li>
            <img
              src="/img/search.png"
              alt="search-buton"
              style={{ width: "25px", height: "25px" }}
              onClick={onSearch}
            />
          </li>
          {!user.userData.isAuth ? (
            <li
              style={{
                background: "#e05194",
                borderRadius: "100px",
                padding: "4px 15px",
                color: "#ffff",
              }}
              onClick={onLogin}
            >
              로그인
            </li>
          ) : (
            <li
              style={{
                background: "#e05194",
                borderRadius: "100px",
                padding: "4px 15px",
                color: "#ffff",
              }}
              onClick={onLogout}
            >
              로그아웃
            </li>
          )}
        </ul>
      </Nav>
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
  height: 62px;
  background-color: #ffff;
  position: fixed;
  z-index: 999;
  box-shadow: 0px 0px 4px grey;
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  width: 1000px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

// const HeaderToggle = styled.div`
//     position : fixed;
//     z-index : 1001;
//     left : -5px;
// `

// const Button = styled.img`

//     @media(min-width : 812px) {
//         display : none;
//     }

//     @media(max-width : 811px){
//         width : 19px;
//         height : 19px;
//         position : absolute;
//         top : -8px;
//         left : 15px;
//         border : none;
//         background : none;
//         z-index : 1000;
//     }
// `

export default Header;
