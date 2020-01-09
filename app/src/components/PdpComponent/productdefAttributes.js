import React from 'react';
import { imagePrefix } from '../../../public/constants/constants';

class productDefAttribute extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedOption: '',
		}
	}

	handleOptionChange(e) {
		this.setState({
			selectedOption: e.target.value,
		});
		this.props.handleOptionData(this.props.defAttributes.length);
	}

	/* get radio button html */
	getRadioButtonHtml(radioName, radioValue, isChecked, count, selectedSwatches, index, isRadio, resolvedSku) {
		let radioButtonHtml;
		let isDisabled = false;
		let radioButton = 'hideRadio';
		let radioChecked;
		if (isRadio) {
			radioButton = 'showRadio';
		}

		if (count > -1 && selectedSwatches.indexOf(radioValue) === -1 && this.props.defAttributes.length > 1) {
			isDisabled = true;
		}

		if (this.state.selectedOption === '') {
			radioChecked = isChecked;
		} else {
			if(resolvedSku.indexOf(radioValue+radioName) === -1) {
				radioChecked = false;
			} else {
				radioChecked = true;
			}
		}
		radioButtonHtml = <input type='radio' disabled={isDisabled} name={radioName.replace(/\s/g, '').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')} className={`radio${count} ${radioButton}`} id={`radio_${count}_${index}`} value={radioValue} onChange={this.handleOptionChange.bind(this)} checked={radioChecked} />;
		return radioButtonHtml;
	}

	/* get selected swatches */
	getSelectedSwatches() {
		let selectedSwatches = Array();
		let getData;
		this.props.allselectedData.map(data => {
			if (data.defAttributes) {
				getData = data.defAttributes;
			} else if (data.swatchAttributes) { 
				getData = data.swatchAttributes;
			}

			getData.map((swatches) => {
				if(selectedSwatches.indexOf(swatches.values[0].name) === -1) {
					selectedSwatches.push(swatches.values[0].name);
				}
			});
		});
		
		return selectedSwatches;
	}

	/* get resolved swatches */
	getResolvedSwatchesName() {
		let resolvedSwatchesName = Array();
		let resolvedSku;
		if (this.props.resolvedSku.defAttributes) {
			resolvedSku = this.props.resolvedSku.defAttributes;
		} else if (this.props.resolvedSku.swatchAttributes) {
			resolvedSku = this.props.resolvedSku.swatchAttributes;
		}

		resolvedSku.map(attributeValue => {
			resolvedSwatchesName.push(attributeValue.values[0].name+attributeValue.name);
		});
		return resolvedSwatchesName;
	}

	getSwatchNameInFormat(resolvedSku) {
		let swatchesFormatArr = Array();
		this.props.defAttributes.map((data, i) => {
			data.values.map(getVal => {
				if(resolvedSku.indexOf(getVal.name+data.name) !== -1) {
					swatchesFormatArr.push(getVal.name);
					// if (getVal.colorCode) {
					// 	swatchesFormatArr.push(getVal.name);
					// } else {
					// 	swatchesFormatArr.push('');
					// }
				}
				
			})
		})
		return swatchesFormatArr;
	}

	/* make radio button */
	makeRadioButton(selectedSwatches, resolvedSku) {
		
		const getSwatchNameInFormat = this.getSwatchNameInFormat(resolvedSku);
		return (
			this.props.defAttributes.map((data, i) => {
				let valueName = data.name;
				return (
					<div key={i}>
						<div className='att-val-name'><span className="attributeName">{valueName} {getSwatchNameInFormat[i] && ':'}</span>  <span className="attributeVal">{getSwatchNameInFormat[i]}</span><span id={`ColorName${i}`}></span></div>
						<ul className="clearfix swatcheWrapper">
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

									if (resolvedSku.indexOf(value.name+data.name) !== -1) {
										checkedType = true;
									}

									if (value.colorCode) {
										circle = 'circle';
										colorStyle = {
											backgroundColor: `rgb${value.colorCode}`,
										};
									} else if (value.facetImage) {
										circle = 'circleImg';
										imgUrl = value.facetImage;
										name = <img className="imgCircle" alt={value.name} src={`${imagePrefix}${imgUrl}`} />;
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
									radioButtonHtml = <h2 className='swachesHeading'><label htmlFor={`radio_${i}_${index}`} style={colorStyle} className={`${circle} ${selectedCircle}`}>{this.getRadioButtonHtml(data.name, value.name, checkedType, i, selectedSwatches, index, isRadio, resolvedSku)}{name}</label></h2>
									let isDisabled = '';

									if (i > -1 && selectedSwatches.indexOf(value.name) === -1 && this.props.defAttributes.length > 1) {
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
		const resolvedSwatches = this.getResolvedSwatchesName();
		const attributeHtml = this.makeRadioButton(selectedSwatches, resolvedSwatches);

		return <div className="attr-details-box">{attributeHtml}</div>;
	}
}

export default productDefAttribute;