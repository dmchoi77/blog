import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './type';

export function loginUser(body) {

    const request = axios.post('/api/login', body)
        .then(res => res.data)
    return {
        type: LOGIN_USER,
        payload: request,
    }
}

export function registerUser(body) {

    const request = axios.post('/api/signup', body)
        .then(res => res.data)
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {

    const request = axios.get('/api/users/auth')
        .then(res => res.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}