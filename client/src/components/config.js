
//////////////////////////// For Header Configs //////////////////////////////////
const config = {
    headers: {
        'Content-type': 'application/json'
    }
};

const token = localStorage.getItem('x_auth')

// If token, add to headers
if (token) {
    config.headers['x_auth'] = token;
}

config.headers['Content'] = "application/json;charset=UTF-8";


export const headersConfig = config