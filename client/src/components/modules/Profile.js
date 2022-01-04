import React from "react";
import styled from "styled-components";

function Profile() {
  return (
    <Container>
      <ProfileImage src="/img/github.png" alt="profile" />
      <div style={{ textAlign: "center" }}>
        <div>
          <h2>dmchoi</h2>
        </div>
        <div>안녕하세요. 반갑습니다</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 3rem;

  @media (max-width: 691px) {
    font-size: 10px;

    h2 {
      font-size: 20px;
    }
  }
`;

const ProfileImage = styled.img`
  margin-top: 20px;
  height: 150px;
  width: 150px;
  border-radius: 50%;

  @media (max-width: 691px) {
    height: 100px;
    width: 100px;
  }
`;

export default Profile;
