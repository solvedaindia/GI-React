import React from 'react';
import Filter from './filter';

class FilterMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterItem: null,
    };
  }

  componentDidMount() {
    if (this.props.filterDataPro) {
      const item = this.props.filterDataPro.map((item, index) => {
        return (
          <Filter key={index} dataPro={item} />
        )
      })
      this.setState({ filterItem: item });
    }
  }

  render() {
    console.log('filterr', this.state.filterItem);
    return (
      <>
        {this.state.filterItem}
      </>
    );
  }
}

export default FilterMain;
