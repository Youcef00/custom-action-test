import core from '@actions/core';
import github from '@actions/github';
import fetch from 'node-fetch';

/**
 * Sends asynchronous message into Google Chat
 * @return response
 */
function sendMessage() {
    const webhooks = core.getInput('webhooks').split(" ");
    const webhookURL = webhooks.find(webhook => {
        const user = webhook.split(/:(.*)/s)[0];
        return user === github.context.payload.requested_reviewer.login;
    }).split(/:(.*)/s)[1];
    if (webhookURL === undefined) {
        console.log("Please check the URL and the username are well indicated");
        return;
    }
    try {
        let data = {
            "cards": [
                {
                    "header": {
                        "title": "New Code Review Requested 🔬"
                    },
                    "sections": [
                        {
                            "widgets": [
                                {
                                    "textParagraph": {
                                        "text": `Hey, <b><font color="#D14F0A">${github.context.payload.requested_reviewer.login}</font></b> You have a new review requested!<br>
                                <a href=${github.context.payload.pull_request.html_url}>Link To Pull Request</a>`
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        data = JSON.stringify(data);
        let resp;
        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: data,
        }).then((response) => {
            resp = response;
            console.log(`POST sent, Response: ${response.statusText}`);
        });
    } catch (error) {
        core.setFailed(error.message);
    }


}

sendMessage();