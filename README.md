## 프로젝트 소개
### 개인 블로그를 직접 만들어보자

평소에 공부한 개발 지식들을 정리하고 그것들을 이용해 무언가를 만들고 싶었는데, 이 두 가지를 만족하는건 내 블로그를 직접 만들어 보는것이라 생각해 시작하게 된 프로젝트


## 사용 기술
* React, Redux, Styled-components, Node.js, MongoDB, AWS EC2

## 주요 업무 및 기능

* ## React와 Express, MongoDB 연동 및 CRUD 구현
    
    프로젝트 구조
    
    ![프로젝트구조](https://user-images.githubusercontent.com/76215166/167134762-4bd22dcf-1f70-46e3-b525-7503a2fa8fa9.jpg)
    
    ### 왜 DB로 MongoDB를 선택했는가?

    데이터베이스를 처음부터 MongoDB를 사용했던 것은 아니었다. 학부 수업 때 다뤄본 경험이 있는 MySQL을 사용하려 했었고, 
    Heroku로 배포를 계획하고 있어서, Heroku에서 지원하는 MySQL 서비스인 ClearDB를 사용했다.
    
    그런데 로컬 환경에서와는 다르게 쿼리 처리시간이 오래 걸렸다.(DB에서 처리 속도가 느리니 클라이언트에서도 데이터 fetching도 오래 걸리게 되고..)

    그러다가 MongoDB가 눈에 들어왔다. MongoDB에 대해 들어본 적은 있지만 사용해 본 적은 없었는데 
    이번 기회에 MongoDB도 한 번 다뤄보고 싶어 DB를 교체하는 작업을 했다.

    ### DB 교체 작업 후

    MongoDB(Atlas)로 교체 작업 후, 기존의 속도 문제를 해결했다.
    
    짧은 시간이지만 사용하면서 느낀점은 SQL보다 데이터를 유연하게 다룰수 있어서 편했고, CRUD 문법이 직관적이어서 좋았다.

<br>

* ## 포스팅을 위한 에디터로 TOAST UI EDITOR 라이브러리 사용

    ### TOAST UI EDITOR
 
    블로그에는 텍스트만 올리는게 아니라 폰트 사이즈, 굵기, 정렬과 같은 기능들도 필요하고 심지어 이미지 업로드도 가능해야 했다.  
  
    아무것도 모르는 상황에서 일단 React Text Editor, JavaScript Editor 등의 키워드를 검색했다.
  
    그 결과, 텍스트 에디터와 관련해서 여러가지 자바스크립트 라이브러리들이 존재한다는 것을 알 수 있었고, 이를 활용하기로 했다.
  
    그중에서도 마크다운을 기반으로 하고 현재 작성 중인 글을 바로 미리보기할 수 있는 기능이 있는 TOAST UI EDITOR가 눈에 들어와 사용해보기로 했다.(UI도 마음에 들었다..!)

    ### Toast UI EDITOR (https://ui.toast.com/tui-editor)

    <br>
  
    ### 어떤 문제가 발생했고 어떻게 해결했는가?

    라이브러리 적용 후, 이미지를 업로드 하고 포스팅을 저장하려 했으나 실패했다.

    원인은 해당 라이브러리는 이미지를 업로드하면 base64로 인코딩 되는데, 이 엄청난 길이의 base64 코드가 연동해 놓은 DB 테이블에 저장되지 않았기 때문이었다.

    그래서 이번에는 base64 코드를 어떻게 관리해야할지에 대해 고민하게 되었다.

    이후, DB에서는 포스팅의 텍스트만 관리하고 이미지들은 따로 관리할 수 있도록 클라우드 스토리지인 AWS S3를 사용하기로 했다.

    에디터가 제공하는 hooks 옵션의 addImageBlobHook을 사용해 이미지를 S3으로 전송해 저장 및 관리하도록 하고 url을 반환 받아서 이미지를 사용하는 방법으로 해당 문제를 해결할 수 있었다.

<br>
  
*  ## Redux를 이용하여 사용자 로그인 상태 관리(with JWT, LocalStorage)


    ### Redux 

    어플리케이션에서 로그인을 하게 되면 모든 페이지에서 사용자 정보를 유지해야한다.
  
    전역으로 상태 관리가 필요하게 되었고, 관련 라이브러리 중에 가장 많이 사용한다는 Redux를 사용해보기로 했다. 
    
    ### 어떤 문제가 발생했고 어떻게 해결했는가?

    Redux를 사용해도 페이지를 새로고침 하게 되면 store가 초기화 되어 결국 로그인이 풀리게 되는 현상을 발생하는 것을 발견했다.
    
    이를 해결하기 위해 로그인 처리 방법에 대해 알아보았다.
  
    보통 로그인 기능을 구현할 때, JWT와 웹스토리지/쿠키를 사용하고 매 페이지마다 서버와 통신해서 사용자 정보를 응답 받아서 사용자 인증을 하는 방법으로 비교적 쉽게 구현할 수 있다는 것     을 알게 됐다.
  
  
    그래서 JWT와 LocalStorage를 추가했고, 기존의 DB에서 사용자 일치 여부만 확인했던 로직을 다음과 같이 수정했다.
      1. 사용자가 아이디와 비밀번호 입력
      2. DB에서 해당 아이디와 비밀번호 일치하는 사용자가 있는지 확인
      3. 일치하는 유저가 있으면 JWT를 발행
      4. 클라이언트의 LocalStorage에 JWT 저장
      5. API 요청시 헤더에 JWT를 전달
      6. 서버에서는 JWT가 유효한지 판별하고 클라이언트에 응답
      
    초기 로그인 시에는 위와 같은 과정을 거치고, 페이지가 변경될때마다 useEffect와 dispatch - auth 액션을 사용해 5번과 6번이 실행 되도록하여 사용자 인증을 할 수 있게 해줬다.  
 
    ### 추가로 알게 된 것
    로그인 기능을 구현할 때 토큰을 쿠키/웹스토리지에 저장하냐, 뭐가 더 안전한가 등 각각 장단점이 있다는 걸 알게 되었다.
    새로고침 시에 Redux store의 정보가 초기화 되지 않게 하기 위한 다른 방법으로 Redux-Persist를 사용하는 방법이 있다고 한다. 
    
  <br>
  
* ## 웹과 모바일 환경을 고려한 반응형 UI 설계

  <br>
  
## 배포 링크
  
http://15.164.220.78/
  
## 배포 이후

블로그는 당연히 검색 엔진에서 노출이 되어야하고 SNS 등에 링크를 공유하면 썸네일과 사이트의 설명이 나와야한다고 생각했다.

CRA에서 SEO 문제를 어떻게 해결해야할지에 대해 알아보았고, 관련 라이브러리가 있다는 것을 알게 되었다.

그래서 페이지별로 메타 데이터를 가질 수 있도록, 페이지별로 pre-render 될 수 있도록 각각 react-helmet / react-snap 라이브러리를 사용했지만

또 다른 문제들을 만나게 되었다.
    
  ## 1. SNS 등 공유할 때 메인 페이지의 메타데이터만 적용되는 문제점

   <img width="357" alt="스크린샷 2022-05-17 오전 10 41 34" src="https://user-images.githubusercontent.com/76215166/168710514-f9563666-d0db-4d0f-b32e-316adc25a72c.png">


  페이지별로 html 파일을 생성하기는 했지만 모든 페이지가 메인 페이지의 html파일과 매핑되는 것 같았다.

  이를 해결하기 위해서는 각 페이지별로 해당하는 html 파일로 매핑이 되게 끔 서버 측에서 따로 처리하는 작업이 필요하다고 함

  ## 2. react-snap 사용 시 package.json에 페이지별로 매번 경로를 입력해줘야 하는 번거로움

   <img width="563" alt="스크린샷 2022-05-17 오전 10 50 32" src="https://user-images.githubusercontent.com/76215166/168711925-1df1966a-b227-4076-a6c5-6661043cc22a.png">
   
   react-snap이 package.json에 입력하지 않은 페이지는 자동으로 빌드해주지 않기 때문에 매번 경로를 입력해줘야해서 번거롭다.

<br>

또한 마침 Gatsby와 Next와 같은 새로운 기술들이 눈에 들어왔다.

결국 Gatsby를 사용해보기로 하고 블로그를 이전했다. 위에서 겪었던 SEO 관련 문제들도 해결할 수 있었다.
   
   

   
  
  *블로그가 Gatsby로 이전 됐습니다.
