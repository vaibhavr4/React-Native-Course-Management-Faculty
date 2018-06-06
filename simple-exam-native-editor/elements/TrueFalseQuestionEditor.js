import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import TrueFalseService from '../services/TrueFalseService'

class TrueFalseQuestionEditor extends Component {
    static navigationOptions = { title: "True / False"}
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            points: 0,
            isTrue: true,
            examId:''
        };
        this.createTrueFalse = this.createTrueFalse.bind(this);
        this.setExamId = this.setExamId.bind(this);
        this.trueFalseService = TrueFalseService.instance;
    }

    setExamId(examId) {
        this.setState({examId: examId});
    }

    componentDidMount() {
        console.log('In component did mount- TrueFalse');
        const {navigation} = this.props;
        this.state.examId = navigation.getParam("examId")
        // fetch("http://10.0.3.2:8080/api/lesson/"+lessonId+"/examwidget")
        //   .then(response => (response.json()))
        //   .then(widgets => this.setState({widgets}))
        //this.findAllExamsForLesson(this.state.lessonId);
        console.log("ExamID:"+this.state.examId)
    }
    componentWillReceiveProps(newProps){
        console.log('In component will receive props TrueFalse');
        this.setExamId(newProps.examId);
        //this.findAllExamsForLesson(newProps.lessonId)
    }

    createTrueFalse() {

     let newtruefalse;
        // let desc;
        // let isTrue;
        //let newtitle;
        // let point;
            // title = this.state.title;
            // desc = this.state.description;
            // isTrue = this.state.isTrue;
            // point = this.state.points;
    newtruefalse={
        title:this.state.title,
        desc : this.state.description,
        isTrue : this.state.isTrue,
        point : this.state.points
    }

        console.log("Hello logger"+newtruefalse.isTrue);
        this.trueFalseService.createTrueFalse(newtruefalse,this.state.examId)
            .then(this.props.navigation.navigate("ExamList"));
        //document.getElementById('titleFld').value = '';
    }


    updateForm(newState) {
        this.setState(newState)
    }
    render() {
        return(
            <View>
                <Text h3>True / False Question Model</Text>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                          checked={this.state.isTrue} title='The answer is true'/>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"
                onPress={this.createTrueFalse}/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Text h4>Preview</Text>
                <Divider
                    style={{
                        backgroundColor:
                            'blue' }} />
                <Text h4>{this.state.title}</Text>
                <Text>{this.state.description}</Text>

            </View>
        )
    }
}

export default TrueFalseQuestionEditor