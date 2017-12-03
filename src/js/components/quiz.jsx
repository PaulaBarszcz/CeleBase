import React from 'react';
import ImageLoader from 'react-load-image';

class QuizAnswersGame extends React.Component{
    constructor(props){
        super(props);
        this.state={
            alreadyAsked: [],
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
            gameWon: false,
            style: {},
            redWidth: "100%",
            redHeight: "100%",
            readyAndLoaded: false,
            objList: [],
            objLength: 0,
            currentId: 0,
            options: [],
            firstInfo: `Who is in the picture? You have 9 seconds to decide.`
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

            

        });
    }

    startTimer = () => {

        let ImageLoader = document.querySelector(".ImageLoader");

            if (ImageLoader !== null) {
   
            clearInterval(this.answerTimeId);
            this.answerTimeId = setInterval(()=>{
                let imageloader = document.querySelector(".imageloader");
                this.isPending = imageloader.classList.contains("imageloader-pending");
                this.isLoading = imageloader.classList.contains("imageloader-loading");
                this.isLoaded = imageloader.classList.contains("imageloader-loaded");
                        
                if (this.isLoading) {
                      
                    this.setState({
                        timeForAnswer: this.state.timeForAnswer
                    }); 
                }

                if (this.isLoaded) {
    
                    this.setState({
                        timeForAnswer: this.state.timeForAnswer - 1
                    }); 
                }

                if (this.state.timeForAnswer===0){
                    clearInterval(this.answerTimeId);
                    this.handleGameOver();
                    this.setState({
                        style: {
                            display: "block"
                        }
                    })
                }
            },1000);
        }
    }

    handleStart = () => {

        this.randomNumberOne= null;
        this.setState({
            gameWon: false
        }) 

        if (this.state.gameOver=== false) {

            this.generateNewPhoto();
            this.generateNewAns();
            this.startTimer();
            this.setState({
                points: 0,
                timeForAnswer:9,
                infoForNewGame: "",
                firstInfo: null
            }) 
                   

        } else {
  

            this.setState({
                alreadyAsked: [],
                gameOver: false,
                timeForAnswer:9,
                points: 0,
                infoForNewGame: ""
            })

            this.generateNewPhoto();
            this.generateNewAns();

        }

        clearInterval(this.answerTimeId);
        this.startTimer();
    }

    componentWillUnmount(){
        clearInterval(this.answerTimeId);
        window.removeEventListener('resize', event => {
            this.setState({
                redWidth: this.image.clientWidth,
                redHeight: this.image.clientHeight
            })
        });
    }

    handleGameOver = () => {

        this.image = document.querySelector(".quizImg");

        this.setState({
            gameOver: true,
            alreadyAsked: [],
            redWidth: this.image.clientWidth,
            redHeight: this.image.clientHeight
        });

        if (this.refs.MyRef) {

            window.addEventListener('resize', event => {
                this.setState({
                    redWidth: this.image.clientWidth,
                    redHeight: this.image.clientHeight
                })
            });
        }  

        
    }

    handleClickOption = (e, index) => {

        let totalLength = this.state.males.length + this.state.females.length;
        
        if (this.state.gameOver==false){
            this.setState({
                loaded: false
            })
            
            if (e.target.innerText.indexOf(this.state.corrAns) !== -1) {
                if (this.state.alreadyAsked.length !== totalLength) {
                    clearInterval(this.answerTimeId);
                    this.setState({
                        timeForAnswer: 9,
                        points: this.state.points+1,
                        infoForNewGame: ""
                    })
                    
                    this.generateNewPhoto();
                    this.generateNewAns();
                    this.startTimer();  
                } else {
                    this.setState({
                        gameOver: true,
                        gameWon: true,
                       
                        points: this.state.points+1
                       
                    })
                    this.handleGameOver();
                }  

            } else {
                clearInterval(this.answerTimeId);
                this.handleGameOver();
                this.setState({
                    style: {
                    display: "block"
                    }
                })
            }

        } else {
            this.setState({
                infoForNewGame: "Click START button to begin new game",
                alreadyAsked: [],
            })    
        }   
    }

    generateNewPhoto = () => {       


        let alreadyAsked = this.state.alreadyAsked.slice();
        let lengthAA = alreadyAsked.length;
        let lengthAAPlusOne = lengthAA + 1;

        let totalLength = this.state.males.length + this.state.females.length;
 

        while (lengthAA < lengthAAPlusOne) {
            this.randomNumberOne = Math.floor(Math.random()*(this.state.males.length + this.state.females.length));

            if (this.state.alreadyAsked.length === totalLength) {
                
                this.setState({
                    gameOver: true,
                    gameWon: true,
                    alreadyAsked: [],
                   
                })
                this.handleGameOver();
                
                lengthAA = lengthAA + 1;
            } else if (alreadyAsked.indexOf(this.randomNumberOne) == -1) {
                alreadyAsked.push(this.randomNumberOne);
                lengthAA = lengthAA + 1;
              
                this.randomNumber = this.randomNumberOne;
               
            } else {
                lengthAA = lengthAA;
  
            }
        } // end of while

        this.setState({
            alreadyAsked: alreadyAsked
        })

       


        if (this.randomNumber < this.state.males.length){
            this.actualGender = 0;
            let randomId = this.randomNumber;
            this.randomId = randomId;
            this.setState({
                actualGender: 0,
                currentId: randomId,
                quizImageSrc: this.state.males[randomId].photo,
                corrAns: this.state.males[randomId].surname
            })

        } else {
            this.actualGender = 1;
            let randomId = (this.randomNumber - this.state.males.length);
            this.randomId = randomId;
            this.setState({
                actualGender: 1,
                currentId: randomId,
                quizImageSrc: this.state.females[randomId].photo,
                corrAns: this.state.females[randomId].surname
            })
        }
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
        this.setState({
            loaded: true
        })
    }

    handleImageLoaded = () => {
        this.setState({
            loaded: true
        });
    }


    render(){
        
        let loader = document.querySelector(".ImageLoader")
            
        if (this.state.gameOver ===true) {
            this.style= {
                display: "block",
                width: this.state.redWidth +'px',
                height: this.state.redHeight +'px'
            }
        if (this.state.gameWon ===true) {
            this.style= {
                backgroundColor: "rgba(20, 142, 1, 0.5)",
                display: "block",
                width: this.state.redWidth +'px',
                height: this.state.redHeight +'px'
            }
        }
        clearInterval(this.answerTimeId);

        } else {
            this.style={
            display: "none",
            }
        }
     
        function Preloader(props) {  
            if (loader !== null) {
                
                let imageloader = document.querySelector(".imageloader");
                let containsPending = imageloader.classList.contains("imageloader-pending");

                if (containsPending){
                    return <img style={{maxHeight: "400px", maxWidth: "900px", margin: "0 auto" }} src="images/ellen_selfie_oscars.jpg" />
                } else {
                    return <img src="images/spinner.gif" />;
                }
            } else {
                return <img src="images/spinner.gif" />;
            } 
        }

        return (
            <div>
                <div className="quiz" id="quiz">
                    <div className="">
                    <h1>{this.state.infoForNewGame}</h1>
                        <div className="quizInfo">{this.state.firstInfo}</div><br/><br/>
                            <div className="quizPoints">Points: {this.state.points}</div>
                            <div className="quizTime">Time left: 00:0{this.state.timeForAnswer}</div>
                            <button className="startButton" onClick={this.handleStart}>START</button>
                        <div className="flexi">
                            <div className="cover">
                                <div className="coverRed" style={this.style} >
                                    <p>GAME OVER<br/><br/>
                                    <span>Points gained: {this.state.points}</span></p>
                                </div>
                                <ImageLoader className="ImageLoader"
                                    src={this.state.quizImageSrc}
                                    >
                                    <img className="quizImg" ref="MyRef"/>
                                    <div>Error!</div>
                                    <Preloader />
                                </ImageLoader>
                            </div>
                            <div className="quiz-text">
                                {this.state.options}
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