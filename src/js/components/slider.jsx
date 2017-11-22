import React from 'react';
//import infoToPass from '../components/routing.jsx';

class Slider extends React.Component{
    constructor(props) {
        super(props);
        this.state = {  
            indexSlider: 0,
            objList: [],
            objLength: 0,
            name: '',
            surname: '',
            nationality: '',
            imdb: '',
            photo: '',
            currentId: 0
        }
    }

    componentDidMount() {
        this.objList = [];            
        fetch(`https://celebase-project.firebaseio.com/Actors.json`).then( r =>   r.json() ).then( response => {

            this.objList.push(response);
            this.objLength = response.length;

            //console.log(this.state.objList[0][4].imdb);
            let namesSurnames = [];
            for (let i=0; i<response.length; i++){
                let name = response[i].name;
                let surname = response[i].surname;
                let both = `${name} ${surname}`;
                namesSurnames.push(both); 
            }

            //console.log('namesSurnames',namesSurnames);

            //console.log('xx this.state.objLength',this.state.objLength);

            //console.log("response.length",response.length);
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
                currentId: currentId
            })

        });
    }



    handleClickPrev = () => {
        this.setState({
            indexSlider: this.state.indexSlider -1
        })
        console.log("prev, this.state.indexSlider",this.state.indexSlider);

        console.log('this.state.name z klik prev',this.state.name);
        console.log('this.state.objList z klik prev',this.state.objList);

    }



    handleClickNext = () => {

        if (this.state.currentId == this.state.objLength-1) {
            console.log("rowna sie");
            this.name = this.state.objList[0][0].name;
            this.surname = this.state.objList[0][0].surname;
            this.nationality = this.state.objList[0][0].nationality;
            this.imdb = this.state.objList[0][0].imdb;
            this.photo = this.state.objList[0][0].photo;

            this.setState({
                name: this.name,
                surname: this.surname,
                nationality: this.nationality,
                imdb: this.imdb,
                photo: this.photo,
                currentId: 0
            })

            console.log("`````this.state.name",this.state.name);



        } else {
        console.log('Z HANDLE CLICKA this.state.objList',this.state.objList[0][this.state.currentId+1].surname);
            this.name = this.state.objList[0][this.state.currentId+1].name;
            this.surname = this.state.objList[0][this.state.currentId+1].surname;
            this.nationality = this.state.objList[0][this.state.currentId+1].nationality;
            this.imdb = this.state.objList[0][this.state.currentId+1].imdb;
            this.photo = this.state.objList[0][this.state.currentId+1].photo;

            this.setState({
            name: this.name,
            surname: this.surname,
            nationality: this.nationality,
            imdb: this.imdb,
            photo: this.photo,
            currentId: this.state.currentId +1
            })

        console.log('#$%^&*(',this.state.currentId);

    }



    }

    render(){
        if (this.state.objLength !==0){
            console.log("!@! z render this.state.currentId",this.state.currentId);

          
            //console.log("niepusty!");
            //console.log('z rendera! this.state....',this.state.name, this.state.surname, this.state.nationality, this.state.imdb);
            let incrementedId = this.state.currentId+1;
            //console.log('incrementedId',incrementedId);
            let copyOfObj = this.state.objList.slice();
            //console.log('copyOfObj Z RENDERA1',copyOfObj[0][this.state.currentId].photo);
            //console.log('copyOfObj Z RENDERA2',copyOfObj[0][this.state.currentId+1].photo); 

            //console.log('copyasdfbgdfsfsd',this.state.name);

            //console.log('copyOfObj Z RENDERA2',copyOfObj[0][incrementedId].surname); 
        }


        //console.log(this.props.route.time);

        return <div className="container">
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
                        <img className="main-slide-image" src={this.state.photo} />
                        <div className="main-slide-text">
                            {this.state.name} {this.state.surname},
                             {this.state.nationality}<br/>
                            IMDB: {this.state.imdb}
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