let question_field = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.answer')
let container_h3 = document.querySelector('.container_h3')
let main = document.querySelector(".main")
let btns = document.querySelector(".btns")
let btnf = document.querySelector(".btnf")


function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


let signs = ['+', '-', '*', '/']
function getRandomSign() {
    return signs[randint(0, 3)]
}


function shfl(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

class Question {
    constructor() {
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') { Math.round(this.correct = a + b) }
        else if (sign == '-') { Math.round(this.correct = a - b) }
        else if (sign == '*') { Math.round(this.correct = a * b) }
        else if (sign == '/') { Math.round(this.correct = a / b) }
        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this
                .correct - 15, this.correct - 1),
            this.correct,
            randint(this.correct + 1, this.correct + 15),
            randint(this.correct + 1, this.correct + 15),
        ]
        shfl(this.answers)
    }

    display() {
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1) {
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}

let correct_answers_given = 0
let total_answers_given = 0
let current_question 
btns.addEventListener("click", () => {
    btns.style.display = "none"
    btnf.style.display = "none"
    container_h3.style.display = "none"
    main.style.display = "block"

    current_question = new Question()
    current_question.display()

    correct_answers_given = 0
    total_answers_given = 0

    setTimeout(() => {
        main.style.display = "none"
        container_h3.style.display = "block"
        container_h3.innerHTML =
            `Ви дали ${correct_answers_given} правильних відповідей із ${total_answers_given}.
        Точність - ${Math.round(correct_answers_given * 100 / total_answers_given)} %.`
        btnf.style.display = "block"
    }, 10000)
})

Array.from(answer_buttons, ((button) => {
    button.addEventListener('click', () => {
        if (button.innerHTML == current_question.correct) {
            correct_answers_given += 1
            button.style.background = "#00FF00"
        } else {
            button.style.background = "#FF0000"
        }
        total_answers_given += 1

        anime({
            targets: button,
            backgroundColor: "#E5E5E5",
            duration: 500,
            delay: 100,
            easing: 'linear'
        })

        current_question = new Question()
        current_question.display()
    })
}))

btnf.addEventListener("click", () => {
    btns.style.display = "block"
    btnf.style.display = "none"
    container_h3.style.display = "none"
    main.style.display = "none"
})
