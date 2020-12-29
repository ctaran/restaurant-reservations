import { authHeader, handleResponse } from '../_helpers';
import { authenticationService } from './authentication.service';

export const tableService = {    
    getByRestaurantID,
    createNew,
    deleteByID,
    updateByID
};

async function getByRestaurantID(restaurant_id) {
    const manager_id = authenticationService.currentUserValue.id;
    const params = { restaurant_id: restaurant_id, manager_id: manager_id  };
    const url = "/api/tables?" + Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&')
    const requestOptions = { method: 'GET', headers: authHeader() };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function createNew(pos_x, pos_y, seats, restaurant_id) {
    const manager_id = authenticationService.currentUserValue.id;
    const params = { manager_id: manager_id  };
    const url = "/api/table/new?" + Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
    const requestOptions = {
        method: 'POST', 
        headers: Object.assign({}, authHeader(),  { "Content-Type": "application/json" }),
        body: JSON.stringify({ pos_x, pos_y, seats, restaurant_id, manager_id })
    }
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function updateByID(id, pos_x, pos_y, seats, restaurant_id) {
    const manager_id = authenticationService.currentUserValue.id;
    const params = { manager_id: manager_id  };
    const url = `/api/table/${id}?` + Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');

    const requestOptions = {
        method: 'PUT', 
        headers: Object.assign({}, authHeader(),  { "Content-Type": "application/json" }),
        body: JSON.stringify({ pos_x, pos_y, seats, restaurant_id }),
    }
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function deleteByID(id) {
    const manager_id = authenticationService.currentUserValue.id;
    const params = { manager_id: manager_id  };
    const url = `/api/table/${id}?` + Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');

    const requestOptions = { method: 'DELETE', headers: authHeader() };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}