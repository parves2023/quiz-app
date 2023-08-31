const restartbutton = document.querySelector("#restartbutton");
const quitbutton = document.querySelector("#quitbutton");

const squiz = document.querySelector(".squiz");
const RulesBox = document.querySelector(".rulesbox");
const exitquiz = document.querySelector(".exitbutton");
const conbutton = document.querySelector(".conbutton");
const activeque = document.querySelector(".questions");
const myoptions = document.querySelector(".myoptions");
const timecount = document.querySelector(".Timecount .seconds");
const timeline = document.querySelector(".queheader .timelines");

const myquizapp = document.querySelector(".MyQuizApp");
const theque = document.querySelector(".theque");





squiz.onclick = () => {
    RulesBox.classList.add("activeInfo");
}
exitquiz.onclick = () => {
    RulesBox.classList.remove("activeInfo");

}


conbutton.onclick = () => {
    RulesBox.classList.remove("activeInfo");
    activeque.classList.add("activequiz");
    que(0);
    starttimer(15);
    starttimerline(0);
}

let quecount = 0;
let counter;
let timevalue = 15;

let counterline;
let widthvalue = 0;

let userscore = 0;



const nextbtn = document.querySelector(".nextbtn");

const resultbox = document.querySelector(".resultbox");
const restartquiz = document.querySelector(".buttons .restart1");
const quitquiz = document.querySelector(".buttons .quit");
let demo = document.querySelector("#demo");


quitbutton.onclick = () => {
    window.location.reload();

}
restartbutton.onclick = () => {

    resultbox.classList.remove("activeresult");
    activeque.classList.add("activequiz");
    quecount = -1;
    que(0);
    userscore = 0;
    if(quecount < 0){
        nextbtn.innerText = `Click Me`;
    };
    
    // myquizapp.classList.add("myquizactive");
    // starttimerline(0);
    // starttimer(15);
    
    

    // if(quecount = -1){
    //     demo.innerHTML = <h3>press to start</h3>;
    // }
// timevalue = 15;
// widthvalue = 0;
// userscore = 0;
// activeque.classList.add("activequiz");
// resultbox.classList.remove("activeresult");
   

}

function quitfunc(){
    location.reload();
}










nextbtn.onclick = ()=> {
    if(quecount < questions.length - 1){
        quecount++
        que(quecount)
        clearInterval(counter);
        starttimer(timevalue);

        clearInterval(counterline);
        starttimerline(widthvalue);
        nextbtn.style.display = "none";
    }else{
        console.log("you have compleate  your task");
        showresultbox();
        // activeque.classList.remove("activequiz");

    }
}










let demu = `<h3>press to start</h3>`;

function que(index) {
    const myoptions = document.querySelector(".myoptions")
    quetag = "<span>" + questions[index].numb + '.' + questions[index].question + "</span>";
    theque.innerHTML = quetag;
    theque.classList.add("text1");

    let optag = `<div class="options"> ${questions[index].options[0]} </div>` + `<div class="options"> ${questions[index].options[1]} </div>` + `<div class="options"> ${questions[index].options[2]} </div>` + `<div class="options"> ${questions[index].options[3]} </div>`;
    myoptions.innerHTML = optag;


    const totalque = document.querySelector(".totalque");
    let quenum = `<p> ${quecount + 1} of 5 Questions</p>`;
    totalque.innerHTML = quenum;

    



    const option = myoptions.querySelectorAll(".options");
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionselected(this)");
    }
}




let righticon = `<div class="tickicon"><i class="fas fa-check"></i></div>`;
let crossicon = `<div class="crossicon"><i class="fas fa-times"></i></div>`;






function optionselected(ans){
    clearInterval(counter);
    clearInterval(counterline);
    let useran =ans.textContent;
    let userans = useran.trim();
    let corans = questions[quecount].answer;

    let allop = myoptions.children.length;
    for(let i = 0; i < allop; i++){
        myoptions.children[i].classList.add("disabled");
    }
    nextbtn.style.display = "block";


    if(userans == corans){
        ans.classList.add("correct");
        console.log("correct");
        userscore += 1;
        console.log(userscore);
        ans.insertAdjacentHTML("beforeend", righticon);
    }else{
        ans.classList.add("incorrect");
        console.log("incorrect");
        ans.insertAdjacentHTML("beforeend", crossicon);


        for(let i = 0; i < allop; i++){
            let x = myoptions.children[i].textContent;
            let y = x.trim();
            if(y == corans){
                myoptions.children[i].setAttribute("class", "options correct");
                myoptions.children[i].insertAdjacentHTML("beforeend", righticon);;
            }
        }
    }
}

const scoretext = document.querySelector(".scoretext")
function showresultbox(){
    RulesBox.classList.remove("activeinfo");
    activeque.classList.remove("activequiz");
    resultbox.classList.add("activeresult");

    let goodscore = `<span>Congratulations 👌 You got <p>${userscore}</p> Out Of <p>5</p></span> `;
    let badscore = `<span>carry on 👏 You got <p>${userscore}</p> Out Of <p>5</p></span> `;

    if(userscore <= 2){
        scoretext.innerHTML = badscore;

    }else{
        scoretext.innerHTML = goodscore;
    }

}








const section = document.querySelector(".section")



function starttimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timecount.textContent = time;
        time--;
        if(time > 0){
            section.classList.remove("notocuh");

        }

        if(time < 9){
            let addzero = timecount.textContent;
            timecount.textContent = 0 + addzero;
        }
        if(time < 0){
            clearInterval(counter);
            timecount.textContent = "00";


            section.classList.add("notocuh");
            nextbtn.style.display = "block";







        }
    }
}


function starttimerline(time){
    counterline = setInterval(timer, 50);
    function timer(){
        time += 1;
        timeline.style.width = time + "px";
        if (time > 319){
            clearInterval(counterline);
        }

    }
}
