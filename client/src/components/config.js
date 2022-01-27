//////////////////////////// For Header Configs //////////////////////////////////
const config = {
  headers: {
    "Content-type": "application/json;charset=UTF-8",
    // "Set-Cookie": "HttpOnly,Secure",
  },
};

const token = localStorage.getItem("x_auth");

// If token, add to headers
if (token) {
  config.headers["x_auth"] = token;
}

export const headersConfig = config;
