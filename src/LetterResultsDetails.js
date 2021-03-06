import React, {Component} from 'react';
import {
    Alert,
    Button,
    ButtonGroup,
    ButtonToolbar, Col,
    Glyphicon,
    ListGroup,
    Panel,
} from 'react-bootstrap';
import './Tabpane.css';
let output = "";
const headers = {
    headers: {
        'Authorization': `Basic ${btoa('evanpersie3@gmail.com:skolastikA97')}`
        //'Authorization': `Basic ${btoa('admin:district')}`
    }
};
class LetterResultsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],
            filterText: ''
        }
    }
    componentDidMount() {
        this.setState({isLoading: true});
        let item = this.props.item;

        if (item === "programDataElements") {
            fetch(`http://197.136.81.99:8082/test/api/programDataElements.json?fields=:all&paging=false`, headers
            ).then((Response) => Response.json())
                .then((findresponse) => {
                    this.setState({
                        data: findresponse.programDataElements, isLoading: false
                    })
                })
        }
        else if (item === "dataSets") {
            fetch('http://197.136.81.99:8082/test/api/dataSets.json?fields=:all&paging=false', headers
            ).then((Response) => Response.json())
                .then((findresponse) => { //filter the findresponse using the filters variable to display only what is in the input
                    this.setState({
                        data: findresponse.dataSets, isLoading: false
                    })
                })
        }
        else if (item === "indicators") {
            fetch('http://197.136.81.99:8082/test/api/indicators.json?fields=:all&paging=false', headers
            ).then((Response) => Response.json())
                .then((findresponse) => { //filter the findresponse using the filters variable to display only what is in the input
                    this.setState({
                        data: findresponse.indicators, isLoading: false
                    });
                })
        }
        else if (item === "dataElements") {
            fetch('http://197.136.81.99:8082/test/api/dataElements.json?fields=:all&paging=false', headers
            ).then((Response) => Response.json())
                .then((findresponse) => { //filter the findresponse using the filters variable to display only what is in the input
                    console.log(findresponse.dataElements); //hapa ndio jackpot
                    this.setState({
                        data: findresponse.dataElements, isLoading: false
                    })
                })
        }
    }
    render() {
        const {isLoading} = this.state;
        /*This allows a loader to show while data is being loaded to states, once loaded, the state will change to true then rendering will occur*/
        if (isLoading) {
            return <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>;
        }
        if (this.props.letter === "char") {
            //select items that start with a non-letter character
            output = this.state.data
                .filter((dynamicData) => {
                    //console.log(dynamicData.name)
                    if (dynamicData.name[0].toLowerCase().match(/[0-9*#!%&^$_]/i)) {
                        return dynamicData.name[0].toLowerCase().match(/[0-9*#!%&^$_]/i);
                    }
                    else{
                        return undefined;
                    }
                })
                .map((dynamicData) => (
                    <div key={dynamicData.id}>
                        <Panel>
                            <Panel.Body>
                                <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                    <ButtonGroup>
                                        <Button href={"http://localhost:3000/"+this.props.item+"/"+dynamicData.id}>View</Button>
                                    </ButtonGroup>&nbsp;
                                </ButtonToolbar>
                                <a href={"http://localhost:3000/"+this.props.item+"/"+dynamicData.id}>{dynamicData.name}</a>
                                <br/>
                                {dynamicData.description!==undefined?<div style={{color:"green"}}>Description: {dynamicData.description}</div>:<div style={{color:"red"}}>No description provided</div>}
                            </Panel.Body>
                        </Panel>
                    </div>
                ));
            //if no items are found return an alert
        }
        else {
            output = this.state.data
                .filter((dynamicData) => {
                    //console.log(dynamicData.name)
                    return dynamicData.name[0].toLowerCase().indexOf(this.props.letter.toLowerCase()) >= 0
                })
                .map((dynamicData) => (
                    <div key={dynamicData.id}>
                        <Panel>
                            <Panel.Body>
                                <ButtonToolbar bsClass="pull-right" style={{marginRight: 10}}>
                                    <ButtonGroup>
                                        <Button href={"http://localhost:3000/"+this.props.item+"/"+dynamicData.id}>View</Button>
                                    </ButtonGroup>&nbsp;
                                </ButtonToolbar>
                                <a href={"http://localhost:3000/"+this.props.item+"/"+dynamicData.id}>{dynamicData.name}</a>
                                <br/>
                                {dynamicData.description!==undefined?<div style={{color:"green"}}>Description: {dynamicData.description}</div>:<div style={{color:"red"}}>No description provided</div>}
                            </Panel.Body>
                        </Panel>
                    </div>
                ));
        }
        return (
            <div className="container letterResultsDetails">
                <Col xs={8} md={8}>
                    <ListGroup>
                        {output.length !== 0 ? output :
                            <div><Col xs={6}><Alert bsStyle={"warning"}><strong>No records found!</strong> There is no
                                metadata that starts with a number or symbol</Alert></Col></div>}
                    </ListGroup>
                </Col>
            </div>
        );
    }
}

export default LetterResultsDetails;