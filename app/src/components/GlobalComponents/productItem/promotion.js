import React from 'react';

class Promotions extends React.Component {
    render() {
        return (
            <p className='paragraph'>{this.props.data}</p>
        );
    }
}

export default Promotions;