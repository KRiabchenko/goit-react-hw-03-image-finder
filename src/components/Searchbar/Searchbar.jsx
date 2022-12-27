import { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

export class Searchbar extends Component {
    state = {
        query: '',
    };

    handleSearchInput = e => {
        this.setState({ query: e.currentTarget.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.query === '') {
            alert('Введіть пошуковий запит');
        } else {
            this.props.onSubmit(this.state.query);
        }
    };

    render() {
        return (
            <Header>
                <Form onSubmit={this.handleSubmit}>
                    <Button type="submit">
                        <ButtonLabel>Search</ButtonLabel>
                    </Button>

                    <Input
                        type="text"
                        name="query"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleSearchInput}
                    />
                </Form>
            </Header>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
