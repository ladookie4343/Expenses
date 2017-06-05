import React, { Component } from 'react';
import { ListView, Text, View, TouchableHighlight } from 'react-native';
import styles from './styles';
import * as dateMethods from '../../utils/dateMethods';
import * as storageMethods from '../../utils/storageMethods';

export default class PreviousMonthsList extends Component {
    static navigationOptions = {
        title: 'Previous Months Expenses'
    }
    
  constructor (props) {
    super (props);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      listOfExpenses: {}
    };
  }

  async componentWillMount () {
    let result = await storageMethods.getAsyncStorage();

    this.setState({
      listOfExpenses: result
    });
  }

  render () {
    const dataSource = this.state.ds.cloneWithRowsAndSections(this.state.listOfExpenses);

    return (
      <View style={ styles.previousMonthsListContainer }>
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          renderRow={ (rowData, sectionId, rowId) => this._renderRowData(rowData, sectionId, rowId) }
          renderSectionHeader={ (sectionData, sectionID) => this._renderSectionHeader(sectionData, sectionID) }
          renderSeparator={ (sectionID, rowID) => this._renderRowSeparator(sectionID, rowID) }
        />
      </View>
    )
  }

  _renderRowData (rowData, sectionId, rowId) {
    return (
      <View style={ styles.rowDataContainer }>
        <TouchableHighlight
          onPress={ () => this._renderSelectedMonth(rowData, sectionId, rowId) }
          style={ styles.rowDataTouchableContainer }>
          <View style={ styles.textRow }>
            <Text style={ styles.rowMonth }>
              { dateMethods.getMonthString(rowId) }
            </Text>
            <Text style={ styles.rowBudget }>
              { rowData.budget }
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _renderRowSeparator (sectionID, rowID) {
    return (
      <View
        key={ sectionID + rowID }
        style={ styles.rowSeparator }
      />
    )
  }

  _renderSectionHeader (sectionData, sectionID) {
    return (
      <View style={ styles.sectionHeader }>
        <Text style={ styles.sectionText }>
          { sectionID }
        </Text>
      </View>
    )
  }

  _renderSelectedMonth (rowData, sectionId, rowId) {
      this.props.navigation.navigate('CurrentMonthExpenses', {
            budget: rowData.budget,
            expenses: rowData.expenses,
            month: rowId,
            spent: rowData.spent,
            year: sectionId
        });
  }
}