import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {styles} from "./styles";

class EmptyScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      showEditableField: false,
      agendaText: undefined
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dateString !== this.props.dateString) {
      this.setState({ showEditableField: false, agendaText: undefined })
    }
  }
    
  render() {
      return (
          <View style={styles.emptyDate}>
              <Text style={styles.emptyDateText}>This is empty date!</Text>
              {!!this.state.showEditableField && <TextInput
                  style={styles.textInput}
                  onChangeText={this.onChangeText}
              />}
              <TouchableOpacity style={styles.createTaskBtn} onPress={this.createTask}><Text style={styles.createTaskBtnText}>{this.state.agendaText ? 'Submit' : 'Create Task'}</Text></TouchableOpacity>
          </View>
      );
  }


  createTask = () => {
    if (this.state.agendaText && this.state.showEditableField) {
      const dateString = this.props.dateString ? this.props.dateString : this.getTodayDate()
      const item = { [dateString]: [{ 'name': this.state.agendaText }] };
      this.props.updateAgenda(item)
    }
    else if (this.state.showEditableField) {
      alert('Enter the text')
    }
    else
      this.setState({ showEditableField: true })
  }

  getTodayDate() {
    var d = new Date()
    var month = '' + (d.getMonth() + 1)
    var day = '' + d.getDate()
    var year = d.getFullYear()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  onChangeText = (text) => {
    this.setState({ agendaText: text });
  }
};

export default EmptyScreen;
