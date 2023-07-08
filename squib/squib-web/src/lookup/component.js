// get cookies
function getCookie(name) {
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      // console.log(cookie)
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  // console.log(cookieValue)
  return cookieValue
}

// fetch data from backend server or api 

export function BackendLookup(method, endpoint, callback, data) {
  let jsonData;
  if (data) {
    jsonData = JSON.stringify(data)
  }
  const xhr = new XMLHttpRequest()
  const url = `http://localhost:8000/api/${endpoint}`
   // getcookie
  const csrftoken = getCookie('csrftoken');
  xhr.responseType = 'json'
 
  xhr.open(method, url)
  xhr.setRequestHeader("Content-Type", "application/json")
  if (csrftoken) {
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
  }
  xhr.onload = function () {
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = function (e) {
    console.log(e)
    callback({ "message": "The request are error" }, 400)
  }
  xhr.send(jsonData)
}
