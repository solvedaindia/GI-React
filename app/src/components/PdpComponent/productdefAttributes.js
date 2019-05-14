import React from 'react';
import { newMachineUrl } from '../../../public/constants/constants';

class productDefAttribute extends React.Component {
	constructor() {
		super();
		this.state = {
			data: null,
			isLoading: true,
		}
	}

	handleOptionChange(count) {
		this.props.handleOptionData(count);
	}

	/* get radio button html */
	getRadioButtonHtml(radioName, radioValue, isChecked, count, selectedSwatches) { 
		let radioButtonHtml;
		let isDisabled = false;
		
		if(count > 0 && selectedSwatches.indexOf(radioValue) === -1) {
			isDisabled = true;
		}
		
		radioButtonHtml = <input type='radio' disabled={isDisabled} name={radioName}  id={`radio`+count} value={radioValue} onChange={this.handleOptionChange.bind(this, count)} checked={isChecked}/>
		return radioButtonHtml;
	}

  	/* get selected swatches */
	getSelectedSwatches() {
		let selectedSwatches = Array();
		 this.props.allselectedData.map((data) => {
			data.defAttributes.map((swatches) => {
				selectedSwatches.push(swatches.values[0].name);
			});
		});
		return selectedSwatches;
	}

	/* make radio button */
	makeRadioButton(selectedSwatches) {
		return(
			this.props.defAttributes.map((data, i) => (
				<div key={i}><b>{data.name}</b>
					<ul>
						{
							data.values.map((value, index) => {
								let checkedType = false;
								let radioButtonHtml;
								let name = '';
								let imgUrl = '';
			
								if (this.props.selectedAttribute[i].values[0].name === value.name) {
									checkedType = true;
								}
								
								if (value.colorCode) {
									name = value.colorCode;
								} else if(value.facetImage) {
									imgUrl = newMachineUrl+value.facetImage;
									name = <img src={imgUrl} />; 
								} else {
									name = value.name;
								}
								
								radioButtonHtml = <div>{this.getRadioButtonHtml(data.name, value.name, checkedType, i, selectedSwatches)}{name}</div>

								return(
									<li className='attributeList' key={index}>
										{radioButtonHtml}
									</li>
								);
							})
						}
					</ul>
				</div>
			))
		);
	}

	render() {
		const selectedSwatches = this.getSelectedSwatches();
		const makeRadioButton = this.makeRadioButton(selectedSwatches);
		return (
			<div>
				{makeRadioButton}
			</div>
		);
	}
}

export default productDefAttribute;
