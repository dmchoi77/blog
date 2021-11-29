import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from './type';
import { headersConfig } from '../components/config.js';

export function loginUser(body) {

    const request = axios.post('http://15.164.220.78:8000/api/login', body)
        .then(res => res.data)

    return {
        type: LOGIN_USER,
        payload: request,
    }
}

export function registerUser(body) {

    const request = axios.post('http://15.164.220.78:8000/api/signup', body)
        .then(res => res.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {

    const request = axios.get('http://15.164.220.78:8000/api/users/auth', headersConfig)
        .then(res => res.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get('http://15.164.220.78:8000/api/logout', headersConfig)
        .then(res => res.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}