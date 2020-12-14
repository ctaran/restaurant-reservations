import { authHeader, handleResponse } from '../_helpers';

export const userService = {
    getAll,
    getByName,
    registerUser,
    deleteByName,
    updateByName
};

async function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    const response = await fetch(`/api/users`, requestOptions);
    return handleResponse(response);
}

async function getByName(name) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    const response = await fetch(`/api/user/${name}`, requestOptions);
    return handleResponse(response);
}

async function registerUser(name, password, email) {
    const requestOptions = {
        method: 'POST', 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password, email })
    }
    const response = await fetch(`/api/user/new`, requestOptions);
    return handleResponse(response);
}

async function updateByName(name_previous, name, password, email) {
    // const password = "";
    const requestOptions = {
        method: 'PUT', 
        headers: Object.assign({}, authHeader(),  { "Content-Type": "application/json" }),
        body: JSON.stringify({ name, password, email }),
    }
    const response = await fetch(`/api/user/${name_previous}`, requestOptions);
    return handleResponse(response);
}

async function deleteByName(name) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    const response = await fetch(`/api/user/${name}`, requestOptions);
    return handleResponse(response);
}