import React from 'react';

class Slider extends React.Component{
    constructor(props) {
        super(props);
        this.state = {  
            indexSlider: 0,  
        }
    }

    handleClickPrev = () => {
        this.setState({
            indexSlider: this.state.indexSlider -1
        })
        console.log("prev, this.state.indexSlider",this.state.indexSlider);

    }

    handleClickNext = () => {
        this.setState({
            indexSlider: this.state.indexSlider +1
        })
        console.log("next, this.state.indexSlider",this.state.indexSlider);

    }


    render(){

        console.log(this.props.route.time);

        return <div className="container">
        {this.props.time}
            <div className="main-slider" id="mainSlider">
                <button className="main-slider-prev" onClick={this.handleClickPrev}>
                    <span>Poprzedni slajd</span>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                </button>
                <button className="main-slider-next" onClick={this.handleClickNext}>
                    <span>Następny slajd</span>
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                </button>

                <div className="main-slider-slides-cnt">
                    <div className="main-slide active">
                        <img className="main-slide-image" src="http://www.dailygossip.org/wp-content/uploads/2017/03/antonio-banderas.jpg" />
                        <div className="main-slide-text">
                            Antonio Banderas,
                            Spanish<br/>
                            IMDB: http://www.imdb.com/name/nm0000104/
                        </div>
                    </div>
                    <div className="main-slide">
                        <img className="main-slide-image" src="https://www.alux.com/wp-content/uploads/2017/04/Christian-Bale-Net-Worth.jpg" />
                        <div className="main-slide-text">
                            Christian Bale,
                            Welsh<br/>
                            IMDB: http://www.imdb.com/name/nm0000288/
                        </div>
                    </div>
                    <div className="main-slide">
                        <img className="main-slide-image" src="https://www.hdwallpapers.in/walls/anne_hathaway_3-normal.jpg" />
                        <div className="main-slide-text">
                            Anne Hathaway,
                            American<br/>
                            IMDB: http://www.imdb.com/name/nm0004266/
                        </div>
                    </div>

                </div>
            </div>
        </div>
    }
}

export {Slider}