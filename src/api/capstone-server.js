const baseApiUrl = 'http://localhost:9000/api'

// initial log-in, log-out post request to API

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
            window.localStorage.setItem('currentUser', JSON.stringify({ id: data.user.id, name: data.user.name }));
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
};

const logOut = () => {
    window.localStorage.removeItem('APItoken');
    window.localStorage.removeItem('currentUser');
};

const getCurrentUser = () => {
    return JSON.parse(window.localStorage.getItem('currentUser'));
}

// other POST requests
const post = (data) => {
    return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${window.localStorage.getItem('APItoken')}`
        },
        body: JSON.stringify(data),
      };
}

    
const postInspoItem = (newInspoItem) => {
        
    return new Promise((resolve, reject) => {
            fetch(`${baseApiUrl}/inspirations`, post(newInspoItem))
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

const postTextItem = (newTextItem) => {
   
    return new Promise((resolve, reject) => {
        fetch(`${baseApiUrl}/text_items`, post(newTextItem))
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

const postRating = (newRating) => {
        
    return new Promise((resolve, reject) => {
            fetch(`${baseApiUrl}/ratings`, post(newRating))
            .then((response) => {
                console.log(response.status);
                console.log("POST rating response", response);
                return response.json();
              })
              .then((createdRating) => {
                console.log("POST rating data", createdRating);
                  resolve(createdRating);
              })
              .catch((error) => {
                reject(error);
              });
        })
    }

//GET requests
const get = () => {
   return {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem('APItoken')}`
        },
      };
    
} 
  const getAllRatings = () => {
    return new Promise((resolve, reject) => {
        fetch(`${baseApiUrl}/ratings`, get())
        .then((response) => {
            console.log("GET ratings response", response);
            return response.json();
        }).then((ratingsData) => {
            console.log("GET ratings data", ratingsData);
            resolve(ratingsData);
        })
        .catch((error) => {
            reject(error);
        });  
    });
};

const getMyTextItems = () => {
    return new Promise((resolve, reject) => {
        fetch(`${baseApiUrl}/text_items/my_items`, get())
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
        fetch(`${baseApiUrl}/text_items/published`, get())
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
        fetch(`${baseApiUrl}/text_items`, get())
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
        fetch(`${baseApiUrl}/inspirations`, get())
        .then((response) => {
            console.log("GET inspo items response", response);
            return response.json();
        }).then((inspoItemData) => {
            console.log("GET inspo items data", inspoItemData);
            resolve(inspoItemData);
        })
        .catch((error) => {
            reject(error);
        });  
    });
};

const getInspoItem = (inspoItemId) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseApiUrl}/inspirations/${inspoItemId}`, get())
        .then((response) => {
            console.log("GET an inspo item response", response);
            return response.json();
        }).then((inspoItemData) => {
            console.log("GET an inspo item", inspoItemData);
            resolve(inspoItemData);
        })
        .catch((error) => {
            reject(error);
        });  
    });
};

// PUT (EDIT) requests 
const put = (data) => {
    return {
         method: "PUT",
         headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${window.localStorage.getItem('APItoken')}`
         },
        body: JSON.stringify(data),
       }
 };

 const editTextItem = (textItem) => {
     console.log(textItem);
    return new Promise((resolve, reject) => {
        fetch(`${baseApiUrl}/text_items/${textItem.id}`, put({text_item: {text: textItem.text}}))
          .then((response) => {
              console.log("EDIT text item response", response);
              return response.json();
          }).then((textItemData) => {
              console.log("EDIT text item data", textItemData);
              resolve(textItemData);
          })
          .catch((error) => {
              reject(error);
          });  
    })
 };

//DELETE requests

const deleteItem = () => {
    return {
         method: "DELETE",
         headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${window.localStorage.getItem('APItoken')}`
         },
       }
 } 

const deleteTextItem = (textItemId) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseApiUrl}/text_items/${textItemId}`, deleteItem())
          .then((response) => {
              console.log("DELETE text item response", response);
              return response.json();
          }).then((textItemData) => {
              console.log("DELETE text item data", textItemData);
              resolve(textItemData);
          })
          .catch((error) => {
              reject(error);
          });  
    });
}; 

export { postInspoItem, postTextItem, postRating, getAllRatings, getMyTextItems, getPublishedTextItems, getAllTextItems, getAllInspoItems, getInspoItem, editTextItem, deleteTextItem, logIn, logOut, getCurrentUser };