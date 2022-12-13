const info_box= document.querySelector(".info_box");
const continue_btn= info_box.querySelector(".buttons .restart");
const quit_btn= info_box.querySelector(".buttons .quit");
const body = document.querySelector('body');
const quiz_box= document.querySelector(".quiz_box");
const next_btn= document.querySelector("footer .next_btn");
const time_left_txt=document.querySelector(".timer .time_left_txt");
const timer_sec=document.querySelector(".timer .timer_sec");
const time_line=document.querySelector(".time_line");
const option_list=document.querySelector(".option_list");
const que_text= document.querySelector(".que_text");
const score_text=document.querySelector(".score_text");
const result_box= document.querySelector(".result_box");
const restart=document.querySelector(".resultbuttons .restart");
const quit=document.querySelector(".resultbuttons .quit");
const result_btn=document.querySelector(".result_btn");


let question_number=0;
let question_count=1;
let timer;
let liner;
let index;
let time_close;
let userScore=0;
let tickemoji= '<div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkgreen" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/></svg</div>';
let wrongemoji= '<div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/></svg> </div>';

let correct_answer;
  function showquestions(index){

    axios.get('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple')
    .then(res=>{
      console.log(res);
      let questions =[
        {
        number: 1,
        question: res.data.results[0].question ,
        answer: res.data.results[0].correct_answer,
        options: [
          res.data.results[0].correct_answer,
          res.data.results[0].incorrect_answers[0],
          res.data.results[0].incorrect_answers[1],
          res.data.results[0].incorrect_answers[2]
        ]
      },
        
      {
        number: 2,
        question: res.data.results[1].question,
        answer: res.data.results[1].correct_answer,
        options: [
          res.data.results[1].incorrect_answers[0],
          res.data.results[1].correct_answer,
          res.data.results[1].incorrect_answers[1],
          res.data.results[1].incorrect_answers[2]
        ]
      },
      
      {
        number: 3,
        question: res.data.results[2].question,
        answer: res.data.results[2].correct_answer,
        options: [
          res.data.results[2].incorrect_answers[0],
          res.data.results[2].correct_answer,
          res.data.results[2].incorrect_answers[1],
          res.data.results[2].incorrect_answers[2]
        ]
      },
      
      {
        number: 4,
        question: res.data.results[3].question,
        answer: res.data.results[3].correct_answer,
        options: [
          res.data.results[3].incorrect_answers[1],
          res.data.results[3].incorrect_answers[0],
          res.data.results[3].incorrect_answers[2],
          res.data.results[3].correct_answer
        ]
      },
      
      {
        number: 5,
        question: res.data.results[4].question,
        answer: res.data.results[4].correct_answer,
        options: [
          res.data.results[4].correct_answer,
          res.data.results[4].incorrect_answers[1],
          res.data.results[4].incorrect_answers[2],
          res.data.results[4].incorrect_answers[0]
        ]
      },
      
      {
        number: 6,
        question: res.data.results[5].question,
        answer: res.data.results[5].correct_answer,
        options: [
          res.data.results[5].incorrect_answers[2],
          res.data.results[5].correct_answer,
          res.data.results[5].incorrect_answers[1],
          res.data.results[5].incorrect_answers[0]
        ]
      },
      
      {
        number: 7,
        question: res.data.results[6].question,
        answer: res.data.results[6].correct_answer,
        options: [
          res.data.results[6].incorrect_answers[2],
          res.data.results[6].incorrect_answers[1],
          res.data.results[6].correct_answer,
          res.data.results[6].incorrect_answers[0]
        ]
      },
      
      {
        number: 8,
        question: res.data.results[7].question,
        answer: res.data.results[7].correct_answer,
        options: [
          res.data.results[7].incorrect_answers[0],
          res.data.results[7].incorrect_answers[2],
          res.data.results[7].correct_answer,
          res.data.results[7].incorrect_answers[1]
        ]
      },
      
      {
        number: 9,
        question: res.data.results[8].question,
        answer: res.data.results[8].correct_answer,
        options: [
          res.data.results[8].correct_answer,
          res.data.results[8].incorrect_answers[0],
          res.data.results[8].incorrect_answers[1],
          res.data.results[8].incorrect_answers[2]
        ]
      },
      
      {
        number: 10,
        question: res.data.results[9].question,
        answer: res.data.results[9].correct_answer,
        options: [
          res.data.results[9].incorrect_answers[1],
          res.data.results[9].incorrect_answers[0],
          res.data.results[9].incorrect_answers[2],
          res.data.results[9].correct_answer
        ]
      }
      ];
     correct_answer=questions[question_number].answer;
      const que_text= document.querySelector(".que_text");
    let que_template= '<span>'+ questions[index].number+ ". " + questions[index].question + '</span>';
    let option_template= '<div class="option two">'+ questions[index].options[0]+'</div>'+ '<div class="option ">'+ questions[index].options[1] +'</div>'+''+
    '<div class="option two">'+  questions[index].options[2]+'</div>'+'<div class="option ">'+  questions[index].options[3]+'</div>';
    que_text.innerHTML=que_template;
    option_list.innerHTML=option_template;

    next_btn.classList.remove("show");

    const option= option_list.querySelectorAll(".option");
   
    for(i=0 ; i<option.length ; i++){
      option[i].setAttribute("onclick","option_selected(this)");
    }
      // const questiont= res.data.results[index].question;
      // const options=[ res.data.results[index].incorrect_answers[0], res.data.results[index].incorrect_answers[1], res.data.results[index].incorrect_answers[2], res.data.results[index].correct_answer];
      // const option1= res.data.results[0].incorrect_answers[0];
      // const option2= res.data.results[0].incorrect_answers[1];
      // const option3= res.data.results[0].incorrect_answers[2];
      // const option4= res.data.results[0].correct_answer;
      // correct_answer=res.data.results[0].correct_answer;
      // que_template= '<span>'+ questions[index].number+ ". " + questiont + '</span>';
      // let option_template= '<div class="option two">'+ options[Math.floor(Math.random() *3)]+'</div>'+ '<div class="option ">'+ options[Math.floor(Math.random() *2)] +'</div>'+''+
      // '<div class="option two">'+ options[Math.floor(Math.random() *1)]+'</div>'+'<div class="option ">'+  options[Math.floor(Math.random() *0)+1]+'</div>';
      // que_text.innerHTML=que_template;
      // option_list.innerHTML=option_template;

      // next_btn.classList.remove("show");

      // const option= option_list.querySelectorAll(".option");
     
      // for(i=0 ; i<option.length ; i++){
      //   option[i].setAttribute("onclick","option_selected(this)");
      // }
   })
   .catch(err=>{
     console.log("ERROR",err)
   })

    // const que_text= document.querySelector(".que_text");
    // let que_template= '<span>'+ questions[index].number+ "." + questions[index].question + '</span>';
    // let option_template= '<div class="option two">'+ questions[index].options[0]+'</div>'+ '<div class="option ">'+ questions[index].options[1] +'</div>'+''+
    // '<div class="option two">'+  questions[index].options[2]+'</div>'+'<div class="option ">'+  questions[index].options[3]+'</div>';
    // que_text.innerHTML=que_template;
    // option_list.innerHTML=option_template;

    // next_btn.classList.remove("show");

    // const option= option_list.querySelectorAll(".option");
   
    // for(i=0 ; i<option.length ; i++){
    //   option[i].setAttribute("onclick","option_selected(this)");
    // }
  
} 


quit_btn.onclick=()=>{
    window.history.go(-1);
}

quit.onclick=()=>{
  window.history.go(-1);
}
continue_btn.onclick=()=>{
    body.classList.remove('abc');
    body.classList.add('bg');
    quiz_box.classList.add('activeQuiz');
    info_box.classList.add('activeInfo');
    showquestions(question_number);
    question_counter(question_count);
    start_time(15);
    start_timerline(0);
}

// function showquestions(index){
//     const que_text= document.querySelector(".que_text");
//     let que_template= '<span>'+ questions[index].number+ "." + questions[index].question + '</span>';
//     let option_template= '<div class="option two">'+ questions[index].options[0]+'</div>'+ '<div class="option ">'+ questions[index].options[1] +'</div>'+''+
//     '<div class="option two">'+  questions[index].options[2]+'</div>'+'<div class="option ">'+  questions[index].options[3]+'</div>';
//     que_text.innerHTML=que_template;
//     option_list.innerHTML=option_template;

//     next_btn.classList.remove("show");

//     const option= option_list.querySelectorAll(".option");
   
//     for(i=0 ; i<option.length ; i++){
//       option[i].setAttribute("onclick","option_selected(this)");
//     }
  
// } 

function option_selected(choosed_answer){

  clearInterval(liner);
  clearInterval(timer);
  let users_answser=choosed_answer.textContent;
  // let correct_answer=questions[question_number].answer;

  if(users_answser == correct_answer){
    userScore+=1;
    choosed_answer.classList.add("correct");
    choosed_answer.insertAdjacentHTML("beforeend", tickemoji);
  }
  else{
    choosed_answer.classList.add("incorrect");
    choosed_answer.insertAdjacentHTML("beforeend", wrongemoji);

      for(i=0;i<option_list.children.length;i++){
        let auto_answer=option_list.children[i].textContent;
        if(auto_answer==correct_answer){
          option_list.children[i].classList.add("correct");
        }
      }
  }
  console.log(question_count);
  for(i=0;i<option_list.children.length;i++){
      option_list.children[i].classList.add("disabled");
  }
   if(question_count<10){
   next_btn.classList.add("show");
   }
   else {
     showresult(userScore);
   }
}



function question_counter(index){
    const total_que= document.querySelector("footer .total_que");
    let que_count= '<span>'+ index + " of 10"+'</span>';
    total_que.innerHTML=que_count;
}

function start_time(index){
    timer=setInterval(time,1000);
    function time(){
        timer_sec.innerHTML=index;
        index--;
            if(index<0){
            clearInterval(timer);
            // let correct_answer=questions[question_number].answer;
            for(i=0;i<option_list.children.length;i++){
              let auto_answer=option_list.children[i].textContent;
              if(auto_answer==correct_answer){
                option_list.children[i].classList.add("correct");
              }
            }
              for(i=0;i<option_list.children.length;i++){
                option_list.children[i].classList.add("disabled");
            }
             if(question_count<10){
             next_btn.classList.add("show");
             }
            }
             else {
               if(question_count==10 && index==0){
              //  result_btn.classList.add("result_show");
                showresult(userScore);
            }

             }
          }
    }


function start_timerline(index){
  liner=setInterval(timeline,19);
  function timeline(){
    time_line.style.width = index + "px";
    index++;
    if(index>798){
      clearInterval(liner);
    }
  }
}

next_btn.onclick=()=>{
  if(question_number<=10){
    showquestions(question_number+=1);
    question_counter(question_count+=1);
    clearInterval(timer);
    start_time(15);
    clearInterval(liner);
    start_timerline(0);
  }
  else{
      showresult(userScore);
    }
}

function showresult(index){
  clearInterval(timer);
  clearInterval(liner);
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  let total_score= '<div class="score_n">'+ "Your score is "+ index+'</div>';
  if(index>5){
    score_text.innerHTML=total_score + '<span>'+'<div class="score_text">'+"You performed well in the quiz"+'<div>'+'</span>';
    result_box.style.backgroundImage = "url('../Images/pass.png')";
}
else{
  score_text.innerHTML=total_score + '<span>'+ '<div class="score_text">'+"Better Luck Next Time"+'<div>'+'</span>';
  result_box.style.backgroundImage = "url('../Images/fail.png')";
}

 
  result_btn.classList.remove("result_show");

}

restart.onclick=()=>{
  quiz_box.classList.add("activeQuiz");
  clearInterval(liner);
  clearInterval(timer);
  userScore=0;
  start_time(15);
  start_timerline(0);
  question_count=1;
  question_number=0;
  userScore=0;
  showquestions(question_number);
  question_counter(question_count);
  result_box.classList.remove("activeResult");
  result_btn.classList.remove("result_show");
}

result_btn.onclick=()=>{
  showresult(userScore);
}





    
