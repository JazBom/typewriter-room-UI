const baseApiUrl = 'http://localhost:9000/api'

const Get = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "token": window.localStorage.getItem('token')
    },
  };

const logIn = (form) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseApiUrl}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then(response => response.json())
        .then(data => {
            window.localStorage.setItem('token', data.token);
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
};

const getPublishedTextItems = () => {
    return new Promise((resolve, reject) => {
        fetch(`${baseApiUrl}/text_items/published`, Get)
          .then((response) => {
              console.log("GET published text item response", response);
              return response.json();
          }).then((publishedTextItemData) => {
              console.log("GET published text item data", publishedTextItemData);
              resolve(publishedTextItemData);
          })
          .catch((error) => {
              reject(error);
          });  
    });
}; 

const getAllTextItems = () => {
    return new Promise((resolve, reject) => {
        fetch(`${baseApiUrl}/text_items`, Get)
        .then((response) => {
            console.log("GET text item response", response);
            return response.json();
        }).then((textItemData) => {
            console.log("GET text item data", textItemData);
            resolve(textItemData);
        })
        .catch((error) => {
            reject(error);
        });  
    });
};

export { getPublishedTextItems, getAllTextItems, logIn };

