import React from 'react';

class QuizAnswersGame extends React.Component{
    constructor(props){
        super(props);
        this.state={
            whichImg: 0,
            possAns: ["Antonio Banderas","Christian Bale","Morgan Freeman"],
            corrAns: "",
            points: 0,
            timeForAnswer:9,
            number: 0,
            numberControl: false,
            style: {},
            redWidth: "50vw",
            redHeight: "50vh",
            imgSrc: ["http://www.dailygossip.org/wp-content/uploads/2017/03/antonio-banderas.jpg", "https://www.alux.com/wp-content/uploads/2017/04/Christian-Bale-Net-Worth.jpg","http://www.trbimg.com/img-59301dcd/turbine/la-et-entertainment-news-updates-june-a-star-is-born-morgan-freeman-turns-80-1496268967"]
        };
    }

    handleResize = () => {
        // window.addEventListener("resize", () => {
        //     console.log("zmieniona wielkosc");
        //     this.image = document.querySelector(".main-slide-image");

        //     this.setState({
        //         redWidth: this.image.clientWidth,
        //         redHeight: this.image.clientHeight
        //     })
        // })
    }

    componentWillMount(){
        
        this.setState({
            corrAns: this.state.possAns[this.state.whichImg],
        })

        this.handleResize();
    }

    startTimer = () => {
        this.answerTimeId = setInterval(()=>{
            this.setState({
                timeForAnswer: this.state.timeForAnswer - 1
            });

            if (this.state.timeForAnswer===0){
                clearInterval(this.answerTimeId);
                this.setState({
                    numberControl: true,
                    style: {
                        opacity: 1 
                    }
                })
            }
        },1000);
    }

    handleStart = () => {

        if (this.state.numberControl=== false) {
            this.startTimer();

        } else {
            console.log("z handle start this.state.numberControl", this.state.numberControl );
            this.setState({
                numberControl: false,
                timeForAnswer:9,
                points: 0
                })
            }
            clearInterval(this.answerTimeId);
            this.startTimer();
    }

    componentWillUnmount(){
        clearInterval(this.answerTimeId);
    }

    handleClickOption = (e, index) => {

        this.chosenOpt= e.target.innerText;

        if (e.target.innerText.indexOf(this.state.corrAns)!==-1){
            let points=this.state.points+1;
            let randomId = Math.floor(Math.random() * (3 ));
            let whichImg = randomId;
            let possibleCopy = this.state.possAns.slice();
            let newCorr = possibleCopy[whichImg];

            this.setState({
                points: points,
                whichImg: whichImg,
                corrAns: newCorr,
                timeForAnswer: 9,
                numberControl: false
            })
            clearInterval(this.answerTimeId);
            this.startTimer();

        } else {
            this.setState({
                numberControl: true,
                style: {
                    opacity: 1,
                    redWidth: this.state.redWidth,
                    redHeight: this.state.redHeight
                }
            });
            clearInterval(this.answerTimeId);
        }
    }

    render(){
        if (document.readyState === "complete" 
        || document.readyState === "loaded" 
        || document.readyState === "interactive"){
                  
            this.image = document.querySelector(".main-slide-image");
            this.redWidth= this.image.clientWidth;
            this.redHeight= this.image.clientHeight;  
        }

        let arrayOptions= ["Antonio Banderas","Morgan Freeman","Christian Bale","Eddie Redmayne"];                              
        let options = arrayOptions.map((item,index) => {
            return <p key={index+1} onClick={ e => this.handleClickOption(e, index) } >{index+1}. {item}</p>
        })

        if (this.state.numberControl ===true) {
            this.style= {
                opacity: 1,
                width: this.redWidth,
                height: this.redHeight,
            }
            clearInterval(this.answerTimeId);

        } else {
            this.style={
            opacity: 0,
            }
        }

        this.quizImageSrc = this.state.imgSrc[this.state.whichImg];
        
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
                            <img className="main-slide-image" src={this.quizImageSrc} />
                            
                            <div className="quizInfo">Who is in the picture? You have 9 seconds to decide.<br/></div>
                             <button className="startButton" onClick={this.handleStart}>START</button>
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