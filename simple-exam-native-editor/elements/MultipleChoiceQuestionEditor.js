import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import {Text, Button, CheckBox, Divider, ListItem, Icon, Card} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import MultipleChoiceService from '../services/MultipleChoiceService'

class MultipleChoiceQuestionEditor extends Component {
    static navigationOptions = { title: "Multiple Choice"}
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            points: 0,
            type: 'multi',
            options: '',
            correctOption: 0,
            examId:'',
            lessonId:'',
            choices:[]
        };
        this.createMulti = this.createMulti.bind(this);
        this.setExamId = this.setExamId.bind(this);
        this.multipleChoiceService = MultipleChoiceService.instance;
        this.addChoice = this.addChoice.bind(this);
    }

    setExamId(examId) {
        this.setState({examId: examId});
    }

    componentDidMount() {
        console.log('In component did mount- Multi');
        const {navigation} = this.props;
        this.state.examId = navigation.getParam("examId")
        this.state.lessonId = navigation.getParam("lessonId")
        // fetch("http://10.0.3.2:8080/api/lesson/"+lessonId+"/examwidget")
        //   .then(response => (response.json()))
        //   .then(widgets => this.setState({widgets}))
        //this.findAllExamsForLesson(this.state.lessonId);
        console.log("ExamID:"+this.state.examId)
    }
    componentWillReceiveProps(newProps){
        console.log('In component will receive props Multi');
        this.setExamId(newProps.examId);
        //this.findAllExamsForLesson(newProps.lessonId)
    }


    saveQuestion(){

        var  allOpt = this.state.choices
        var i
        var joinedOptions="";
        for(i=1;i<allOpt.length;i++){
            joinedOptions = joinedOptions + allOpt[i-1].option+";";
        }

        if((allOpt.length-1)>=0)
            joinedOptions = joinedOptions + allOpt[allOpt.length-1].option

        this.state.options=joinedOptions
        console.log(joinedOptions)

    }

    createMulti() {

        let newmulti;
        this.saveQuestion()
        let opt;
        // let desc;
        // let isTrue;
        //let newtitle;
        // let point;
        // title = this.state.title;
        // desc = this.state.description;
        // isTrue = this.state.isTrue;
        // point = this.state.points;
        newmulti={
            title:this.state.title,
            desciption : this.state.description,
            points : this.state.points,
            type: this.state.type,
            options: this.state.options,
            correctOption: this.state.correctOption
        }


        console.log("Hello logger"+newmulti.correctOption);
        this.multipleChoiceService.createMulti(newmulti,this.state.examId)
            .then(this.props.navigation.navigate("QuestionList",{lessonId:this.state.lessonId}));
        //document.getElementById('titleFld').value = '';
    }


    updateForm(newState) {
        this.setState(newState)
    }

    addChoice(newChoice) {
        this.setState({ choices: [ ...this.state.choices, {
                option: newChoice
            }]})
    }

    setCorrectOption (index, value) {
        this.setState({
            correctOption: index
        })
        console.log("CORRECT"+this.state.correctOption)
    }

    deleteOption (index) {
        var array= this.state.choices
        array.splice(index, 1)
        this.setState ({choices: array})
    }

    render() {
        return(
            <ScrollView>
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

                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={points => this.updateForm({points: points})}/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <FormLabel>Choices</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({options: text})
                }/>
                <FormValidationMessage>
                    Choice is required
                </FormValidationMessage>
                <Button title="Add Choice"
                        onPress={() => this.addChoice
                        (this.state.options)}/>

                {this.state.choices.map(
                    (choice, index) => (
                        <ListItem
                            key={index}
                            title={choice.option}
                            leftIcon={<Icon
                                reverse
                                name='circle'
                                type='font-awesome'
                                size={2}
                                onPress={() => this.setCorrectOption(index, choice)}
                                style={{paddingRight:20}}
                            />}
                            rightIcon={ <Icon
                                reverse
                                name='trash'
                                type='font-awesome'
                                size={10}
                                onPress={() => this.deleteOption(index)}
                                style={{paddingRight:20}}
                            />}
                        />
                    ))}

                <FormValidationMessage>
                    Click on the left icon to chose the correct option
                </FormValidationMessage>


                <Button
                    onPress={this.createMulti}
                    backgroundColor="green"
                           color="white"
                           title="Save"/>
                <Button
                    onPress={() =>this.props
                        .navigation
                        .goBack()}
                    backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Text h4>Preview</Text>
                <Divider
                    style={{
                        backgroundColor:
                            'blue' }} />
                {/*<Text h4>{this.state.title}</Text>*/}

                <ScrollView style={{paddingVertical: 10}}>
                    <View style={{paddingHorizontal: 5}}>
                        <Card style={{height: 400}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 1}}>
                                    <Text h4>{this.state.title}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{textAlign: 'right'}}>{this.state.points} pts</Text>
                                </View>
                            </View>
                            <View style={{paddingVertical: 2}}>
                                <Text>{this.state.description}</Text>
                            </View>
                            <View>
                                {this.state.choices.map(
                                    (choice, index) => (
                                        <ListItem
                                            key={index}
                                            title={choice.option}
                                            leftIcon={<Icon
                                                reverse
                                                name='circle'
                                                type='font-awesome'
                                                size={2}
                                                // onPress={() => this.setCorrectOption(index, choice)}
                                                style={{paddingRight:20}}
                                            />}

                                        />))}
                            </View>

                        </Card>
                    </View>
                </ScrollView>


            </ScrollView>
        )
    }
}

export default MultipleChoiceQuestionEditor


