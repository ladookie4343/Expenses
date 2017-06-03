import React, { Component, PropTypes } from 'react';
import { Modal, Text, TextInput, View, ScrollView, Button, Picker } from 'react-native';
import styles from './styles';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import ExpandableCell from '../ExpandableCell';
import * as storageMethods from '../../utils/storageMethods';
import * as iconMethods from '../../utils/iconMethods';

class AddExpensesModal extends Component {
    static propTypes = {
        modalVisible: PropTypes.bool.isRequired,
        month: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        toggleModal: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            amount: '',
            description: '',
            category: undefined,
            categoryPickerExpanded: false,
            date: new Date()
        }
    }

    render() {
        const expandableCellCategoryPickerTitle = 'Category: ' + 
        (this.state.category ? 
            iconMethods.categories[this.state.category].name : 
            'None (tap to change)')
        return (
            <Modal
                animationType={ 'slide' }
                transparent={ false }
                visible={ this.props.modalVisible }
                onRequestClose={ () => null }
            >
                <ScrollView style={ styles.modalContainer }>
                    <Text style={ styles.headerText }>
                        Add an Expense
                    </Text>
                    <View style={ styles.amountRow }>
                        <Text style={ styles.amountText }>
                        Amount
                        </Text>
                        <TextInput
                        keyboardType={ 'numeric' }
                        onChangeText={ (value) => this._changeAmount(value) }
                        placeholder={ '0' }
                        style={ styles.amountInput }
                        value={ this.state.amount }
                        />
                    </View>
                    <Text style={ styles.descriptionText }>
                        Description
                    </Text>
                    <TextInput
                        onChangeText={ (value) => this._changeDescription(value) }
                        placeholder={ 'Book on React Native development' }
                        style={ styles.descriptionInput }
                        value={ this.state.description }
                    />
                    <DatePicker
                        mode={ 'date' }
                        date={ this.state.date }
                        onDateChange={ (date) => this._onDateChange(date) }
                    />
                     <View style={ [styles.expandableCellContainer, { height: this.state.categoryPickerExpanded ? 200 : 40 }]}>
                        <View style={ styles.categoryIcon }>
                        { this.state.category && iconMethods.getIconComponent(this.state.category) }
                        </View>
                        <ExpandableCell
                            expanded={ this.state.categoryPickerExpanded }
                            onPress={ () => this._onCategoryPickerExpand() }
                            title={ expandableCellCategoryPickerTitle }>
                            <Picker
                                onValueChange={ (value, index) => this._setItemCategory(value) }
                                selectedValue={ this.state.category }>
                                { this._renderCategoryPicker() }
                            </Picker>
                        </ExpandableCell>
                    </View>
                    <Button
                        color={ '#86b2ca' }
                        disabled={ !(this.state.amount && this.state.description) }
                        onPress={ () => this._saveItemToBudget() }
                        title={ 'Save Expense' }
                    />
                    <Button
                        color={ '#e85c58' }
                        onPress={ () => this._clearFieldsAndCloseModal() }
                        title={ 'Cancel' }
                    />
                </ScrollView>
            </Modal>
        );
    }

    _changeAmount(amount) {
        this.setState({
            amount
        });
    }

    _changeDescription(description) {
        this.setState({
            description
        });
    }

    _onDateChange(date) {
        this.setState({ date });
    }

     _onCategoryPickerExpand () {
        this.setState({
            categoryPickerExpanded: !this.state.categoryPickerExpanded
        });
    }

    _renderCategoryPicker () {
        var categoryNames = Object.keys(iconMethods.categories);

        return categoryNames.map((elem, index) => {
            return (
                <Picker.Item
                    key={ index }
                    label={ iconMethods.categories[elem].name }
                    value={ elem }
                />
            )
        })
    }

    _setItemCategory (category) {
        this.setState({
        category
        });
    }

    async _saveItemToBudget() {
        const expenseObject = {
            amount: this.state.amount,
            category: this.state.category,
            date: moment(this.state.date).format('ll'),
            description: this.state.description
        };

        await storageMethods.saveItemToBudget(this.props.month, this.props.year, expenseObject);

        this._clearFieldsAndCloseModal();
    }

    _clearFieldsAndCloseModal() {
        this.setState({
            amount: '',
            category: undefined,
            categoryPickerExpanded: false,
            date: new Date(),
            description: ''
        });

        this.props.toggleModal();
    }
}

export default AddExpensesModal;