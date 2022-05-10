import React, { useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

function PostWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.user);
  const writer = user.userData ? user.userData.name : null;
  const history = useHistory();
  const editTitle = useRef();
  const editContent = useRef();
  const [imgURL, setImgURL] = useState([]);
  let temp = [];

  // if (user && !user.userData.role) {
  //     alert("잘못된 접근입니다.")
  //     props.history.push('/')
  //     return
  // }

  const handleInputTitle = () => {
    const data = editTitle.current.value;
    setTitle(data);
    //console.log(title);
  };

  const submit = () => {
    if (!user.userData.role) {
      alert("권한이 없습니다.");
    }

    if (title === "" || content === "") {
      alert("내용을 입력하세요.");
      return;
    }

    fetchData();
  };

  const fetchData = async () => {
    try {
      const fetchIndex = await axios.get(
        "http://15.164.220.78:8000/api/articles/idxs"
      ); //인덱스 조회

      const fetchData = await axios.post(
        `http://15.164.220.78:8000/api/articles/${Number(fetchIndex.data) + 1}`,
        {
          index: Number(fetchIndex.data) + 1,
          title,
          content,
          writer,
          url: imgURL ? imgURL[0] : null,
        }
      );
      if (fetchData.data.success) history.push("/post/list");
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async (blob) => {
    let formData = new FormData();

    formData.append("image", blob);
    const result = await axios.post(
      "http://15.164.220.78:8000/api/images",
      formData,
      {
        data: formData,
        headers: { "Content-type": "multipart/form-data" },
      }
    );

    temp.push(...imgURL, result.data);
    setImgURL(temp);

    return result.data;
  };

  return (
    <Container>
      <h1>포스팅</h1>
      <TitleInput
        type="text"
        placeholder="제목"
        name="title"
        ref={editTitle}
        onChange={handleInputTitle}
      />
      <Editor
        previewStyle="vertical"
        height="400px"
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        data=""
        name="content"
        ref={editContent}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            if (blob.size > 5 * 1024 * 1024) {
              alert("용량 초과");
            } else {
              const upload = await uploadImage(blob);
              callback(upload, "alt-text");
            }
            return false;
          },
        }}
        onChange={() => {
          const data = editContent.current.getInstance().getMarkdown();
          setContent(data);
        }}
      />
      <Button
        className="post-write-btn"
        variant="primary"
        type="button"
        onClick={submit}
      >
        등록
      </Button>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px 30px 0;
  margin: 0 auto 3rem;
  width: 1100px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 10px 0 10px;
`;

export default PostWrite;
