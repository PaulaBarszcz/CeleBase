import React from 'react';

class QuizAnswersGame extends React.Component{
    constructor(props){
        super(props);
        this.state={
            possNameSurnames: [],
            possPhotos: [],
            possNationalities: [],
            possImdbs: [],
            possGender: [],
            actualGender: 0,
            males: [],
            females: [],
            quizImageSrc: "",
            corrAns: "",
            points: 0,
            timeForAnswer:9,
            gameOver: false,
            style: {},
            redWidth: "100%",
            redHeight: "100%",
            objList: [],
            objLength: 0,
            currentId: 0,
            options: []
        };
    }

    componentDidMount() {

        this.objList = [];            
        fetch(`https://celebase-project.firebaseio.com/Actors.json`).then( r =>   r.json() ).then( response => {

            this.objList.push(response);
            this.objLength = response.length;
            
            const males = response.filter(item => {
                return item.gender=="male";
            });
            
            const females = response.filter(item => {
                return item.gender=="female";
            });

            this.setState({
                males: males,
                females: females
            })

            this.generateNewPhoto();
        });
    }

    startTimer = () => {
        clearInterval(this.answerTimeId);

        this.answerTimeId = setInterval(()=>{
            this.setState({
                timeForAnswer: this.state.timeForAnswer - 1
            });

            if (this.state.timeForAnswer===0){
                clearInterval(this.answerTimeId);
                this.image = document.querySelector(".main-slide-image");
                this.setState({
                    gameOver: true,
                    style: {
                        display: "block"
                    }
                })
            }
        },1000);
    }

    handleStart = () => {

        if (this.state.gameOver=== false) {
            this.generateNewPhoto();
            this.generateNewAns();
            this.startTimer();
            this.setState({
                points: 0,
                timeForAnswer:9,
                infoForNewGame: ""
            })
        } else {
  
            let randomNumber = Math.floor(Math.random()*(this.state.males.length + this.state.females.length));
            this.generateNewPhoto();
            this.generateNewAns();
            this.setState({
                gameOver: false,
                timeForAnswer:9,
                points: 0,
                currentId: randomNumber,
                infoForNewGame: ""
            })
        }
        this.image = document.querySelector(".main-slide-image");
        this.setState({
            redWidth: this.image.clientWidth,
            redHeight: this.image.clientHeight
        })

        clearInterval(this.answerTimeId);
        this.startTimer();
    }

    componentWillUnmount(){
        clearInterval(this.answerTimeId);
    }

    handleClickOption = (e, index) => {

        if (this.state.gameOver==false){
            
            if (e.target.innerText.indexOf(this.state.corrAns) !== -1) {
            this.setState({
                timeForAnswer: 9,
                points: this.state.points+1,
                infoForNewGame: ""
            })
            clearInterval(this.answerTimeId);
            this.startTimer();
            this.generateNewPhoto();
            this.generateNewAns();

            } else {
                this.setState({
                    gameOver: true
                })
            }

        } else {
            this.setState({
                    infoForNewGame: "Kliknij start, żeby ponownie rozpocząć grę"
            })
        }   
    }

    generateNewPhoto = () => {

        let randomNumber = Math.floor(Math.random()*(this.state.males.length + this.state.females.length));

        if (randomNumber < this.state.males.length){
            this.actualGender = 0;
            let randomId = Math.floor(Math.random()*this.state.males.length);
            this.randomId = randomId;
            this.setState({
                actualGender: 0,
                currentId: randomId,
                quizImageSrc: this.state.males[randomId].photo,
                corrAns: this.state.males[randomId].surname
            })

        }else {
            this.actualGender = 1;
            let randomId = Math.floor(Math.random()*this.state.females.length);
            this.randomId = randomId;
            this.setState({
                actualGender: 1,
                currentId: randomId,
                quizImageSrc: this.state.females[randomId].photo,
                corrAns: this.state.females[randomId].surname
            })
        } 
        this.image = document.querySelector(".main-slide-image");
        this.setState({
            redWidth: this.image.clientWidth,
            redHeight: this.image.clientHeight
        })
    }

    generateNewAns = () => {

        function shuffleArray(d) {
                for (var c = d.length - 1; c > 0; c--) {
                    var b = Math.floor(Math.random() * (c + 1));
                    var a = d[c];
                    d[c] = d[b];
                    d[b] = a;
                }
                return d
            };

        let optionsId = [];
        optionsId.push(this.randomId);

        if (this.actualGender==0){
            while (optionsId.length < 4) {
                let num = Math.floor(Math.random()*this.state.males.length);
                if(optionsId.indexOf(num) == -1){
                    optionsId.push(num);
                } else {
                    optionsId = optionsId;
                }
            } // end of while (filling optionId array with numbers)

            shuffleArray(optionsId);
  

            this.options = optionsId.map((item, index) => {
                return <p key={index} onClick={ e => this.handleClickOption(e, index)}>{this.state.males[item].name} {this.state.males[item].surname}</p>
            });

            this.setState({
                options: this.options,
                corrAns: this.state.males[this.randomId].surname
            })

        } else {
            while (optionsId.length < 4) {
                let num = Math.floor(Math.random()*this.state.females.length);
                if(optionsId.indexOf(num) == -1){
                    optionsId.push(num);
                } else {
                    optionsId = optionsId;
                }
            } // end of while (filling optionId array with numbers)

            shuffleArray(optionsId);
 
            this.options = optionsId.map((item, index) => {
                return <p key={index} onClick={ e => this.handleClickOption(e, index)}>{this.state.females[item].name} {this.state.females[item].surname}</p>
            });

            this.setState({
                options: this.options,
                corrAns: this.state.females[this.randomId].surname
            })
        }
    }

    render(){

        if (this.state.gameOver ===true) {
        this.image = document.querySelector(".main-slide-image");

            this.style= {
                display: "block",
                width: this.image.clientWidth +'px',
                height: this.image.clientHeight +'px',
            }
            clearInterval(this.answerTimeId);

        } else {
            this.style={
            display: "none",
            }
        }
        
        return (
            <div>
                <div className="quiz" id="quiz">
                    <div className="main-slider-slides-cnt">
                        <div className="main-slide active">
                            <div className="cover">
                                <div className="coverRed"style={this.style} >
                                    <p>GAME OVER<br/><br/>
                                    <span>Points gained: {this.state.points}</span></p>
                                </div>
                                <img className="main-slide-image" 
                                src={this.state.quizImageSrc} />
                            </div>
                            
                            <div className="quizInfo">Who is in the picture? You have 9 seconds to decide.</div><br/><br/>
                            <div className="quizPoints">Points: {this.state.points}</div>
                            <div className="quizTime">Time left: 00:0{this.state.timeForAnswer}</div>
                            <button className="startButton" onClick={this.handleStart}>START</button>
                            <div className="quiz-text">
                                {this.state.options}
                            </div>
                            <h1>{this.state.infoForNewGame}</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Quiz extends React.Component{

    render(){
        return <div className="container">
            <QuizAnswersGame />
        </div>
    }
}

export {Quiz}