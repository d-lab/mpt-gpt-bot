import http from 'k6/http';
import { sleep } from 'k6';

function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

export const options = {
    vus: 200,
    duration: '10s',
};
let errCount = 0;
let count = 0;
function printResponse(subject, response) {
    const body = JSON.parse(response.body);

    // console.log(`===${subject}==================================`);
    console.log("Status: ", response.status, body.message);
    // console.log("message: ", body.message)

    // console.log("Response: ", body);
    if (response.status != 200) {
        // console.log("Response: ", body);

        // console.log(`xxx${subject}xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`);
        errCount++;

    } else if (response.status == 200 && body.message != "success") {
        // console.log("Response: ", body);

        // console.log(`xxx${subject}xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`);
        errCount++;
    }
    count++;

    // console.log(`===${subject}==================================`);
    // console.log(`===${count}====${errCount}==============================`);
}

const sentences = [
    "1 + 1 =", "2 + 2 =", "3 + 3 =", "4 + 4 =", "5 + 5 =", "6 + 6 =", "7 + 7 =", "8 + 8 =", "9 + 9 =", "10 + 10 ="]
function gpt() {

    const response = http.post('http://127.0.0.1:81/gpt',
        JSON.stringify({
            "messages": [
                {
                    "content": "Hello, I am a chatbot. How can I help you?",
                    "role": "assistant"
                },
                {
                    "role": "user",
                    "content": randomChoice(sentences)
                }
            ],
            "metadata": {
                "agent_id": "1234",
            },
            "provider": "test"
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );

    printResponse("GPT", response);
}


function events() {

    const response = http.post('http://localhost:81/events',
        JSON.stringify({
            data: [
                {
                    "provider": "test",
                    "event": {
                        "type": "copy",
                        "value": "Copy content",
                        "timestamp": "2021-09-01T00:00:00.000Z"
                    },
                    "metadata": {
                        "agent_id": "1234",
                    }
                }
            ]
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );

    printResponse("EVT", response);
}

export default function () {
    // cat script.js | docker run --rm -i grafana/k6 run -
    // gpt();

    events();


    sleep(1);
}
