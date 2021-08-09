import { baseUrl } from "../configuration";

export const addItems = async (itemData, token) => {
    const URL = `${baseUrl}/items/add-item`
    const requestOptions = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //  'auth-token': token
        },
        body: JSON.stringify({
            items: itemData
        })
    }
    console.log(requestOptions)

    return await fetch(URL, requestOptions)
    .then((response) => response.json())
    .then((resData) => {
        return resData;
    })
}

