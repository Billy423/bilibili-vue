import axios from 'axios';

const httpRequest = axios.create({
    baseURL:'http://localhost:8080',
    timeout:10000
});


// Setup request interceptor
httpRequest.interceptors.request.use(function (config) {

    const token = localStorage.getItem('token');
    if (token && token !== '') {
        config.headers['token'] = token;
    }
    return config;

});

// Setup response interceptor
httpRequest.interceptors.response.use(function (response) {
    const data = response.data;
    if (data) {
        if (data.code === '500') {
            window.alert(data.msg);
            throw new Error(data.msg);
        }
    }
    return data;
})

export default httpRequest