import React from 'react';
import { productTitleCharLimit, productDescriptionCharLimit } from '../../../../public/constants/constants';
import { trimTheSentence } from '../../../utils/utilityManager';

class Title extends React.Component {
  render() {
    return (
      <p className="heading text">
        <h2 className="name">{this.props.titlePro.length > productTitleCharLimit ? trimTheSentence(this.props.titlePro, productTitleCharLimit) : this.props.titlePro } </h2>
        {this.props.descriptionPro ? (
          <p className="description">
            ({this.props.descriptionPro.length > productDescriptionCharLimit ? trimTheSentence(this.props.descriptionPro, productDescriptionCharLimit) : this.props.descriptionPro})
              </p>
        ) : null}
      </p>
    );
  }
}

export default Title;
