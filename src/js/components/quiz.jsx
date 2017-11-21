import React from 'react';

class Quiz extends React.Component{
    render(){

        console.log('this.props.zi',this.props.zi);

        return <div className="container">
            <div className="quiz" id="quiz">
                <div className="main-slider-slides-cnt">
                    <div className="main-slide active">
                        <div className="cover">
                            <div className="coverGreen">
                                <p>GOOD ANSWER!<br/><br/>
                                <span>Points gained:  </span></p>
                            </div>
                            <div className="coverRed">

                                <p>GAME OVER<br/><br/>
                                <span>Points gained: </span></p>
                            </div>
                            <img className="main-slide-image" src="http://www.dailygossip.org/wp-content/uploads/2017/03/antonio-banderas.jpg" />
                        </div>
                        <div className="quizPoints">Points: </div>
                        <div className="quiz-text">
                            <p>A) Antonio Banderas</p><br/>
                            <p>B) Leonardo diCaprio</p><br/>
                            <p>C) Morgan Freeman</p><br/>
                            <p>D) Eddie Redmayne</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export {Quiz}