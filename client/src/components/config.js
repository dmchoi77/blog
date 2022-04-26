//////////////////////////// For Header Configs //////////////////////////////////
const config = {
  headers: {
    "Content-type": "application/json;charset=UTF-8",
    // "Set-Cookie": "HttpOnly,Secure",
  },
};

const userInfo = localStorage.getItem("x_auth");
const token = JSON.parse(userInfo);

// If token, add to headers
if (token) {
  config.headers["x_auth"] = token.value;
}

export const headersConfig = config;
