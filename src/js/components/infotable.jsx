import React from 'react';
import ReactDOM from 'react-dom';
import Reactable from 'reactable';

class InfoTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            style: {},
            objList: [],
            objListNoPhoto: [],
            objLength: 0,
            objListNoPhotoArranged: []
        };
    }

    componentDidMount() {
        this.objList = [];            
        fetch(`https://celebase-project.firebaseio.com/Actors.json`).then( r =>   r.json() ).then( response => {

            this.objList.push(response);
            this.objLength = response.length;

            let objListNoPhoto = response.slice();

            for (let i=0; i<response.length; i++){
                delete objListNoPhoto[i].photo;
                delete objListNoPhoto[i].id;
            }

            this.setState({
                objList: this.objList,
                objLength: this.objLength,
                objListNoPhoto: objListNoPhoto
            })

            let objListNoPhotoArranged= [];

            for (let i=0; i<response.length; i++){
                let obj = {'Name': this.state.objListNoPhoto[i].name,
                    'Surname': this.state.objListNoPhoto[i].surname,
                    'Gender': this.state.objListNoPhoto[i].gender,
                    'Nationality': this.state.objListNoPhoto[i].nationality,
                    'IMDB': <a href={this.state.objListNoPhoto[i].imdb} target="_blank">Visit at IMDB > </a>,
                };
                objListNoPhotoArranged.push(obj);
            }

            this.setState({
                objListNoPhotoArranged: objListNoPhotoArranged
            })
        });
    }

    render(){

        let Table = Reactable.Table;

        return <div className = "infotable" id="infotable">
            <div className="container">
                <div className="tableBcg">
                    <p className="sortInfo">Click on the name of the column to sort infotable by it.<br />Click it again for reverse order.</p>
                    <div className="containsTable">
                        <Table className="table dataTable" id="table" data={this.state.objListNoPhotoArranged}
                        sortable={[
                            'Name',
                            'Surname',
                            'Gender',
                            'Nationality',
                            'IMDB'
                        ]}
                        defaultSort={{column: 'Name', direction: 'asc'}} itemsPerPage={8} pageButtonLimit={9} />
                    </div>
                </div>
            </div>
        </div>;
    }
}

export {InfoTable}