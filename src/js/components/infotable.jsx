import React from 'react';

class InfoTable extends React.Component{
    render(){
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
                                    <td>Hathawat</td>
                                    <td>female</td>
                                    <td>American</td>
                                    <td><a href="http://www.imdb.com/name/nm0004266/" target="_blank">http://www.imdb.com/name/nm0004266/</a></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export {InfoTable}