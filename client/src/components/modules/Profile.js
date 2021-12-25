import React from "react";
import styled from "styled-components";

function Profile() {
  return (
    <Container>
      <div>
        <img
          src="/img/github.png"
          alt="profile"
          style={{
            height: "10rem",
            width: "10rem",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <div>
          <h2>dmchoi</h2>
        </div>
        <div>자기소개 - front-end developer</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 3rem;
`;

export default Profile;
