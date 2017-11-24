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

            }

            console.log(objListNoPhoto);

            var person = {
                firstname:"John",
                lastname:"Doe",
                age:50,
                eyecolor:"blue",

            };
            delete person.age;
            console.log(person);


            // delete.objListNoPhoto[i].photo;

            // const objListNoPhoto = response.filter(item => {
            //     console.log(item.photo);
            //     return item ;
            // });

            console.log(response[0].photo);

            this.setState({
                objList: this.objList,
                objLength: this.objLength,
                objListNoPhoto: objListNoPhoto
            })

        });
    }



    render(){
        //console.log(this.state.objList[0][4].imdb);
       //zle console.log(this.state.objList[0][0]);

        let Table = Reactable.Table;
        return <div className = "infotable" id="infotable">
            <div className="container">
                <div className="tableBcg">
                    <p className="sortInfo">Sort infotable by...</p>
                    <button>NAME</button>
                    <button>SURNAME</button>
                    <button>GENDER</button>
                    <button>NATIONALITY</button><br/><br/>
                    <div className="containsTable">
                        <table className="dataTable">
                            <tbody>
                                <tr>
                                    <th>NAME</th>
                                    <th>SURNAME</th>
                                    <th>GENDER</th>
                                    <th>NATIONALITY</th>
                                    <th>IMDB</th>
                                </tr>
                                <tr>
                                    <td>Antonio</td>
                                    <td>Banderas</td>
                                    <td>male</td>
                                    <td>Spanish</td>
                                    <td><a href="http://www.imdb.com/name/nm0000104/" target="_blank">http://www.imdb.com/name/nm0000104/</a></td>
                                </tr>
                                <tr>
                                    <td>Christian</td>
                                    <td>Bale</td>
                                    <td>male</td>
                                    <td>Welsh</td>
                                    <td><a href="http://www.imdb.com/name/nm0000288/" target="_blank">http://www.imdb.com/name/nm0000288/</a></td>
                                </tr>                       
                                <tr>
                                    <td>Anne</td>
                                    <td>Hathaway</td>
                                    <td>female</td>
                                    <td>American</td>
                                    <td><a href="http://www.imdb.com/name/nm0004266/" target="_blank">http://www.imdb.com/name/nm0004266/</a></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Table className="table" id="table" data={this.state.objListNoPhoto}
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