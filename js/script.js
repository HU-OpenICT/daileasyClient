//opsturen checkins
let today = new Date();
let stime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

function getTime() {
    let submittime = new Date();
    let eindtijd = submittime.getHours() + ":" + submittime.getMinutes() + ":" + submittime.getSeconds();
    return eindtijd;
}

function send_checkin() {
    let completiontime = getTime();
    let start_time = stime;
    let User_ID = document.getElementById('User_ID').value;
    let date = document.getElementById('date').value;
    let team = document.querySelector('input[name="team"]:checked').value;
    let feeling = document.querySelector('input[name="feeling"]:checked').value;
    let why_feeling = document.getElementById('why_feeling').value;
    let did = document.getElementById('did').value;
    let learned = document.getElementById('learned').value;
    let todo = document.getElementById('todo').value;
    let question = document.getElementById('question').value;
    console.log(completiontime)
    let data = { 'getTime': completiontime, 'start_time': start_time, 'User_ID': User_ID, 'date': date, 'team': team, 'feeling': feeling, 'why_feeling': why_feeling, 'did': did, 'learned': learned, 'todo': todo, 'question': question };

    fetch('http://127.0.0.1:5000/api/checkins', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            alert(result['succes']);
        });
}

//opvragen checkins
function user() {

    document.getElementById('data').innerHTML = "";
    
    let userid = document.getElementById('user-id').value
    
    let filterfeeling = document.querySelector('input[name="feeling"]:checked').value;
    let filtersquad = document.querySelector('input[name="squad"]:checked').value;
    

fetch(`http://127.0.0.1:5000/api/checkins/user/${userid}${filterfeeling}${filtersquad}`)
    .then(response => response.json())
    .then(json => {
        var datadiv = document.getElementById("data");
        var tbl = document.createElement("table");
        var tblHead = document.createElement("thead");
        var tblBody = document.createElement("tbody");
        var keys = ['Checkin_ID', 'Start_time', 'Completion_time', 'User_ID', 'Date', 'Squad', 'Feeling', 'Why_Feeling', 'Did', 'Learned', 'Todo', 'Question'];
        var header = document.createElement("tr");
        keys.forEach(function(key) {
            var cell = document.createElement("th");
            var cellText = document.createTextNode(key);
            cell.appendChild(cellText);
            header.appendChild(cell);
        });
        tblHead.appendChild(header);
        tbl.appendChild(tblHead);


        json.forEach(checkin => {
            var row = document.createElement("tr");
            keys.forEach(function(key) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode(checkin[key]);
                cell.appendChild(cellText);
                row.appendChild(cell);
            });

            tblBody.appendChild(row);
        });
        tbl.appendChild(tblBody);
        datadiv.appendChild(tbl);
        tbl.setAttribute("border", "2");
    })
}

//update checkin
function update_checkin() {

    let Date = document.getElementById('Date').value;
    let Squad = document.querySelector('input[name="Squad"]:checked').value;
    let Feeling = document.querySelector('input[name="Feeling"]:checked').value;
    let Why_Feeling = document.getElementById('Why_Feeling').value;
    let Did = document.getElementById('Did').value;
    let Learned = document.getElementById('Learned').value;
    let Todo = document.getElementById('Todo').value;
    let Question = document.getElementById('Question').value;


    let data = { 'Date': Date, 'Squad': Squad, 'Feeling': Feeling, 'Why_Feeling': Why_Feeling, 'Did': Did, 'Learned': Learned, 'Todo': Todo, 'Question': Question };

    var id = document.getElementById('Checkin_id').value

    fetch(`http://127.0.0.1:5000/api/checkins/${id}`, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            alert(result['succes']);
        });
}