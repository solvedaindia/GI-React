import React from 'react';
import {MESSAGE_CANCEL,DROPDOWN_OPTIONS,MESSAGE_TEXTBOX} from '../../constants/app/cancelConstants';

class DropDownList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelOrderDrop: false,
      cancelLineDrop: false,
      value: "", 
      text: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleState = this.handleState.bind(this);

  }


    handleChange(event) {
    this.setState({value: event.target.value});
    }

    handleChangeText(event) {
        this.setState({text: event.target.value});
    }
    handleState(){
      this.props.handleParentState(this.state.value,this.state.text);
      // console.log(this.state.value,this.state.text);
    }
    
  render() {
          const text =(
            <textarea placeholder= {MESSAGE_TEXTBOX} value={this.state.text} onChange={this.handleChangeText} maxLength ='100' />
         );
            
            const option1 =(
                <option value={DROPDOWN_OPTIONS[0]}>{DROPDOWN_OPTIONS[0]}
                </option>

            );

            const option2 =(
                <option  value={DROPDOWN_OPTIONS[1]}>{DROPDOWN_OPTIONS[1]}
                </option>
                );

    return (
       
      <>    
             <br/>
             {MESSAGE_CANCEL}
             <br/>
            <select   onChange={this.handleChange,this.handleState} onSelect ={}>
                {this.props.cancelOrderType ==='item' && option1}
                {this.props.cancelOrderType ==='item' && option2}
                <option disabled selected value="">Please choose reason</option>
                <option value={DROPDOWN_OPTIONS[2]}>{DROPDOWN_OPTIONS[2]}</option>
                <option value={DROPDOWN_OPTIONS[3]}>{DROPDOWN_OPTIONS[3]}</option>
                <option value={DROPDOWN_OPTIONS[4]}>{DROPDOWN_OPTIONS[4]}</option>
                <option value={DROPDOWN_OPTIONS[5]}>{DROPDOWN_OPTIONS[5]}</option>
                
            </select>
            <br/>    
            {this.state.value==="Other" && text}
            
      </>
    );
  }
}

export default DropDownList;
