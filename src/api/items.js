import { baseUrl } from "../configuration";

// ADD AN ITEM

export const addItems = async (itemData, token) => {
    const URL = `${baseUrl}/items/add-item`
    const requestOptions = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //  'auth-token': token
        },
        body: JSON.stringify(itemData)
    }
    console.log(requestOptions.body)

    return await fetch(URL, requestOptions)
    .then((response) => response.json())
    .then((resData) => {
        return resData;
    })
}

// GET ALL ITEMS

export const getAllItems = async (itemData, token) => {
    const URL = `${baseUrl}/items/`
    const requestOptions = {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //  'auth-token': token
        },
    }

    return await fetch(URL, requestOptions)
    .then((response) => response.json())
    .then((resData) => {
        return resData;
    })
}

// GET A SPECIFIC ITEM

export const getItem = async (id) => {
    const URL = `${baseUrl}/items/${id}`
    const requestOptions = {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //  'auth-token': token
        },
    }

    return await fetch(URL, requestOptions)
    .then((response) => response.json())
    .then((resData) => {
        return resData;
    })
}

// DELETE AN ITEM

export const deleteItem = async (id) => {
    const URL = `${baseUrl}/items/${id}`
    const requestOptions = {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //  'auth-token': token
        },
    }

    return await fetch(URL, requestOptions)
    .then((response) => response.json())
    .then((resData) => {
        return resData;
    })
}

// UPDATE AN ITEM

export const updateItem = async (itemData, id) => {
    const URL = `${baseUrl}/items/update/${id}`
    const requestOptions = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //  'auth-token': token
        },
        body: JSON.stringify(itemData)
    }
    console.log(requestOptions.body)

    return await fetch(URL, requestOptions)
    .then((response) => response.json())
    .then((resData) => {
        return resData;
    })
}