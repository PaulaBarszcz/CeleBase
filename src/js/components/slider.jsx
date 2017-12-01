import React from 'react';
import ImageLoader from 'react-load-image';

class Slider extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
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
        
        if (this.state.currentId == 0) {
            
            this.name = this.state.objList[0][this.state.objLength-1].name;
            this.surname = this.state.objList[0][this.state.objLength-1].surname;
            this.nationality = this.state.objList[0][this.state.objLength-1].nationality;
            this.imdb = this.state.objList[0][this.state.objLength-1].imdb;
            this.photo = this.state.objList[0][this.state.objLength-1].photo;

            this.setState({
                name: this.name,
                surname: this.surname,
                nationality: this.nationality,
                imdb: this.imdb,
                photo: this.photo,
                currentId: this.state.objLength-1
            })

        } else {
        
            this.name = this.state.objList[0][this.state.currentId-1].name;
            this.surname = this.state.objList[0][this.state.currentId-1].surname;
            this.nationality = this.state.objList[0][this.state.currentId-1].nationality;
            this.imdb = this.state.objList[0][this.state.currentId-1].imdb;
            this.photo = this.state.objList[0][this.state.currentId-1].photo;

            this.setState({
            name: this.name,
            surname: this.surname,
            nationality: this.nationality,
            imdb: this.imdb,
            photo: this.photo,
            currentId: this.state.currentId -1
            })
        }
    }

    handleClickNext = () => {

        if (this.state.currentId == this.state.objLength-1) {

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

        } else {
        
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
        }
    }

    render(){

        if (this.state.objLength !==0){
            let incrementedId = this.state.currentId+1;
            let copyOfObj = this.state.objList.slice(); 
        }

        function Preloader(props) {        
            return <img src="images/spinner.gif" />;
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
                        <ImageLoader className="ImageLoader main-slide-image" src={this.state.photo}
                            >
                            <img />
                            <div>Error!</div>
                            <Preloader />
                        </ImageLoader>
                        <div className="main-slide-text">
                            {this.state.name} {this.state.surname},
                             {' '+this.state.nationality}<br/>
                            <a href={this.state.imdb} target="_blank">IMDB</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export {Slider}