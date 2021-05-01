const baseApiUrl = 'http://localhost:9000/api'

// post requests
const post = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem('APItoken')}`
      },
    }

const postInspoItem = (newInspoItem) => {
        
    return new Promise((resolve, reject) => {
            fetch(`${baseApiUrl}/inspirations`, {...post, body: JSON.stringify(newInspoItem)})
            .then((response) => {
                console.log(response.status);
                console.log("POST inspo item response", response);
                return response.json();
              })
              .then((createdInspoItem) => {
                console.log("POST inspo item data", createdInspoItem);
                  resolve(createdInspoItem);
              })
              .catch((error) => {
                reject(error);
              });
        })
    }

const postTextItem = (newTextItem, newInspoItem) => {
    const newItem = { textItem: {...newTextItem}, inspoItem: {...newInspoItem} };
    return new Promise((resolve, reject) => {
        fetch(`${baseApiUrl}/text_items`, {...post, body: JSON.stringify(newItem)})
        .then((response) => {
            console.log(response.status);
            console.log("POST text item response", response);
            return response.json();
          })
          .then((createdTextItem) => {
            console.log("POST my text item data", createdTextItem);
              resolve(createdTextItem);
          })
          .catch((error) => {
            reject(error);
          });
    })
}

//get requests
const get = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem('APItoken')}`
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
            window.localStorage.setItem('APItoken', data.token);
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
};

const getMyTextItems = () => {
    return new Promise((resolve, reject) => {
        fetch(`${baseApiUrl}/text_items/my_items`, get)
          .then((response) => {
              console.log("GET my text item response", response);
              return response.json();
          }).then((myTextItemData) => {
              console.log("GET my text item data", myTextItemData);
              resolve(myTextItemData);
          })
          .catch((error) => {
              reject(error);
          });  
    });
}; 

const getPublishedTextItems = () => {
    return new Promise((resolve, reject) => {
        fetch(`${baseApiUrl}/text_items/published`, get)
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
        fetch(`${baseApiUrl}/text_items`, get)
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

const getAllInspoItems = () => {
    return new Promise((resolve, reject) => {
        fetch(`${baseApiUrl}/inspirations`, get)
        .then((response) => {
            console.log("GET inspo item response", response);
            return response.json();
        }).then((inspoItemData) => {
            console.log("GET inspo item data", inspoItemData);
            resolve(inspoItemData);
        })
        .catch((error) => {
            reject(error);
        });  
    });
};




export { postInspoItem, postTextItem, getMyTextItems, getPublishedTextItems, getAllTextItems, getAllInspoItems, logIn };

