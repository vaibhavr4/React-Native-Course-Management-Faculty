import React from 'react'
import {View,ScrollView, TextInput , StyleSheet} from 'react-native'
import {Text, Button, CheckBox, Divider} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import EssayService from '../services/EssayService'
import TrueFalseService from "../services/TrueFalseService";


class EssayQuestionEditor extends React.Component {
    static navigationOptions = { title: "Essay"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            answer: '',
            examId: ''
        }
        this.createEssay = this.createEssay.bind(this);
        this.setExamId = this.setExamId.bind(this);
        this.essayService = EssayService.instance;
    }

    setExamId(examId) {
        this.setState({examId: examId});
    }

    componentDidMount() {
        console.log('In component did mount- Essay');
        const {navigation} = this.props;
        this.state.examId = navigation.getParam("examId")
        // fetch("http://10.0.3.2:8080/api/lesson/"+lessonId+"/examwidget")
        //   .then(response => (response.json()))
        //   .then(widgets => this.setState({widgets}))
        //this.findAllExamsForLesson(this.state.lessonId);
        console.log("ExamID:"+this.state.examId)
    }
    componentWillReceiveProps(newProps){
        console.log('In component will receive props Essay');
        this.setExamId(newProps.examId);
        //this.findAllExamsForLesson(newProps.lessonId)
    }

    createEssay() {
    console.log("In create Essay")
        let newessay;
        // let desc;
        // let isTrue;
        //let newtitle;
        // let point;
        // title = this.state.title;
        // desc = this.state.description;
        // isTrue = this.state.isTrue;
        // point = this.state.points;
        newessay={
            title:this.state.title,
            desc : this.state.description,
            point : this.state.points,
            answer : this.state.answer
        }

        console.log("Hello logger"+newessay.title);
        this.essayService.createEssay(newessay,this.state.examId)
            .then(this.props.navigation.navigate("ExamList"));
        //document.getElementById('titleFld').value = '';
    }

    updateForm(newState) {
        this.setState(newState)
    }
    render() {
        return(
            <ScrollView>
                <Text h3>Essay Question Model</Text>
                <FormLabel>Essay Question Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>

                <TextInput
                    multiline = {true}
                    numberOfLines = {4}
                    onChangeText={
                    text => this.updateForm({description: text})
                }/>

                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                {/*<TextInput*/}
                    {/*multiline = {true}*/}
                    {/*numberOfLines = {4}*/}
                    {/*onChangeText={*/}
                        {/*text => this.updateForm({answer: text})}*/}
                        {/*value={this.state.text}*/}
                        {/*/>*/}
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder={"Type your answer here.."}
                        placeholderTextColor={"grey"}
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={
                            text => this.updateForm({answer: text})}
                        value={this.state.text}
                    />
                </View>



                <Button
                    onPress={this.createEssay}
                    backgroundColor="green"
                           color="white"
                           title="Save"/>
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
                <Text>{this.state.answer}</Text>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textAreaContainer: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    }
})

export default EssayQuestionEditor