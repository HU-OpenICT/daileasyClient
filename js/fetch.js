const today = new Date();
const start_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

function send_checkin() {

    let start_time = start_time;
    let date = document.getElementById('date').value;
    let team = document.querySelector('input[name="team"]:checked').value;
    let feeling = document.querySelector('input[name="feeling"]:checked').value;
    let why_feeling = document.getElementById('why_feeling').value;
    let did = document.getElementById('did').value;
    let learned = document.getElementById('learned').value;
    let todo = document.getElementById('todo').value;
    let question = document.getElementById('question').value;


    let data = { 'start_time': start_time, 'date': date, 'team': team, 'feeling': feeling, 'why_feeling': why_feeling, 'did': did, 'learned': learned, 'todo': todo, 'question': question };

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