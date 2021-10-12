const requestUrl = 'https://61489630035b3600175b9f56.mockapi.io/api/v1/Users';
const tableUsers = document.getElementById('table');
let users = [];

const getUsers = function() { fetch(requestUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(json) {
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
    const response = fetch(requestUrl, {
        method: 'POST'
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
    if (Id !== '') {
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
    } else {
        alert("not enough data for request!");
    }
}

const userGet = id => {
    fetch(requestUrl + "/" + id).then(function(response) {
        if (response.ok) {
            response.json().then(function(json) {
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
    let template = `
    <tbody>`;
    if (data.length === undefined) {
        template += `
        <tr id="row${data.id}">
            <td id="id" class="text-center">
                <input id="inId" class="form-control" type="hidden" placeholder="id">
                ${data.id}
            </td>
            <td>
                <img class="rounded" src="${data.avatar}">
            </td>
            <td id="pic">
                <input id="inLink" class="form-control" type="text" placeholder="link">
            </td>
            <td id="name" class="text-center">
                <input id="inName" class="form-control" type="text" placeholder="name">
            </td>
            <td>
                <button class="btn btn-info" onclick="userPut()">Update</button>
            </td>
            <td>
                <button class="btn btn-info" onclick="getUsers()">To list</button>
            </td>
            <td>
                <button class="btn btn-info" onclick="deleteUser(${data.id})">Delete</button>
            </td>
        </tr>
    </div>
        `
    } else {
        for (let user of data) {
            template += `
            <tr id="row${user.id}">
                <td id="id" class="text-center">${user.id}</td>
                <td id="pic">
                    <img class="rounded" src="${user.avatar}">
                </td>
                <td id="name" class="text-center">${user.name}</td>
                <td>
                    <button class="btn btn-info" onclick="userGet(${user.id})">Get by id</button>
                </td>
                <td>
                    <button class="btn btn-info" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
            `
        }
    }

    template += "</tbody>"
    return template;
};