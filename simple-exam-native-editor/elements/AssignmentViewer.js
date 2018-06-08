import React, {Component} from 'react'
import {View, ScrollView, Alert, TextInput, StyleSheet} from 'react-native'
import {Text, ListItem, FormLabel, FormInput, FormValidationMessage, Button, Divider, Icon, Card} from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'


class AssignmentViewer extends Component {
    static navigationOptions = {title: 'Assignment'};
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            widgetType:'Assignment',
            text: 'AssignmentWidget',
            lessonId:'',
            points:0,
            essayAnswer:'',
            uploadFileLink:'',
            link:'',
            assignId:'',
            assignview:{
                title:'',
                description: '',
                text: '',
                widgetType: '',
                points:'',
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

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    componentDidMount() {
        const {navigation} = this.props;

        this.state.lessonId = navigation.getParam("lessonId")
        this.state.assignId = navigation.getParam("assignId");
        console.log("In ques:"+this.state.assignId)
        fetch("http://10.0.3.2:8080/api/assign/"+this.state.assignId)
            .then(response => (response.json()))
            .then(assignview => this.setState({assignview}))
    }
    componentWillReceiveProps(newProps){
        const {navigation} = this.props;

        this.state.lessonId = navigation.getParam("lessonId")
        this.state.assignId = navigation.getParam("assignId");
        console.log("In ques:"+this.state.assignId)
        fetch("http://10.0.3.2:8080/api/assign/"+this.state.assignId)
            .then(response => (response.json()))
            .then(assignview => this.setState({assignview}))
    }

    // findAllAssignForLesson(lessonId) {
    //     console.log('In find all assign');
    //     this.assignService
    //         .findAllAssignForLesson(lessonId)
    //         .then((widgets) => {this.setState({widgets})});
    // }
    //
    // setAssign(widgets) {
    //     console.log('In setd Assign');
    //     this.setState({widgets: widgets})
    // }
    //
    // createAssign() {
    //     console.log("In create assign");
    //     let newAssign;
    //     newAssign={
    //         title:this.state.title,
    //         description : this.state.description,
    //         text : this.state.text,
    //         widgetType : this.state.widgetType,
    //         points: this.state.points,
    //         essayAnswer: this.state.essayAnswer,
    //         uploadFileLink:this.state.uploadFileLink,
    //         link:this.state.link
    //     }
    //     console.log("Widget Type:"+newAssign.widgetType);
    //     console.log("Widget Title:"+newAssign.title);
    //     this.assignService
    //         .createAssign
    //         (this.state.lessonId,newAssign)
    //         .then(this.props.navigation.navigate("AssignmentList",{lessonId:this.state.lessonId}))
    // }
    //
    // deleteAssign(widgetId) {
    //     console.log("In del assign");
    //     this.assignService
    //         .deleteAssign(widgetId)
    //         .then(() => {
    //             this.findAllAssignForLesson
    //             (this.state.lessonId)
    //         });
    //
    // }
    //
    //

    render() {
        return(
            <ScrollView style={{padding: 15}}>
                {/*{this.state.widgets.map(*/}
                    {/*(widget, index) => (*/}
                        {/*<ListItem*/}
                            {/*onPress={() => this.props.navigation*/}
                                {/*.navigate("AssignmentViewer", {assignId: widget.id})}*/}
                            {/*key={index}*/}
                            {/*subtitle={widget.description}*/}
                            {/*title={widget.title}*/}
                            {/*leftIcon={<Icon*/}
                                {/*reverse*/}
                                {/*name='trash'*/}
                                {/*type='font-awesome'*/}
                                {/*size={20}*/}
                                {/*onPress={() => this.deleteAssign(widget.id)}*/}
                                {/*style={{paddingRight:20}}*/}
                            {/*/>}*/}
                        {/*/>))}*/}
                {/*<Divider*/}
                    {/*style={{*/}
                        {/*backgroundColor:*/}
                            {/*'black'*/}
                    {/*}}/>*/}
                {/*<View>*/}
                    {/*<Text h4>Add Assignment Widget</Text>*/}
                    {/*<FormLabel>Title</FormLabel>*/}
                    {/*<FormInput onChangeText={*/}
                        {/*text => this.updateForm({title: text})*/}
                    {/*}/>*/}
                    {/*<FormValidationMessage>*/}
                        {/*Title is required*/}
                    {/*</FormValidationMessage>*/}

                    {/*<FormLabel>Description</FormLabel>*/}
                    {/*<FormInput onChangeText={*/}
                        {/*text => this.updateForm({description: text})*/}
                    {/*}/>*/}
                    {/*<FormValidationMessage>*/}
                        {/*Description is required*/}
                    {/*</FormValidationMessage>*/}

                    {/*<FormLabel>Points</FormLabel>*/}
                    {/*<FormInput onChangeText={*/}
                        {/*text => this.updateForm({points: text})*/}
                    {/*}/>*/}
                    {/*<FormValidationMessage>*/}
                        {/*Point is required*/}
                    {/*</FormValidationMessage>*/}

                    {/*<View style={{paddingVertical: 10}}>*/}
                        {/*<Text h4 style={{paddingHorizontal: 5}}>Essay answer</Text>*/}
                        {/*<TextInput style={styles.box} multiline={true} numberOfLines={5}*/}
                                   {/*onChangeText={*/}
                                       {/*text => this.updateForm({essayAnswer: text})*/}
                                   {/*}/>*/}
                    {/*</View>*/}
                    {/*<View style={{paddingVertical: 2, paddingBottom: 10}}>*/}
                        {/*<Text h4 style={{paddingHorizontal: 5}}>Upload File</Text>*/}
                        {/*<Button    buttonStyle={{*/}
                            {/*backgroundColor: 'gray',*/}

                            {/*borderColor: "transparent",*/}
                            {/*width: 100,*/}
                            {/*height: 15,*/}
                            {/*borderWidth: 0,*/}
                            {/*borderRadius: 5,*/}
                        {/*}} title="Upload"*/}
                        {/*/>*/}
                    {/*</View>*/}
                    {/*<View style={{paddingVertical: 2, paddingBottom: 10}}>*/}
                        {/*<Text h4 style={{paddingHorizontal: 5}}> Submit Link</Text>*/}
                        {/*<TextInput onChangeText={*/}
                            {/*text => this.updateForm({link: text})*/}
                        {/*}/>*/}
                    {/*</View>*/}

                    {/*<Button    buttonStyle={{*/}
                        {/*backgroundColor: 'green',*/}

                        {/*borderColor: "transparent",*/}
                        {/*borderWidth: 0,*/}
                        {/*borderRadius: 5,*/}
                    {/*}} title="Add Assignment"*/}
                               {/*leftIcon={{name:'check'}}*/}
                               {/*onPress={this.createAssign}*/}
                    {/*/>*/}
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
                                    <TextInput style={styles.box} multiline={true} numberOfLines={5}/>
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