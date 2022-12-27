import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './Gallery/ImageGallery/ImageGallery';

export class App extends Component {
    state = {
        query: '',
    };

    onSubmit = query => {
        this.setState({ query });
    };

    render() {
        return (
            <div>
                <Searchbar onSubmit={this.onSubmit} />
                <ImageGallery formQuery={this.state.query} />
            </div>
        );
    }
}
