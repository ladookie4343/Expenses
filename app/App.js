import React, { Component } from 'react';
import { Text, View } from 'react-native';
import * as storageMethods from './utils/storageMethods';
import * as dateMethods from './utils/dateMethods';
import { mockPreviousMonthExpenses } from './utils/mockDataMethods';
import AddExpenses from './components/AddExpenses';
import styles from './styles';
import CurrentMonthExpenses from './components/CurrentMonthExpenses';
import PreviousMonthsList from './components/PreviousMonthList';


export default class App extends Component {
    static navigationOptions = {
        title: 'Expenses'
    }

    constructor (props) {
        super();
        this.state = {
            budget: undefined
        }
    }

    async componentWillMount () {
        this.setState({
            expenses: [],
            month: dateMethods.getMonth(),
            year: dateMethods.getYear()
        });

        this._updateBudget();
    }

    render () {
        return (
            <View style={ styles.appContainer }>
                <CurrentMonthExpenses
                    budget={ this.state.budget || 0 }ty
                    expenses={ this.state.expenses }
                    month={ this.state.month }
                    spent={ this.state.spent || 0 }
                    year={ this.state.year }
                />
                <AddExpenses
                    month={ this.state.month }
                    updateCurrentMonthExpenses={ () => this._updateCurrentMonthExpenses() }
                    year={ this.state.year }
                />
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
        await storageMethods.saveMonthlyBudget(this.state.month, this.state.year, parseInt(budget));

        this._updateBudget();
    }

    async _updateBudget () {
        let response = await storageMethods.checkCurrentMonthBudget();

        if (response) {
            this.setState({
                budget: response.budget,
                spent: response.spent
            });

            this._updateCurrentMonthExpenses();
            return;
        }

        this._renderEnterBudgetComponent();
    }

    async _updateCurrentMonthExpenses () {
        let responseObject = await storageMethods.getMonthObject(this.state.month, this.state.year);

        if (responseObject) {
            this.setState({
                budget: responseObject.budget,
                expenses: responseObject.expenses,
                spent: responseObject.spent
            });
        }
    }
}