# 프로젝트 소개
리액트 기반의 나만의 블로그 구축

http://15.164.220.78/

## 주요 서비스
* 게시글 작성, 수정, 삭제, 검색, 조회수
* 댓글 작성 및 삭제 기능
* 로그인, 로그아웃
* 방명록


## 목표
* React Hooks의 생명 주기(Life cycle)에 대해 이해한다.
* React-Router를 이용하여 SPA와 동적 라우팅 기능에 대해 이해한다. 
* Server와 DB를 연동해 통신을 해본다.
* CRUD를 구현해본다.


## 활용 기술
* JavaScript
* React / Hooks
* Node.js / Express
* MongoDB
* AWS S3,EC2
* Styled-components
* Bootstrap


## 기능 및 UI
(아래 이미지들은 버전1의 이미지이므로 현재와 다를 수 있습니다.)
### 1. 로그인 

![Hnet com-image (1)](https://user-images.githubusercontent.com/76215166/134780138-9fb1c129-116d-4fd4-91a5-94b294e9e313.gif)

* Redux, JWT, localStorage를 이용하여 사용자 인증 및 로그인 기능 구현

### 2. 회원가입

![Hnet-image](https://user-images.githubusercontent.com/76215166/134780381-ee633cff-b08d-4ed3-9c48-20b5f30e53be.gif)

* 비밀번호 체크
* 중복 아이디 체크
* crypt를 이용해 비밀번호 암호화하여 db에 저장 

### 3. 로그아웃

![Hnet com-image (3)](https://user-images.githubusercontent.com/76215166/134780523-a348809c-748f-448e-9074-dd03391b77d4.gif)

* 로그아웃하면 저장되어 있는 JWT와 localStorage 정보 제거


### 4.메인화면


![Hnet-image](https://user-images.githubusercontent.com/76215166/134780599-a32e0c9e-b1bc-4a3e-bb35-ac038eee337f.gif)

* 전체글 조회 및 썸네일
* 방명록 기능 - github 댓글 앱 utterances를 적용

### 5. 게시글 작성, 수정, 조회

![Hnet-image (2)](https://user-images.githubusercontent.com/76215166/134780990-d5e3da43-663a-436e-b8e4-29a29f9ba560.gif)

* Text Editor로 Toast ui editor를 이용

### 6. 게시글 삭제

![Hnet com-image](https://user-images.githubusercontent.com/76215166/134781127-276acece-d8fd-4ae3-849a-d764d6ad79c7.gif)

### 7. 게시글 검색

![Hnet com-image (1)](https://user-images.githubusercontent.com/76215166/134781197-85423890-19dd-4bf7-9030-65321171f62e.gif)

### 8. 페이징

![Hnet-image (3)](https://user-images.githubusercontent.com/76215166/134781352-7dfd189c-aecc-46f1-94b2-8b3bd385a31b.gif)

* 페이지당 10개의 글이 조회되도록 구현


### 9. 댓글 기능

![Hnet-image (4)](https://user-images.githubusercontent.com/76215166/134781555-e90b7de9-5de7-46cc-ba83-2d587d2c808a.gif)

* 댓글 등록 및 삭제 기능 구현

### 10. 조회수 기능

![Hnet com-image (3)](https://user-images.githubusercontent.com/76215166/134781639-c5574668-270f-4b77-8ca0-20561f2e56fb.gif)


### 11. 반응형 

![Hnet-image](https://user-images.githubusercontent.com/76215166/134816302-a0ca3c1e-df44-4fc2-8798-c9858bac0ba8.gif)


## 관련 포스팅

https://dmchoi.tistory.com/130
