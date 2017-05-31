import React, { Component } from 'react';
import { Text, View } from 'react-native';
import * as storageMethods from './utils/storageMethods';
import * as dateMethods from './utils/dateMethods';
import styles from './styles';

export default class App extends Component {
    static navigationOptions = {
        title: 'Expenses'
    }

    constructor (props) {
        super();
        this.state = {
            budgetSet: undefined
        }
    }

    async componentWillMount () {
        this.setState({
            month: dateMethods.getMonth(),
            year: dateMethods.getYear()
        });

        this._updateBudget();
    }

    render () {
        return (
            <View style={ styles.appContainer }>
                <Text>
                    Your budget is { this.state.budgetSet || 'not set' }!
                </Text>
            </View>
        )
    }

    _renderEnterBudgetComponent () {
        this.props.navigation.navigate('EnterBudget', {
            monthString: dateMethods.getMonthString(this.state.month),
            saveAndUpdateBudget: (budget) => this._saveAndUpdateBudget(budget)
        });
    }

    async _saveAndUpdateBudget (budget) {
        await storageMethods.saveMonthlyBudget(this.state.month, this.state.year, budget);

        this._updateBudget();
    }

    async _updateBudget () {
        let response = await storageMethods.checkCurrentMonthBudget();

        if (response !== false) {
            this.setState({
                budgetSet: response
            });
            return;
        }

        this._renderEnterBudgetComponent();
    }
}