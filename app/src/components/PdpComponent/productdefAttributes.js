import React from 'react';

class productDefAttribute extends React.Component {
  constructor() {
    super();
  }

  handleOptionChange(count) {
    this.props.handleOptionData(count);
  }

  /* get radio button html */
  getRadioButtonHtml(radioName, radioValue, isChecked, count, selectedSwatches, index) {
    let radioButtonHtml;
    let isDisabled = false;

    if(count > 0 && selectedSwatches.indexOf(radioValue) === -1) {
      // isDisabled = true;
    }

    radioButtonHtml = <input type='radio' disabled={isDisabled} name={radioName.replace(/\s/g, '')}  className={`radio${count}`} id={`radio_${count}_${index}`} value={radioValue} onChange={this.handleOptionChange.bind(this, count)} checked={isChecked}/>;
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

  getSelectedAllSwatches(selectedSwatches) {
    let arrayData = new Array();
    this.props.defAttributes.map((data, i) => {
      data.values.map((value, index) => {
        if (selectedSwatches.indexOf(value.name) !== -1) {
          arrayData.push(value.name);
        }
      })
    })
    return arrayData;
  }

  /* make radio button */
  makeRadioButton(selectedSwatches, getActualSwatchesName) {
    return (
      this.props.defAttributes.map((data, i) => {
      let valueName = data.name;

      return (
        <div key={i}>
            <div className='att-val-name'><b>{valueName}:  {getActualSwatchesName[i]}</b><span id={`ColorName${i}`}></span></div>
            <ul>
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
                    name = <img src={imgUrl} />; 
                  } else {
                name = value.name;
              }
              let selectedCircle = '';

                  if (checkedType) {
                    selectedCircle = 'selectedCircle';
              }
                  radioButtonHtml = <label htmlFor={`radio_${i}_${index}`} style={colorStyle} className={`${circle} ${selectedCircle}`}>{this.getRadioButtonHtml(data.name, value.name, checkedType, i, selectedSwatches, index)}{name}</label>
              
              let isDisabled = '';

                  if(i > 0 && selectedSwatches.indexOf(value.name) === -1) {
                    // isDisabled = 'disabled-attr';
                  }
                  return (
                    <li className={`attributeList ${isDisabled}`}  key={index}>
                      {radioButtonHtml}
                    </li>
              );
                })
								

              }
          </ul>
        </div>
        )
      })
    );
  }

  render() {
    const selectedSwatches = this.getSelectedSwatches();
    const getActualSwatchesName = this.getSelectedAllSwatches(selectedSwatches);
    let attributeHtml = this.makeRadioButton(selectedSwatches, getActualSwatchesName);

    return (
      <div className="attr-details-box">
        {attributeHtml}
      </div>
    );
  }
}

export default productDefAttribute;
