import axios from "axios";
import tokenStore from "app/tokenStore";

const instance = axios.create({
  baseURL: "http://" + process.env.REACT_APP_SERVER_URL,
  headers: {
    "Access-Control-Allow-Origin": "localhost:8080, localhost:3000",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
    "Access-Control-Allow-Headers":
      "Content-Type, Content-Length, Accept, Authorization, X-Requested-With",
  },
  withCredentials: true,
});

console.log(`token store ::: ${tokenStore.csrfToken}`);

const setCsrfToken = function (onSuccess) {
  instance.get("/v1/csrf").then(function (response) {
    console.log(`Csrf Token called.:: ${JSON.stringify(response)}`);
    if (response && response.data) {
      tokenStore.csrfToken = response.data.token;
      if (onSuccess && onSuccess instanceof Function) {
        onSuccess();
      }
    }
  });
};

if (!tokenStore.csrfToken) {
  setCsrfToken();
}
// const encodedParams = new URLSearchParams();
// encodedParams.append("filter", JSON.stringify([{name:"category", operation: "equal", value: "22"}]));

const encodeParamsMap = function(mappedParams) {
  if (!mappedParams || !(mappedParams instanceof Map) ||  mappedParams.size === 0) {
    return;
  }
  const encodedParams = new URLSearchParams();
  mappedParams.forEach((value, key) => {
    encodedParams.append(key, JSON.stringify(value));
  });
  return encodedParams;
}

const httpClientWrapper = {

    getParams: function (relativeUrl, onSuccess, onError) {
        instance({
          method: "get",
          url: relativeUrl
          
        })
          .then(function (response) {
            console.log(
              `Get success called:: ${JSON.stringify(response)}`
            );
            typeof onSuccess == "function" && onSuccess(response.data);
          })
          .catch(function (error) {
            console.log(`Get error called::  ${error}`);
            typeof onError == "function" && onError(error);
          })
          .then(function () {
            console.log("Get allway called");
          });
      },



  get: function (relativeUrl, onSuccess, onError, paramsMap) {
    instance({
      method: "get",
      url: relativeUrl,
      params: encodeParamsMap(paramsMap)
    })
      .then(function (response) {
        console.log(
          `Get success called:: ${JSON.stringify(response)}`
        );
        typeof onSuccess == "function" && onSuccess(response.data);
      })
      .catch(function (error) {
        console.log(`Get error called::  ${error}`);
        typeof onError == "function" && onError(error);
      })
      .then(function () {
        console.log("Get allway called");
      });
  },

  post: function (relativeUrl, data, onSuccess, onError) {
    instance({
      method: "post",
      url: relativeUrl,
      data: data,
      headers: {
        "X-CSRF-TOKEN": tokenStore.csrfToken,
      },
    })
      .then(function (response) {
        console.log(`Successful post response ${response}`);
        typeof onSuccess == "function" && response && onSuccess(response.data);
      })
      .catch(function (error) {
        console.log(`Failled post response ${error}`);
        typeof onError == "function" && onError(error);
      })
      .then(function () {
        console.log(`Always post response `);
      });
  },

  put: function (relativeUrl, data, onSuccess, onError) {
    instance({
      method: "put",
      url: relativeUrl,
      data: data,
      headers: {
        "X-CSRF-TOKEN": tokenStore.csrfToken,
      },
    })
      .then(function (response) {
        console.log(`Successful put response ${response}`);
        typeof onSuccess == "function" && response && onSuccess(response.data);
      })
      .catch(function (error) {
        console.log(`Failled put response ${error}`);
        typeof onError == "function" && onError(error);
      })
      .then(function () {
        console.log(`Always post response `);
      });
  },

  delete: function(relativeUrl, onSuccess, onError) {
    instance({
      method: "delete",
      url: relativeUrl,
      headers: {
        "X-CSRF-TOKEN":  tokenStore.csrfToken
    }})
      .then(function (response) {
        console.log(
          `Get success called:: ${JSON.stringify(response)}`
        );
        typeof onSuccess == "function" && onSuccess(response.data);
      })
      .catch(function (error) {
        console.log(`Get error called::  ${error}`);
        typeof onError == "function" && onError(error);
      })
      .then(function () {
        console.log("Get allway called");
      });
  },

  login: function (username, password, onSuccess, onError) {
    instance({
      method: "get",
      url: "/users",
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    })
      .then(function (response) {
        setCsrfToken(() => {
          onSuccess(response.data);
        });
        // onSuccess(response.data);
      })
      .catch(function (error) {
        onError(error);
      })
      .then(function () {});
  },
};

httpClientWrapper.setCsrfToken = setCsrfToken;

export default httpClientWrapper;
