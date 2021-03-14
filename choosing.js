document.addEventListener("DOMContentLoaded", function() {
  fetchTopic();
})


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
            console.log(result);
            createCard(result);
            //fetchQuestionsNumberOfQuest(1);
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
        }
    }
    xhr.send();
}

function reduceResult(results){
  return Object.entries(results)
  .map(a => a.pop())
}

function createCard(apiResult){
  const container = document.getElementById('topic-card');
  console.log(apiResult);
  delete apiResult[0];
  apiResult.forEach((result, idx) => {
    // Create card element
    const card = document.createElement('div');
    // Construct card content
    const cardContent = `
      <div class="card col-md-3" id="topic-card-${idx}">
      <img class="card-img-top" src="${result.image}" alt="">
      <div class="card-title">
        <h3 class="mb-0"><b>${result.name}<b></h3>
      </div>
        <div class="card-body">
          <div class="container">
             <div class="row justify-content-center">
               <div class="col-xs-3 col-xs-offset-3">
                  <div class="input-group number-spinner">
                      <span class="input-group-btn">
                           <button class="btn btn-default" data-dir="dwn" id="btn-${idx}"><span class="fa fa-minus"></span></button>
                      </span>
                      <input type="number" class="form-control text-center" min="5" max="" value="5">
                      <span class="input-group-btn">
                           <button class="btn btn-default" data-dir="up"><span class="fa fa-plus"></span></button>
                      </span>
                  </div>
               </div>
           </div>
      </div>
          <button class="btn btn-info btn-lg btn-block" style="margin-top: 1rem" ">Start</button>
        </div>
      </div>
    `;

    // Append newyly created card element to the container
    container.innerHTML += cardContent;
  })
}


$(document).on('click', '.number-spinner button', function () {
	var btn = $(this),
		oldValue = btn.closest('.number-spinner').find('input').val().trim(),
		newVal = 0;

	if (btn.attr('data-dir') == 'up') {
		newVal = parseInt(oldValue) + 1;
	} else {
		if (oldValue > 5) {
			newVal = parseInt(oldValue) - 1;
		} else {
			newVal = 5;
		}
	}
	btn.closest('.number-spinner').find('input').val(newVal);
});
