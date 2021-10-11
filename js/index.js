const requestUrl = 'https://61489630035b3600175b9f56.mockapi.io/api/v1/Users';
const tableUsers = document.getElementById('table');
let users = [];

const getUsers = function() { fetch(requestUrl).then(function(response) {
        response.json().then(function(json) {
            document.getElementById("inId").value = "";
            document.getElementById("inName").value = "";
            document.getElementById("inLink").value = "";
            tableUsers.innerHTML = "";
            for (let user of json) {
                tableUsers.innerHTML += createTemplate(user);
            }
        })
    });
}

const createTemplate = data => {
    return template = `
        <tr id="row${data.id}">
            <td id="id">${data.id}</td>
            <td id="pic">
                <image src="${data.avatar}">
            </td>
            <td id="name">${data.name}</td>
            <td>
                <button onclick="deleteUser(${data.id})">Delete</button>
            </td>
            <td>
                <button onclick="userGet(${data.id})">Get by id</button>
            </td>
        </tr>
    `
};

const deleteUser = id => {
    const response = fetch(requestUrl + "/" + id, {
        method: 'DELETE'
    }).then(getUsers);
};

const userPost = function() {
    let date = new Date();
    let Id = document.getElementById("inId").value;
    let Name = document.getElementById("inName").value;
    let Avatar = document.getElementById("inLink").value;
    const response = fetch(requestUrl, {
        method: 'POST',
        body: JSON.stringify({id: Id, name: Name, avatar: Avatar, createdAt: date.toISOString()})
    }).then(getUsers);
}

const userPut = function() {
    let date = new Date();
    let Id = document.getElementById("inId").value;
    let Name = document.getElementById("inName").value;
    let Avatar = document.getElementById("inLink").value;
    const response = fetch(requestUrl + "/" + Id, {
        method: 'PUT',
        body: JSON.stringify({id: Id, name: Name, avatar: Avatar, createdAt: date.toISOString()})
    }).then(getUsers);
}

const userGet = id => {
    fetch(requestUrl + "/" + id).then(function(response) {
        response.json().then(function(json) {
            tableUsers.innerHTML = "";
            tableUsers.innerHTML += createTemplate(json);
            tableUsers.innerHTML += 
            `<td>
                <button onclick="getUsers()">To list</button>
            </td>`;
            document.getElementById("inId").value = json.id;
            document.getElementById("inName").value = json.name;
            document.getElementById("inLink").value = json.avatar;
        })
    });
}