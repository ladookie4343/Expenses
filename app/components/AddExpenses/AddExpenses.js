import React, { Component, PropTypes } from 'react';
import { Button, View } from 'react-native';
import AddExpensesModel from '../AddExpensesModel';

class AddExpenses extends Component {
    
    static propTypes = {
        month: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        updateCurrentMonthExpenses: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);

        this.state = {
            modalVisible: false
        }
    }

    render() {
        return (
            <View>
                <AddExpensesModel
                    modalVisible={ this.state.modalVisible }
                    month={ this.props.month }
                    year={ this.props.year }
                    toggleModal={ () => this._toggleModal() }
                />
                <Button
                    color={ '#86b2ca' }
                    onPress={ () => this._toggleModal() }
                    title={ 'Add Expense' }
                />
            </View>
        );
    }

    _toggleModal() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
        this.props.updateCurrentMonthExpenses();
    }
}

export default AddExpenses;