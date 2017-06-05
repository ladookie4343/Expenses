import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator,  TabNavigator } from 'react-navigation';
import App from './app/App';
import EnterBudget from './app/components/EnterBudget'
import CurrentMonthExpenses from './app/components/CurrentMonthExpenses';
import PreviousMonthList from './app/components/PreviousMonthList';
import { paramsToProps } from './app/utils/navigation';
import TabIcon from './app/utils/TabIcon';

const Expenses = StackNavigator({
    App: { 
        screen: paramsToProps(App),
        navigationOptions: {
            title: 'Budget'
        }
    },
    EnterBudget: { 
        screen: paramsToProps(EnterBudget),
        navigationOptions: {
            title: 'Enter Budget'
        }
     },
    PreviousMonthList: { 
        screen: paramsToProps(PreviousMonthList),
        navigationOptions: {
            title: 'Previous Months'
        }
    },
    CurrentMonthExpenses: { 
        screen: paramsToProps(CurrentMonthExpenses),
        navigationOptions: {
            title: 'Current Month'
        }
    }
});

const Tabs = TabNavigator({
    CurrentMonth: { 
        screen: Expenses,
        navigationOptions: {
            title: 'Current Month',
            tabBarIcon: ({ focused, tintColor }) => (
                <TabIcon
                    iconDefault='usd'
                    iconFocused=''
                    focused={focused}
                    tintColor={tintColor}
                />
            )
        }
    },
    PreviousMonths: {
        screen: paramsToProps(PreviousMonthList),
        navigationOptions: {
            title: 'Previous Months'
        }
    }
});

AppRegistry.registerComponent('Expenses', () => Tabs);