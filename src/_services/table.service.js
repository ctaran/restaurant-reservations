import { authHeader, handleResponse } from '../_helpers';

export const tableService = {    
    getByRestaurantID,
    createNew,
    deleteByID,
    updateByID
};

async function getByRestaurantID(restaurant_id) {
    const params = { restaurant_id: restaurant_id };
    const url = "/api/tables?" + Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&')
    const requestOptions = { method: 'GET', headers: authHeader() };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function createNew(pos_x, pos_y, seats, restaurant_id) {
    const requestOptions = {
        method: 'POST', 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pos_x, pos_y, seats, restaurant_id })
    }
    const response = await fetch(`/api/table/new`, requestOptions);
    return handleResponse(response);
}

async function updateByID(id, pos_x, pos_y, seats, restaurant_id) {
    const requestOptions = {
        method: 'PUT', 
        headers: Object.assign({}, authHeader(),  { "Content-Type": "application/json" }),
        body: JSON.stringify({ pos_x, pos_y, seats, restaurant_id }),
    }
    const response = await fetch(`/api/table/${id}`, requestOptions);
    return handleResponse(response);
}

async function deleteByID(id) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    const response = await fetch(`/api/table/${id}`, requestOptions);
    return handleResponse(response);
}