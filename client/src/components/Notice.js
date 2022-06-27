import React from "react";
import styled from "styled-components";

function Notice() {
  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <h3>
          <a href="https://dmchoi77.github.io/">블로그가 이전되었습니다.</a>
        </h3>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 80px;

  @media (max-width: 691px) {
    font-size: 10px;
  }
`;

export default Notice;
