import React from 'react';

class QuizAnswersGame extends React.Component{
    constructor(props){
        super(props);
        this.state={
            whichImg: 0,
            possAns: ["Antonio Banderas","Christian Bale"],
            corrAns: "",
            points: 0,
            timeForAnswer:9,
            number: 0,
            numberControl: false,
            imgSrc: ["http://www.dailygossip.org/wp-content/uploads/2017/03/antonio-banderas.jpg", "https://www.alux.com/wp-content/uploads/2017/04/Christian-Bale-Net-Worth.jpg"]
        };
    }

    componentWillMount(){
        this.setState({
            corrAns: this.state.possAns[this.state.whichImg],
        })
    }

    componentDidMount(){
        //Start Game
        this.intervalId = setInterval(()=>{

            //Set random numbers and timer
            this.setState({
                number1: Math.floor(Math.random() * (10 )) + 1,
                number2: Math.floor(Math.random() * (10 )) + 1,
                timeForAnswer: 9
            });


            //Starts timer - timeForAnswer
            this.answerTimeId = setInterval(()=>{
                this.setState({
                    timeForAnswer: this.state.timeForAnswer - 1
                });
            },1000);

            //Get user answer and compare results
            this.timeoutId = setTimeout(()=>{
                if(this.state.result === parseInt(this.state.number)){
                    clearInterval(this.answerTimeId);
                    this.setState({
                        points: this.state.points + 1,
                    });
                    clearTimeout(this.timeoutId);
                } else {
                    clearInterval(this.answerTimeId);
                    this.setState({
                        message: 'Koniec gry',
                        numberControl: true
                    });
                    clearTimeout(this.timeoutId);
                    clearInterval(this.intervalId);
                }
            },9000);
        },10000);
    }

    componentWillUnmount(){
        clearTimeout(this.timeoutId);
        clearInterval(this.intervalId);
        clearInterval(this.answerTimeId);
    }


    handleClick = (e, index) => {

        if (e.target.innerText.indexOf(this.state.corrAns)!==-1){
            console.log("dobra odp");

            let points=this.state.points++;
            let whichImg = this.state.whichImg===0 ? 1 : 0;
            //console.log('whichImage',whichImg);
            let possibleCopy = this.state.possAns.slice();
            let newCorr = possibleCopy[whichImg];
            this.setState({
                points: points,
               
                whichImg: whichImg,
                corrAns: newCorr
                
            })


            //console.log("z klika : which Img", this.state.whichImg);
            //console.log("z klika : corrAns", this.state.corrAns);
            //console.log("z klika : possAns", this.state.possAns);

        } else {
            console.log("zla odp");
            this.setState({
                numberControl: true
            });
        } 

    }

    render(){

            // console.log("z rendera : which Img", this.state.whichImg);
            // console.log("z rendera : corrAns", this.state.corrAns);
            // console.log("z rendera : possAns", this.state.possAns);



        let arrayOptions= ["Antonio Banderas","Leonardo diCaprio","Christian Bale","Eddie Redmayne"];                              
        let options = arrayOptions.map((item,index) => {
            return <p key={index+1} onClick={ e => this.handleClick(e, index) } >{index+1}. {item}</p>
        })

        

        if (this.state.numberControl ===true) {
            this.style= {
                opacity: 1
            }
        } else {
            this.style={
            opacity: 0
            }
        }

        this.quizImageSrc = this.state.imgSrc[this.state.whichImg];

        return (
            <div>
                <div className="quiz" id="quiz">
                    <div className="main-slider-slides-cnt">
                        <div className="main-slide active">
                            <div className="cover">
                                <div className="coverRed" style={this.style}>

                                    <p>GAME OVER<br/><br/>
                                    <span>Points gained: {this.state.points}</span></p>
                                </div>
                                <img className="main-slide-image" src={this.quizImageSrc} />
                            </div>
                            <div className="quizInfo">You have 9 seconds to choose the correct answer. Who is in the picture?</div>
                            <div className="quizPoints">Points: {this.state.points}</div>
                            <div className="quizTime">Time left: 00:0{this.state.timeForAnswer}</div>
                            <div className="quiz-text">
                                {options}

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}


class Quiz extends React.Component{
    constructor(props) {
        super(props);
        this.state = {  
            timeLeft: 9,  
        }
    }

    render(){

        return <div className="container">
            
            <QuizAnswersGame />
        </div>
    }
}

export {Quiz}