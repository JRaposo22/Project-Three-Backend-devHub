function Quiz(questions, type){

    while(i < 10){

        let randomNumbers = [];
        let quiz = [];
        let i = 0;
        let random = 0;

        if(type === 'general'){
            
        random = Math.floor(Math.random() * questions.length + 1);
        if(!randomNumbers.includes(random)) {
        randomNumbers.push(random);
        quiz.push(questions[random]);
        i++;

        }
       }else if (type === 'javascript'){

    }

}


module.exports = filterQuiz;
