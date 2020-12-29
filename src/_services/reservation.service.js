import { authHeader, handleResponse } from '../_helpers';

export const reservationService = {    
    getByTableID,
    getByTableIDandDate,
    createNew,
    deleteByID,
    updateByID
};

async function getByTableID(table_id) {
    const params = { table_id: table_id };
    const url = "/api/reservations?" + Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&')
    const requestOptions = { method: 'GET', headers: authHeader() };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function getByTableIDandDate(table_id, date) {
    const params = { table_id: table_id, date: date };
    const url = "/api/reservations?" + Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&')
    const requestOptions = { method: 'GET', headers: authHeader() };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function createNew(date_time, customer_name, customer_email, customer_phone, table_id) {
    const requestOptions = {
        method: 'POST', 
        headers: Object.assign({}, authHeader(),  { "Content-Type": "application/json" }),
        body: JSON.stringify({ date_time, customer_name, customer_email, customer_phone, table_id })
    }
    const response = await fetch(`/api/reservation/new`, requestOptions);
    return handleResponse(response);
}

async function updateByID(id, date_time, customer_name, customer_email, customer_phone) {
    const requestOptions = {
        method: 'PUT', 
        headers: Object.assign({}, authHeader(),  { "Content-Type": "application/json" }),
        body: JSON.stringify({ date_time, customer_name, customer_email, customer_phone }),
    }
    const response = await fetch(`/api/reservation/${id}`, requestOptions);
    return handleResponse(response);
}

async function deleteByID(id) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    const response = await fetch(`/api/reservation/${id}`, requestOptions);
    return handleResponse(response);
}