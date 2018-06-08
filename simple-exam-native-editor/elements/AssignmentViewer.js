import React, {Component} from 'react'
import {View, ScrollView, Alert, TextInput, StyleSheet} from 'react-native'
import {Text, ListItem, FormLabel, FormInput, FormValidationMessage, Button, Divider, Icon, Card} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'


class AssignmentViewer extends Component {
    static navigationOptions = {title: 'AssignmentViewer'};
    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            title: '',
            description: '',
            widgetType:'Assignment',
            text: 'AssignmentWidget',
            lessonId:1,
            points:0,
            essayAnswer:'',
            uploadFileLink:'',
            link:'',
            assignId:'',
            assignview:{
                title: '',
                description: '',
                points:0,
                essayAnswer:'',
                uploadFileLink:'',
                link:''
            }

        };

        this.assignService = AssignmentService.instance;
    }

    updateForm(newState) {
        this.setState(newState)
    }

    setAssignId(assignId) {
        this.setState({assignId: assignId});
    }

    componentDidMount() {
        const {navigation} = this.props;

        //this.setAssignId(navigation.getParam("assignId"))
this.state.assignId = navigation.getParam("assignId");
        console.log("http://10.0.3.2:8080/api/assignment/"+this.state.assignId)
        fetch("http://10.0.3.2:8080/api/"+this.state.assignId)
            .then(response => (response.json()))
            .then(assignview => this.setState({assignview}))
        console.log("After fetch");
        console.log("TITLE:"+this.state.assignview.title)

    }




    render() {
        return(
            <ScrollView>
                    <Text h4>Preview</Text>
                    <Divider
                        style={{
                            backgroundColor:
                                'blue' }} />
                    <ScrollView style={{paddingVertical: 10}}>
                        <View style={{paddingHorizontal: 5}}>
                            <Card style={{height: 400}}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 1}}>
                                        <Text h4>{this.state.assignview.title}</Text>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{textAlign: 'right'}}>{this.state.assignview.points} pts</Text>
                                    </View>
                                </View>
                                <View style={{paddingVertical: 2}}>
                                    <Text>{this.state.assignview.description}</Text>
                                </View>
                                <View style={{paddingVertical: 10}}>
                                    <Text h4 style={{paddingHorizontal: 5}}>Essay answer</Text>
                                    <TextInput style={styles.box} value={this.state.assignview.essayAnswer} multiline={true} numberOfLines={5}/>
                                </View>
                                <View style={{paddingVertical: 2, paddingBottom: 10}}>
                                    <Text h4 style={{paddingHorizontal: 5}}>Upload File</Text>
                                    <TextInput/>
                                </View>
                                <View style={{paddingVertical: 2, paddingBottom: 10}}>
                                    <Text h4 style={{paddingHorizontal: 5}}> Submit Link</Text>
                                    <TextInput/>
                                </View>

                            </Card>
                        </View>
                    </ScrollView>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    box: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#d6d7da'
    }
});

export default AssignmentViewer