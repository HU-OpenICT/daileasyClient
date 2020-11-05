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
    let date = document.getElementById('date').value;
    let team = document.querySelector('input[name="team"]:checked').value;
    let feeling = document.querySelector('input[name="feeling"]:checked').value;
    let why_feeling = document.getElementById('why_feeling').value;
    let did = document.getElementById('did').value;
    let learned = document.getElementById('learned').value;
    let todo = document.getElementById('todo').value;
    let question = document.getElementById('question').value;
    console.log(completiontime)
    let data = { 'getTime': completiontime, 'start_time': start_time, 'date': date, 'team': team, 'feeling': feeling, 'why_feeling': why_feeling, 'did': did, 'learned': learned, 'todo': todo, 'question': question };

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