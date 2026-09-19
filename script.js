//Counter y variables globales

const pizarraBody = document.getElementById("pizarraBody");

let counter = 0;
let counterPreguntas = 0;

// Estructura de datos------------------------------------------------
let arrayPreguntas = [
  {
    number: 1,
    question: "How many oceans does the planet have?",
    answer: [6, 4, 5, 7],
    correctAnswer: 5,
  },
  {
    number: 2,
    question:
      "Which country has the largest area in square meters in the world?",
    answer: ["China", "USA", "Brasil", "Rusia"],
    correctAnswer: "Rusia",
  },
  {
    number: 3,
    question: "On what date is Independence celebrated in Costa Rica?",
    answer: ["September 15th", "July 25th", "May 1st", "April 11th"],
    correctAnswer: "September 15th",
  },
  {
    number: 4,
    question:
      "Which operator is used to compare both value and type in JavaScript?",
    answer: ["==", "!=", "===", "!=="],
    correctAnswer: "===",
  },
  {
    number: 5,
    question:
      "Which method is used to write a message directly into the browser’s console?",
    answer: ["document.write()", "alert()", "console.log()", "print()"],
    correctAnswer: "console.log()",
  },
];

// Main menu------------------------------------------------
let mainMenuTemplate = `
       <section id="main_menu" class="menu layout">
                <div class="center">
                    <h1 class="center" id="modify">Quizz Time</h1>
                </div>
                <div class="container_buttons">
                    <h1 id="start_btn" ><a>Start</a></h1>
                    <h1 id="edit_btn" ><a>Edit</a></h1>
                </div>
            </section>`;

let insertMainMenu = function () {
  counter = 0;
  counterPreguntas = 0;
  pizarraBody.innerHTML = mainMenuTemplate;

  let editButton = document.getElementById("edit_btn");
  editButton.addEventListener("click", (event) => {
    event.stopPropagation();
    insertSectionEdit();
  });

  let quizzBtn = document.getElementById("start_btn");
  quizzBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    insertQuizz();
  });
};

insertMainMenu();

//Section for edit or new question------------------------------------------------

let insertSectionEdit = function () {
  let template = `
            <section id="edit_section" class="layout">
                <nav id="edit_nav">
                    <ul class="ul_horiz navB">
                        <li><a id="returnBtn">Return</a></li>
                        <li><a id="addQuestion">New +</a></li>
                    </ul>
                </nav>
                <ul id="editContent" class="quizz_questions edit_cont">

       

                </ul>
            </section>`;

  pizarraBody.innerHTML = template;
  insertQuestionArray(arrayPreguntas);
  document.getElementById("addQuestion").addEventListener("click", (event) => {
    event.stopPropagation();
    insertNewEditQuestion();
  });

  document.getElementById("returnBtn").addEventListener("click", (event) => {
    event.stopPropagation();
    insertMainMenu();
  });
};

let insertQuestionArray = function (obj) {
  let area = document.getElementById("editContent");
  area.innerHTML = "";
  obj.forEach((element) => {
    insertQuestion(element);
  });
};

let insertQuestion = function (obj) {
  let area = document.getElementById("editContent");
  let template = `
                  <div id='que_${obj.number}' class="edit_cont-grid">
                    <div class="edit_cont-grid-nav margin_bottom_16px">
                        <p>Question #<span data-questionNumber>${obj.number}</span></p>
                        <p><a href="#" id='edit_${obj.number}' class="font_size-normal">Edit</a>
                    </div>
                    <div class="edit_cont-grid-que margin_bottom_16px">
                        <p><i data-question>"${obj.question}"</i></p>
                    </div>
                    <div id="answers_${obj.number}" class="edit_cont-grid-answ">
                            <p data-answer=1>a) ${obj.answer[0]}</p>
                            <p data-answer=2>b) ${obj.answer[1]}</p>
                            <p data-answer=3>c) ${obj.answer[2]}</p>
                            <p data-answer=4>d) ${obj.answer[3]}</p>   
                    </div>

                    </div>`;
  area.insertAdjacentHTML("beforeend", template);
  let answerBox = document.getElementById(`answers_${obj.number}`);
  let index = obj.answer.indexOf(obj.correctAnswer);
  let hijos = answerBox.children;

  Array.from(hijos).forEach((el) => {
    if (el.dataset.answer == index + 1) el.classList.add("verde");
    else el.classList.add("rojo");
  });

  let editButton = document.getElementById(`edit_${obj.number}`);
  editButton.addEventListener("click", (event) => {
    event.stopPropagation();
    insertNewEditQuestion(obj);
  });
};

let insertNewEditQuestion = function (obj) {
  let template = `        
  <nav id="edit_nav">
                    <ul class="ul_horiz navB">
                        <li><a id="returnBtn">Return</a></li>
                    </ul>
                </nav>         
                        <form action="#" id="form">
                        <ul class="ul_vertical">
                        <p class="form-row"><label for="questionInput">Question:&nbsp;&nbsp;</label>
                                <input type="text" id="questionInput" name="questionInput" required value='${obj ? obj.question : " "}'>
                            </p>
                            <p class="form-row">
                                <label for="questionInputA"> Answer a):&nbsp;&nbsp;</label>
                                <input type="text" id="questionInputA" name="questionInputA" style="flex: 1" required value='${obj ? obj.answer[0] : " "}'>
                            </p>
                            <p class="form-row">
                                <label for="questionInputB"> Answer b):&nbsp;&nbsp;</label>
                                <input type="text" id="questionInputB" name="questionInputB" required value='${obj ? obj.answer[1] : " "}'>
                            </p>
                            <p class="form-row">
                                <label for="questionInputC"> Answer c):&nbsp;&nbsp;</label>
                                <input type="text" id="questionInputC" name="questionInputC" required value='${obj ? obj.answer[2] : " "}'>
                            </p>
                            <p class="form-row">
                                <label for="questionInputD"> Answer d):&nbsp;&nbsp;</label>
                                <input type="text" id="questionInputD" name="questionInputD" required value='${obj ? obj.answer[3] : " "}'>
                            </p>
                            <div>
                                <p for="correctAnswer">Choose the correct answer option</p>
                                <div class="radio_container">
                                <input type="radio" data-answer='0' id="ansA" name="correctChoice" value="a" required>
                                <label for="ansA">A</label><br>
                                <input type="radio" data-answer='1' id="ansB" name="correctChoice" value="b" >
                                <label for="ansB">B</label><br>
                                <input type="radio" data-answer='2' id="ansC" name="correctChoice" value="c" >
                                <label for="ansC">C</label><br>
                                <input type="radio" data-answer='3' id="ansD" name="correctChoice" value="d" >
                                <label for="ansD">D</label><br>
                                </div>
                            </div>
                        </ul>
                        <div class="saveButton">
    <button type="submit" id="saveButton" class='button'>Save</button>
</div>
                            
                        </form>`;

  pizarraBody.innerHTML = template;

  if (obj) {
    let correctRadio = obj.answer.indexOf(obj.correctAnswer);
    let correctRadioInput = document.querySelector(
      `input[data-answer="${correctRadio}"]`,
    );
    correctRadioInput.checked = true;
  }

  let returnBtn = document.getElementById("returnBtn");
  returnBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    insertSectionEdit();
  });

  let form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    modifyQuestionArray(obj ? obj.number : undefined);
  });
};

let modifyQuestionArray = function (questioNumber) {
  let question = document.getElementById("questionInput").value;
  let a = document.getElementById("questionInputA").value;
  let b = document.getElementById("questionInputB").value;
  let c = document.getElementById("questionInputC").value;
  let d = document.getElementById("questionInputD").value;
  let radioValue = document.querySelector(
    'input[name="correctChoice"]:checked',
  ).value;

  let ultimaPregunta = arrayPreguntas.at(-1);
  let nuevoNumero = ultimaPregunta.number + 1;

  let nuevaPregunta = {
    number: questioNumber ? questioNumber : nuevoNumero,
    question: question,
    answer: [a, b, c, d],
    correctAnswer:
      radioValue == "a"
        ? a
        : radioValue == "b"
          ? b
          : radioValue == "c"
            ? c
            : radioValue == "d"
              ? d
              : null,
  };

  let newArray = arrayPreguntas.map((obj) =>
    obj.number === nuevaPregunta.number ? nuevaPregunta : obj,
  );
  arrayPreguntas = newArray;

  questioNumber ? null : arrayPreguntas.push(nuevaPregunta);
  insertSectionEdit(arrayPreguntas);
};

//Quizz section-----------------------------------------------

let insertQuizz = function () {
  counter = 0;
  counterPreguntas = 0;
  let template = `
       <section class="quizz">
            <ul class="ul_horiz navB alignRight">
                        <li><a id="returnBtn">Return</a></li>
                    </ul>
                    <h1 class='margin_bottom_64px'>Start Quizz</h1>
        <ul id='quizz_questions' class="quizz_questions margin_bottom_128px">
            
        </ul>
       
        <div class='margin_bottom_32px'>
        <h2>Nota final : <span id='nota'></span></h2>
<h2>Total preguntas : <span id='que_asked'>0</span>/${arrayPreguntas.length}</h2>
        </div>
             
<button id='restratQuizz' type='button'>Restart Quizz</button>
       

     </section>`;

  pizarraBody.innerHTML = template;
  insertQuizzQuestions(arrayPreguntas);

  document.getElementById("returnBtn").addEventListener("click", (event) => {
    event.stopPropagation();
    insertMainMenu();
  });

  document.getElementById("restratQuizz").addEventListener("click", (event) => {
    event.stopPropagation();
    insertQuizz();
  });
};

let insertQuizzQuestions = function (obj) {
  let dataTotal = obj.length;
  obj.forEach((element) => {
    insertItemQuestion(element);
  });
};

let insertItemQuestion = function (el) {
  let area = document.getElementById("quizz_questions");

  let template = `
<li id='li_${el.number}'> 
<p>Question # ${el.number}</p>
<p class='margin_bottom_32px'>${el.question}</p>
<ul class='ul_question'>
    <li class="li_question"> <button type='button' class='button_question'><span class='answer_item'></span> A) <span class='answer_content'>${el.answer[0]}</span> </button></li>
    <li class="li_question"> <button type='button' class='button_question'><span class='answer_item'></span> B) <span class='answer_content'>${el.answer[1]}</span> </button></li>
    <li class="li_question"> <button type='button' class='button_question'><span class='answer_item'></span> C) <span class='answer_content'>${el.answer[2]}</span> </button></li>
    <li class="li_question"> <button type='button' class='button_question'><span class='answer_item'></span> D) <span class='answer_content'>${el.answer[3]}</span> </button></li>
</ul>
</li>
`;

  area.insertAdjacentHTML("beforeend", template);

  const parentElement = document.getElementById(`li_${el.number}`);
  const listItems = parentElement.querySelectorAll("li");

  listItems.forEach((li) => {
    li.addEventListener("click", (event) => {
      event.stopPropagation();
      reactToChoice(li, el);
    });
  });
};

let reactToChoice = function (el, all) {
  let liBtn = el;
  let element = liBtn.querySelector("span.answer_content").innerText;
  let item = liBtn.querySelector("span.answer_item");
  let button = liBtn.querySelector("button");
  let liComplet = document.getElementById(`li_${all.number}`);

  if (element == all.correctAnswer) {
    item.innerHTML = "&#10003;";
    button.classList.add("correct");
    counter += 1;
    counterPreguntas += 1;
  } else {
    item.innerHTML = "&times;";
    button.classList.add("wrong");
    counterPreguntas += 1;
  }

  liComplet.classList.add("unpressable-div");
  nota();
};

let nota = function () {
  let total = arrayPreguntas.length;
  let nota = (counter / total) * 100;
  document.getElementById("nota").innerText = nota.toFixed(1);
  document.getElementById("que_asked").innerText = counterPreguntas;
};
