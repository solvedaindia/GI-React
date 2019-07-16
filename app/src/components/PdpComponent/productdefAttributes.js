import React from 'react';
import { imagePrefix } from '../../../public/constants/constants';

class productDefAttribute extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedOption: '',
		}
	}

	handleOptionChange(count, e) {
		this.setState({
			selectedOption: e.target.value,
		});
		this.props.handleOptionData(count);
	}

	/* get radio button html */
	getRadioButtonHtml(radioName, radioValue, isChecked, count, selectedSwatches, index, isRadio, getActualSwatchesName) {
		let radioButtonHtml;
		let isDisabled = false;
		let radioButton = 'hideRadio';
		let radioChecked;
		if (isRadio) {
			radioButton = 'showRadio';
		}

		if (count > 0 && selectedSwatches.indexOf(radioValue) === -1) {
			isDisabled = true;
		}

		if (this.state.selectedOption === '') {
			radioChecked = isChecked;
		} else {
			radioChecked = getActualSwatchesName === radioValue;
		}

		radioButtonHtml = <input type='radio' disabled={isDisabled} name={radioName.replace(/\s/g, '')} className={`radio${count} ${radioButton}`} id={`radio_${count}_${index}`} value={radioValue} onChange={this.handleOptionChange.bind(this, count)} checked={radioChecked} />;
		return radioButtonHtml;
	}

	/* get selected swatches */
	getSelectedSwatches() {
		let selectedSwatches = Array();
		this.props.allselectedData.map(data => {
			data.defAttributes.map((swatches) => {
				selectedSwatches.push(swatches.values[0].name);
			});
		});
		return selectedSwatches;
	}

	/* make radio button */
	makeRadioButton(selectedSwatches) {
		return (
			this.props.defAttributes.map((data, i) => {
				let valueName = data.name;
				return (
					<div key={i}>
						<div className='att-val-name'><span className="attributeName">{valueName}:</span>  <span className="attributeVal">{this.props.selectedAttribute[i].values[0].name}</span><span id={`ColorName${i}`}></span></div>
						<ul className="clearfix">
							{
								data.values.map((value, index) => {
									let checkedType = false;
									let radioButtonHtml;
									let name = '';
									let imgUrl = '';
									let colorStyle = {
										display: "block",
									}
									let circle = 'display:block';
									let isRadio = false;
									let boxClass = '';

									if (this.props.selectedAttribute[i].values[0].name === value.name) {
										checkedType = true;
									}

									if (value.colorCode) {
										circle = 'circle';
										colorStyle = {
											backgroundColor: `rgb${value.colorCode}`,
										};
									} else if (value.facetImage) {
										imgUrl = value.facetImage;
										name = <img src={`${imagePrefix}${imgUrl}`} />;
									} else {
										name = value.name;
										isRadio = true;
									}

									if (isRadio === true) {
										boxClass = 'boxClass';
									}
									let selectedCircle = '';
									let isActiveBox = '';

									if (checkedType && !isRadio) {
										selectedCircle = 'selectedCircle';
									} else if(checkedType === true) {
										isActiveBox = 'active';
									}
									radioButtonHtml = <label htmlFor={`radio_${i}_${index}`} style={colorStyle} className={`${circle} ${selectedCircle}`}>{this.getRadioButtonHtml(data.name, value.name, checkedType, i, selectedSwatches, index, isRadio, this.props.selectedAttribute[i].values[0].name)}{name}</label>
									let isDisabled = '';

									if (i > 0 && selectedSwatches.indexOf(value.name) === -1) {
										isDisabled = 'disabled-attr';
									}
									return (
										<li className={`attributeList ${boxClass} ${isActiveBox} ${isDisabled}`} key={index}>
											{radioButtonHtml}
										</li>
									);
								})
							}
            			</ul>
						<div className="clearfix"></div>
					</div>
				);
			})
		)	
	}	

	render() {
		const selectedSwatches = this.getSelectedSwatches();
		const attributeHtml = this.makeRadioButton(selectedSwatches);

		return <div className="attr-details-box">{attributeHtml}</div>;
	}
}

export default productDefAttribute;
