import React, { Component } from 'react';

export const paramsToProps = (ComponentToRender, title) => {
    return class extends Component {
        static navigationOptions = {
            title: title
        }
        render() {
            const {navigation: {state: {params}}} = this.props
            return <ComponentToRender { ...params } { ...this.props } />
        }
    }
}