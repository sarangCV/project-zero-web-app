import {baseUrl} from '../configuration'

export const validateUser = async (email, password) => {
    const URL = `${baseUrl}/auth/login`;
    const requestOptions = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    };
    // console.log(requestOptions.body)
    return await fetch(URL, requestOptions)
    .then((response) => response.json())
    .then((resData) => {
        if(resData.token) {
            const token = resData.token;
            window.sessionStorage.setItem('sarangcv', JSON.stringify(token));
        }
        return resData;
    })

}