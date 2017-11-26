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
            currentsort: 'Name',
            objListNoPhotoArranged: []
        };
    }

    componentDidMount() {
        this.objList = [];            
        fetch(`https://celebase-project.firebaseio.com/Actors.json`).then( r =>   r.json() ).then( response => {

            this.objList.push(response);
            this.objLength = response.length;

            let objListNoPhoto = response.slice();
            //delete.objListNoPhoto.photo;

            console.log(objListNoPhoto[0].photo); //remy
            console.log(response[0]);

            for (let i=0; i<response.length; i++){
                delete objListNoPhoto[i].photo;
                delete objListNoPhoto[i].id;

            }

            console.log(objListNoPhoto);

            //console.log(response[0].photo);

            this.setState({
                objList: this.objList,
                objLength: this.objLength,
                objListNoPhoto: objListNoPhoto
            })

            console.log(this.state.objListNoPhoto[2].name);
            console.log(response[2].name);

            for (let i=0; i<this.state.objListNoPhoto.length; i++) {
                console.log('<Tr><Td>', this.state.objListNoPhoto[i].name, this.state.objListNoPhoto[i].surname, this.state.objListNoPhoto[i].gender, this.state.objListNoPhoto[i].nationality, this.state.objListNoPhoto[i].imdb);
            }

            console.log(this.state.objListNoPhoto);
            let objListNoPhotoArranged= [];

            for (let i=0; i<response.length; i++){
                let obj = {'Name': this.state.objListNoPhoto[i].name,
                    'Surname': this.state.objListNoPhoto[i].surname,
                    'Gender': this.state.objListNoPhoto[i].gender,
                    'Nationality': this.state.objListNoPhoto[i].nationality,
                    'IMDB': this.state.objListNoPhoto[i].imdb,
                };
                objListNoPhotoArranged.push(obj);
            }

            console.log(objListNoPhotoArranged);

            this.setState({
                objListNoPhotoArranged: objListNoPhotoArranged
            })



        });
    }

    render(){

        let Table = Reactable.Table;
        let Thead = Reactable.Thead;
        let Th = Reactable.Th;
        let Tr = Reactable.Tr;
        let Td = Reactable.Td;

        return <div className = "infotable" id="infotable">
            <div className="container">
                <div className="tableBcg">
                    <p className="sortInfo">Sort infotable by...</p>
                    <button>NAME</button>
                    <button>SURNAME</button>
                    <button>GENDER</button>
                    <button>NATIONALITY</button><br/><br/>
                    <div className="containsTable">
                        <Table className="table dataTable" id="table">
                            <Thead>
                              <Th column="name">
                                <strong className="name-header">Name</strong>
                              </Th>
                              <Th column="surname">
                                <strong className="surname-header">Surname</strong>
                              </Th>
                              <Th column="gender">
                                <strong className="gender-header">Gender</strong>
                              </Th>
                              <Th column="nationality">
                                <strong className="nationality-header">Nationality</strong>
                              </Th>
                              <Th column="imdb">
                                <strong className="imdb-header">IMDB</strong>
                              </Th>
                            </Thead>
                            
                        </Table>
                    </div>
                </div>
            </div>
            <Table className="table" id="table" data={this.state.objListNoPhotoArranged}
            sortable={[
                'Name',
                'Surname',
                'Gender',
                'Nationality',
                'IMDB'
            ]}
            defaultSort={{column: 'Name', direction: 'asc'}}/>

        </div>;
    }
}

export {InfoTable}