import React from 'react';

class QuizAnswersGame extends React.Component{
    constructor(props){
        super(props);
        this.state={
            whichImg: 0,
            possAns: [],
            possAnsF: [],
            possPhoto: [],
            possNatio: [],
            possImdb: [],
            possGender: [],
            possGenderF: [],
            corrAns: "",
            points: 0,
            timeForAnswer:9,
            number: 0,
            numberControl: false,
            style: {},
            redWidth: "100%",
            redHeight: "100%",
            objList: [],
            objLength: 0,
            name: '',
            surname: '',
            nationality: '',
            imdb: '',
            photo: '',
            currentId: 0
        };
    }

    handleResize = () => {

    }

    componentDidMount() {
        this.objList = [];            
        fetch(`https://celebase-project.firebaseio.com/Actors.json`).then( r =>   r.json() ).then( response => {

            this.objList.push(response);
            this.objLength = response.length;

            console.log(response[0].surname);
            let namesSurnames = [];
            let namesSurnamesF=[];
            let photoRange = [];
            let natioRange = [];
            let imdbRange = [];
            let genderRange = []; 
            let genderRangeF = [];      

            for (let i=0; i<response.length; i++){
                console.log(response[i].gender);
                if (response[i].gender=="male"){
                    let name = response[i].name;
                    let surname = response[i].surname;
                    let both = `${name} ${surname}`;
                    namesSurnames.push(both);
                    genderRange.push(response[i].gender);
                } else {
                    let nameF = response[i].name;
                    let surnameF = response[i].surname;
                    let bothF = `${nameF} ${surnameF}`;
                    namesSurnamesF.push(bothF);
                    genderRangeF.push(response[i].gender);
                }

                    let photo = response[i].photo;
                    photoRange.push(photo);

                    let natio = response[i].nationality;
                    natioRange.push(natio);

                    let imdb = response[i].imdb;
                    imdbRange.push(imdb);
                    
            }



            let currentId = Math.ceil(Math.random()*response.length);
           
            this.name = response[currentId].name;
            this.surname = response[currentId].surname;
            this.nationality = response[currentId].nationality;
            this.imdb = response[currentId].imdb;
            this.photo = response[currentId].photo;

            this.setState({
                objList: this.objList,
                objLength: this.objLength,
                name: this.name,
                surname: this.surname,
                nationality: this.nationality,
                imdb: this.imdb,
                photo: this.photo,
                currentId: currentId,
                possAns: namesSurnames,
                possAnsF: namesSurnamesF,
                possPhoto: photoRange,
                possNatio: natioRange,
                possImdb: imdbRange,
                possGender: genderRange,
                possGenderF: genderRangeF
            })

        });
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
            let newId = Math.ceil(Math.random()*this.state.objLength.length);
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

        this.chosenOpt= e.target.innerText;

        if (e.target.innerText.indexOf(this.state.corrAns)!==-1){
            let points=this.state.points+1;
            //let randomId = Math.floor(Math.random() * (3 ));
            let newId = Math.ceil(Math.random()*this.state.objLength);
            let whichImg = newId;
            let possibleCopy = this.state.possAns.slice();
            let newCorr = possibleCopy[whichImg];

            console.log('newId',newId);

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


        console.log('this.state.currentId',this.state.currentId);
        console.log('this.state.possGender',this.state.possGender);
        console.log('this.state.possGender[this.state.currentId]',this.state.possGender[this.state.currentId]);
        let arrayOptions= this.state.possAns.slice();
        let arrayOptionsF= this.state.possAnsF.slice();
        let options;

        console.log('arrayOptions',arrayOptions);

        if (this.state.possGender[this.state.currentId]=="male") {
            console.log("current id jest male");
            options = arrayOptions.map((item,index) => {
                return <p key={index+1} onClick={ e => this.handleClickOption(e, index) } >{index+1}. {item}</p>
            })
        } else {
            console.log("current id NIE jest male");
            options = arrayOptionsF.map((item,index) => {
                return <p key={index+1} onClick={ e => this.handleClickOption(e, index) } >{index+1}. {item}</p>
            })
        }


        //console.log('options',options);

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

        this.quizImageSrc = this.state.possPhoto[this.state.whichImg];

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
                                src={this.quizImageSrc} 
                                ref={ (imgElement) => this.imgElement = imgElement} />
                            
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