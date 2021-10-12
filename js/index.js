const requestUrl = 'https://61489630035b3600175b9f56.mockapi.io/api/v1/Users';
const tableUsers = document.getElementById('table');
let users = [];

const getUsers = function() { fetch(requestUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(json) {
                document.getElementById("inId").value = "";
                document.getElementById("inName").value = "";
                document.getElementById("inLink").value = "";
                tableUsers.innerHTML = "";
                tableUsers.innerHTML += createTemplate(json);
            })
        }
        else {
            alert(response.status + " " + response.statusText);
        }
    }).catch(function() {
        alert("fetch error!");
    });
};

const deleteUser = id => {
    const response = fetch(requestUrl + "/" + id, {
        method: 'DELETE'
    }).then(getUsers).catch(function() {
        alert("fetch error!");
    });
};

const userPost = function() {
    let date = new Date();
    let Id = document.getElementById("inId").value;
    let Name = document.getElementById("inName").value;
    let Avatar = document.getElementById("inLink").value;
    const response = fetch(requestUrl, {
        method: 'POST',
        body: JSON.stringify({id: Id, name: Name, avatar: Avatar, createdAt: date.toISOString()})
    }).then(function(response) { 
        if (response.ok) {
            getUsers();
        }
        else {
            alert(response.status + " " + response.statusText);
        }
    }).catch(function() {
        alert("fetch error!");
    });
}

const userPut = function() {
    let date = new Date();
    let Id = document.getElementById("inId").value;
    let Name = document.getElementById("inName").value;
    let Avatar = document.getElementById("inLink").value;
    const response = fetch(requestUrl + "/" + Id, {
        method: 'PUT',
        body: JSON.stringify({id: Id, name: Name, avatar: Avatar, createdAt: date.toISOString()})
    }).then(function(response) { 
        if (response.ok) {
            getUsers();
        }
        else {
            alert(response.status + " " + response.statusText);
        }
    }).catch(function() {
        alert("fetch error!");
    });
}

const userGet = id => {
    fetch(requestUrl + "/" + id).then(function(response) {
        if (response.ok) {
            response.json().then(function(json) {
                json.isSingle = true;
                tableUsers.innerHTML = "";
                tableUsers.innerHTML += createTemplate(json);
                document.getElementById("inId").value = json.id;
                document.getElementById("inName").value = json.name;
                document.getElementById("inLink").value = json.avatar;
            })
        }
        else {
            alert(response.status + " " + response.statusText);
        }
    }).catch(function() {
        alert("fetch error!");
    });
};

const createTemplate = data => {
    let template = "<tbody>";
    let i = 0;
    if (data.length === undefined) {
        template += `
        <tr id="row${data.id}">
            <td id="id">${data.id}</td>
            <td id="pic">
                <img class="rounded" src="${data.avatar}">
            </td>
            <td id="name">${data.name}</td>
            <td>
                <button class="btn btn-info" onclick="deleteUser(${data.id})">Delete</button>
            </td>
            <td>
                <button class="btn btn-info" onclick="userGet(${data.id})">Get by id</button>
            </td>
        </tr>
        `
    } else {
        for (let user of data) {
            template += `
            <tr id="row${user.id}">
                <td id="id">${user.id}</td>
                <td id="pic">
                    <img class="rounded" src="${user.avatar}">
                </td>
                <td id="name">${user.name}</td>
                <td>
                    <button class="btn btn-info" onclick="deleteUser(${user.id})">Delete</button>
                </td>
                <td>
                    <button class="btn btn-info" onclick="userGet(${user.id})">Get by id</button>
                </td>
            </tr>
            `
        }
    }
    
    if (data.isSingle) {
        template += `<button class="btn btn-info" onclick="getUsers()">To list</button>`;
    }

    template += "</tbody>"
    return template;
};