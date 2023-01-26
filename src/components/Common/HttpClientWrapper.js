import axios from "axios";
import tokenStore from "app/tokenStore";

const instance = axios.create({
    baseURL: "http://" + process.env.REACT_APP_SERVER_URL,
    headers: {
        'Access-Control-Allow-Origin': 'localhost:8080, localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
        'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept, Authorization, X-Requested-With'
    },
    withCredentials: true,
});

console.log(`token store ::: ${tokenStore.csrfToken}`);

const setCsrfToken = function (onSuccess) {
    instance.get("/v1/csrf")
        .then(function (response) {
            console.log(`Csrf Token called.:: ${JSON.stringify(response, null, 2)}`);
            if (response && response.data) {
                tokenStore.csrfToken = response.data.token;
                if (onSuccess && onSuccess instanceof Function) {
                    onSuccess();
                }
            }
        })
};

if (!tokenStore.csrfToken) {
    setCsrfToken();
}

const httpClientWrapper = {

    get: function (relativeUrl, onSuccess, onError) {
        instance({
            method: 'get',
            url: relativeUrl
        }).then(function (response) {
            console.log(`Get success called:: ${JSON.stringify(response, null, 2)}`);
            console.log(`CsrfToken :: ${tokenStore.csrfToken}`);
        })
            .catch(function (error) {
                console.log(`Get error called::  ${error}`)
            })
            .then(function () {
                console.log("Get allway called");
            })
    },

    post: function (relativeUrl, data, onSuccess, onError) {
        instance({
            method: 'post',
            url: relativeUrl,
            data: data,
            headers: {
                'X-CSRF-TOKEN': tokenStore.csrfToken
            }
        }).then(function (response) {
            console.log(`Successful post response ${response}`);
        }).catch(function (error) {
            console.log(`Failled post response ${error}`);
        }).then(function () {
            console.log(`Always post response `);
        })
    },

    login: function (username, password, onSuccess, onError) {
        instance({
            method: 'get',
            url: '/users',
            headers: {
                'Authorization': `Basic ${btoa(`${username}:${password}`)}`
            }
        }).then(function (response) {
            setCsrfToken(() => { onSuccess(response.data) });
            // onSuccess(response.data);
        }).catch(function (error) {
            onError(error);
        }).then(function () {

        })
    }

}

httpClientWrapper.setCsrfToken = setCsrfToken;

export default httpClientWrapper;



