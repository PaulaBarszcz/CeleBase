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
            currentId: 0
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

            let randomNumber = Math.floor(Math.random()*response.length);
            console.log('randomNumber',randomNumber);

            if (randomNumber < males.length){
                console.log("males");
                let randomId = Math.floor(Math.random()*males.length);
                this.setState({
                    actualGender: 0,
                    currentId: randomId,
                    quizImageSrc: males[randomId].photo
                })
            }else {
                console.log("females");
                let randomId = Math.floor(Math.random()*females.length);
                this.setState({
                    actualGender: 1,
                    currentId: randomId,
                    quizImageSrc: females[randomId].photo
                })
            }

            
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
            this.generateNewAns();
            this.startTimer();
            this.setState({
                timeForAnswer:9,
                })

        } else {
            let newId = Math.ceil(Math.random()*this.state.objLength);
            console.log('newId',newId);
            this.setState({
                numberControl: false,
                timeForAnswer:9,
                points: 0,
                currentId: newId
                })
            }
            clearInterval(this.answerTimeId);
            this.startTimer();
    }

    componentWillUnmount(){
        clearInterval(this.answerTimeId);
    }

    handleClickOption = (e, index) => {

        
    }

    generateNewAns = () => {
        
    }

    render(){

        console.log('this.state.actualGender',this.state.actualGender);
        console.log('this.state.currentId',this.state.currentId);
        
        
        if (this.state.gameOver ===true) {
            this.style= {
                display: "block",
                width: this.redWidth,
                height: this.redHeight,
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
                            </div>
                            <img className="main-slide-image" 
                                src={this.state.quizImageSrc} />
                            <div className="quizInfo">Who is in the picture? You have 9 seconds to decide.<br/></div>
                             <button className="startButton" onClick={this.handleStart}>START</button>
                            <div className="quizPoints">Points: {this.state.points}</div>
                            <div className="quizTime">Time left: 00:0{this.state.timeForAnswer}</div>
                            <div className="quiz-text">
                                fourLis
                            </div>
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