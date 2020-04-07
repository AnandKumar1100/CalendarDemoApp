import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import {styles} from "./styles";
import EmptyScreen from './EmptyScreen';

class CalendarView extends Component{
  constructor(props) {
    super(props);

    this.state = {
      items: {}
    };
    this.dateString = undefined;
  }
    
  render() {
      return (
          <SafeAreaView style={styles.fill}>
              <Agenda
                  theme={{ agendaKnobColor: 'black', agendaDayNumColor: 'green' }}
                  items={this.state.items}
                  markingType={'simple'}
                  renderEmptyDate={this.renderEmptyDate}
                  renderEmptyData={this.renderEmptyDate}
                  rowHasChanged={this.rowHasChanged}
                  renderItem={this.renderItem}
                  onDayPress={this.handleOnDayPress}
              />
          </SafeAreaView>
      );
  }

    handleOnDayPress = (day) => {
        this.dateString = day.dateString
    }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

    renderEmptyDate = () => {
        return (<EmptyScreen dateString={this.dateString} updateAgenda={this.updateAgenda}/>
        );
  }

  renderItem(item) {
    return (
      <View style={styles.agendaView}><Text style={styles.agendaText}>{item.name}</Text></View>
    )
  }
    
    updateAgenda = (newItem) => {
        const items = { ...this.state.items, ...newItem }
        this.setState({ items })
  }
    
};

export default CalendarView;
