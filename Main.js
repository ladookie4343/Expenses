import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import App from './app/App';
import EnterBudget from './app/components/EnterBudget'

const Expenses = StackNavigator({
    App: { screen: App },
    EnterBudget: { screen: EnterBudget }
});

AppRegistry.registerComponent('Expenses', () => Expenses);