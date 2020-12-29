import { authHeader, handleResponse } from '../_helpers';

export const restaurantService = {
    getByName,
    getByManagerID,
    createNew,
    deleteByName    
};

async function getByName(name) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    const response = await fetch(`/api/restaurant/${name}`, requestOptions);
    return handleResponse(response);
}

async function getByManagerID(manager_id) {
    const params = { manager_id: manager_id };
    const url = "/api/restaurants?" + Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&')
    const requestOptions = { method: 'GET', headers: authHeader() };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function createNew(name, manager_id) {
    const requestOptions = {
        method: 'POST', 
        headers: Object.assign({}, authHeader(),  { "Content-Type": "application/json" }),
        body: JSON.stringify({ name, manager_id })
    }
    const response = await fetch(`/api/restaurant/new`, requestOptions);
    return handleResponse(response);
}

async function deleteByName(name) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    const response = await fetch(`/api/restaurant/${name}`, requestOptions);
    return handleResponse(response);
}