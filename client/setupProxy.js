const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8000', //클라이언트 port 3000에 줄 때 8000으로 주겠다.
            changeOrigin: true,
        })
    );
};