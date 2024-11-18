import React, { Component } from 'react';

class ErrorHandler extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: '' };
    }

    static getHasError(error) {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service here
        console.error("Error handler did catch:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>Error: {this.state.errorMessage}</div>;
        }

        return this.props.children;
    }
}

export default ErrorHandler;
