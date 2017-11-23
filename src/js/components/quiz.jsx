import React from 'react';

class QuizAnswersGame extends React.Component{
    constructor(props){
        super(props);
        this.state={
            possAns: [],
            possAnsF: [],
            possPhoto: [],
            possPhotoF: [],
            possNatio: [],
            possNatioF: [],
            possImdb: [],
            possImdbF: [],
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
            currentId: 14
        };
    }

    componentDidMount() {

        //this.startTimer();


        this.objList = [];            
        fetch(`https://celebase-project.firebaseio.com/Actors.json`).then( r =>   r.json() ).then( response => {

            this.objList.push(response);
            this.objLength = response.length;
            console.log('response.length',response.length);

            let namesSurnames = [];
            let namesSurnamesF=[];
            let photoRange = [];
            let photoRangeF = [];
            let natioRange = [];
            let natioRangeF = [];
            let imdbRange = [];
            let imdbRangeF = [];
            let genderRange = []; 
            let genderRangeF = []; 
            console.log('response',response);     

            for (let i=0; i<response.length; i++){
                console.log(response[i].gender);
                if (response[i].gender=="male"){
                    let name = response[i].name;
                    let surname = response[i].surname;
                    let both = `${name} ${surname}`;
                    namesSurnames.push(both);
                    genderRange.push(response[i].gender);
                    photoRange.push(response[i].photo);
                    imdbRange.push(response[i].imdb);
                    natioRange.push(response[i].nationality);

                } else {
                    let nameF = response[i].name;
                    let surnameF = response[i].surname;
                    let bothF = `${nameF} ${surnameF}`;
                    namesSurnamesF.push(bothF);
                    genderRangeF.push(response[i].gender);
                    photoRangeF.push(response[i].photo);
                    imdbRangeF.push(response[i].imdb);
                    natioRangeF.push(response[i].nationality);
                }                    
            }

            let currentId = Math.ceil(Math.random()*response.length);
           
            console.log('namesSurnames.length',namesSurnames.length);
            console.log('currentId',currentId);

            if (currentId < namesSurnames.length) {
                console.log('currentId < namesSurnames.length');
            } else {
                console.log('currentId NIE < namesSurnames.length');
            }

            this.setState({
                objList: this.objList,
                objLength: this.objLength,
                currentId: currentId,
                possAns: namesSurnames,
                possAnsF: namesSurnamesF,
                possPhoto: photoRange,
                possPhotoF: photoRangeF,
                possNatio: natioRange,
                possNatioF: natioRangeF,
                possImdb: imdbRange,
                possImdbF: imdbRangeF,
                possGender: genderRange,
                possGenderF: genderRangeF
            })
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

        this.chosenOpt= e.target.innerText;
        console.log('--------------this.goodAns',this.goodAns);

        if (e.target.innerText.indexOf(this.goodAns)!==-1){
            console.log("dobra odp");
            let points=this.state.points+1;
            let newId = Math.ceil(Math.random()*this.state.objLength);
            let possibleCopy;
            let newCorr;

            if (this.state.currentId <= this.state.possAns.length) {
               newCorr = this.state.possAns[newId];
            } else {
                let lengthpossAns = this.state.possAns.length+1;
                newCorr = this.state.possAns[newId-lengthpossAns];     
            }

            console.log('newId',newId);

            this.setState({
                points: points,
                currentId: newId,
                corrAns: newCorr,
                timeForAnswer: 9,
                numberControl: false
            })
            clearInterval(this.answerTimeId);
            this.startTimer();

        } else {
            console.log("zla odp");
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

    generateNewAns = () => {
        console.log("1234 z render this.state.corrAns",this.state.corrAns);

        console.log('z render: this.state.possAns.length',this.state.possAns.length);

        let arrayOptions= this.state.possAns.slice();
        let arrayOptionsF= this.state.possAnsF.slice();
        let options =[];
       

        function shuffleArray(d) {
            for (var c = d.length - 1; c > 0; c--) {
                var b = Math.floor(Math.random() * (c + 1));
                var a = d[c];
                d[c] = d[b];
                d[b] = a;
            }
            return d
        };


        if (this.state.currentId <= this.state.possAns.length) {
            this.quizImageSrc = this.state.possPhoto[this.state.currentId-1];
            this.goodAns = this.state.possAns[this.state.currentId-1];
            console.log('this.goodAns',this.goodAns);


            console.log(shuffleArray([1,2,3,4,5,6]));


            while (options.length < 3){
                 
                let randomNum = Math.floor(Math.random()*this.state.possAns.length);
                let randomNameSurname = this.state.possAns[randomNum];
                if (randomNameSurname !== this.goodAns && options.indexOf(randomNameSurname) === -1){
                    options.push(randomNameSurname)
                }  else {
                    options = options;
                }
                console.log(options.length);              
            }  

            console.log(this.goodAns);
            console.log(options);
            options.push(this.goodAns);
            console.log(options);
            console.log(shuffleArray(options));


             //gender: male

         } else {
            console.log("poza ifem");
         }


          //else {
        //     let lengthpossAns = this.state.possAns.length+1;

        //     this.quizImageSrc = this.state.possPhotoF[this.state.currentId-lengthpossAns-1];
        //     this.goodAns = this.state.possAnsF[this.state.currentId-lengthpossAns];
        //     console.log('this.goodAns',this.goodAns);


        //     console.log(shuffleArray([1,2,3,4,5,6]));


        //     while (options.length < 3){
                 
        //         let randomNum = Math.ceil(Math.random()*this.state.possAnsF.length);
        //         let randomNameSurname = this.state.possAnsF[randomNum];
        //         if (randomNameSurname !== this.goodAns && options.indexOf(randomNameSurname) === -1){
        //             options.push(randomNameSurname)
        //         }  else {
        //             options = options;
        //         }
        //         console.log(options.length);              
        //     }


        // }






         //else {     //gender: female
    //         let lengthpossAns = this.state.possAns.length+1;
    //         console.log('lengthpossAns',lengthpossAns);
    //         this.quizImageSrc = this.state.possPhotoF[this.state.currentId-lengthpossAns];
    //         console.log('this.state.corrAns',this.state.corrAns);
    //         this.goodAns = this.state.possAnsF[this.state.currentId-lengthpossAns];


    // //new
    //         while (options.length < 3){
                 
    //             let randomNum = Math.ceil(Math.random()*this.state.possAnsF.length);
    //             let randomNameSurname = this.state.possAnsF[randomNum];
    //             if (randomNameSurname !== this.goodAns && options.indexOf(randomNameSurname) === -1){
    //                 options.push(randomNameSurname)
    //             }  else {
    //                 options = options;
    //             }
    //             console.log(options.length);              
    //         }  //koniec while

    //         console.log(this.goodAns);
    //         console.log(options);
    //         options.push(this.goodAns);
            
    //         console.log(shuffleArray(options));
    //         console.log(options);

    // // koniec new
   
    //     } //koniec else (gender female)

        this.fourLis = options.map((item,index) => {
            return <p key={index+1} onClick={ e => this.handleClickOption(e, index) } >{index+1}. {item}</p>
        })

        console.log('Z RENDERA this.quizImageSrc',this.quizImageSrc);
        console.log('z RENDERA options', options);

        console.log('arrayOptionsF z rendera',arrayOptionsF);

    }

    render(){
        console.log("render");
        if(this.state.timeForAnswer === 9){
            this.generateNewAns();
        }
  console.log("idddddddddddddddddd",this.answerTimeId)

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
                                {this.fourLis}

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