let topic_select = document.getElementById("topic-select");
let no_of_quest_select = document.getElementById("no-of-quest");
let btn_confirm = document.getElementById("btn-confirm");
let currentTopic = 1;
let currentNumberOfQuest = 5;

document.addEventListener("DOMContentLoaded", function() {
    fetchTopic();
})

btn_confirm.addEventListener("click", function(e) {
    let topic_chosen = topic_select.options[topic_select.selectedIndex].value;
    let number_of_quest = no_of_quest_select.options[no_of_quest_select.selectedIndex].value;
    btn_confirm.setAttribute("href", `game.html?topic=${topic_chosen}&number=${number_of_quest}`);
    console.log(btn_confirm);
})

topic_select.onchange = function() {
    let topic_chosen = this.options[this.selectedIndex].value;
    currentTopic = topic_chosen;
    fetchQuestionsNumberOfQuest(topic_chosen);
    btn_confirm.setAttribute("href", `game.html?topic=${currentTopic}&number=${currentNumberOfQuest}`);
}

no_of_quest_select.onchange = function() {
    let currentNumberOfQuest = this.options[this.selectedIndex].value;;
    btn_confirm.setAttribute("href", `game.html?topic=${currentTopic}&number=${currentNumberOfQuest}`);
}

function fetchTopic() {
    let xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        `https://quizzyweb-3e807-default-rtdb.firebaseio.com/topics.json`,
        true
    );
    xhr.onreadystatechange = function() {
        if (this.status === 200 && this.readyState === 4) {
            let result = JSON.parse(this.responseText);
            let htmlResult = "";
            for (let i = 0; i < result.length - 1; i++)
            {
                htmlResult += `<option value=${i + 1}>${result[i + 1].name}</option>`
            }
            topic_select.innerHTML = htmlResult;
            fetchQuestionsNumberOfQuest(1);
        }
    }
    xhr.send();
}

function fetchQuestionsNumberOfQuest(topicID) {
    let xhr = new XMLHttpRequest();
    let url = "";
    if (topicID == 11) {
      url = "https://quizzyweb-3e807-default-rtdb.firebaseio.com/questions.json"
    } else {
      url = `https://quizzyweb-3e807-default-rtdb.firebaseio.com/questions.json?orderBy="topic_id"&startAt="${topicID}"&endAt="${topicID}"`;
    }
    xhr.open(
        "GET",
        url,
        true
    );
    xhr.onreadystatechange = function() {
        if (this.status === 200 && this.readyState === 4) {
            let result = JSON.parse(this.responseText);
            let max_length = 0;
            if (topicID === 11) {
                max_length = result.length;
            } else {
                let tmpArr = []
                for (var id in result) {
                    if (Object.prototype.hasOwnProperty.call(result, id)) {
                        tmpArr.push(parseInt(id));
                    }
                }
                max_length = tmpArr.length;
            }
            let htmlResult = "";
            for (let i = 5; i <= max_length; i++)
            {
                htmlResult += `<option value=${i}>${i}</option>`
            }
            no_of_quest_select.innerHTML = htmlResult;
        }
    }
    xhr.send();
}