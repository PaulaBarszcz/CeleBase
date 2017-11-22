import React from 'react';
//import infoToPass from '../components/routing.jsx';

class Slider extends React.Component{
    constructor(props) {
        super(props);
        this.state = {  
            indexSlider: 0,
            objList: [],
            objLength: 0  
        }
    }

    componentDidMount() {
        this.objList = [];            
        fetch(`https://celebase-project.firebaseio.com/Actors.json`).then( r =>   r.json() ).then( response => {

            this.objList.push(response);
            this.objLength = response.length;
            console.log('ooo',this.objLength);

            this.setState({
                objList: this.objList,
                objLength: this.objLength
            })
            console.log(this.state.objList[0][4].imdb);
        });
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
        let copyOfObj = this.state.objList.slice();
        //let objects = copyOfObj[0];
        //console.log('objects',objects);
        console.log(this.state.objList);
        console.log('copyOfObj',copyOfObj.length);
        console.log('oioi',this.state.objLength);

        let namesSurnames = [];

        for (let i=1; i<this.state.objLength; i++){
            //console.log('copyOfObj[i]',copyOfObj[0][i].surname);
            let name = copyOfObj[0][i].name;
            let surname = copyOfObj[0][i].surname;
            let both = name+' '+surname;
            //console.log(both);
            namesSurnames.push(both);
        }
        console.log(namesSurnames);
  


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