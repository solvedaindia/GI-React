import React from 'react';
import { render } from 'react-dom';
import Form from 'react-bootstrap-form';
import Input from '../Primitives/consultFormInput'
import '../../../public/styles/wardrobes/warobes.scss'




class ConsultForm extends React.Component {
  state = {
    category: null,
    isLoading: true,
    errors: null,
  };

 /* getHeaderLayer2() {
    apiManager
      .get(navigationApi)
      .then(response => {
        this.setState({
          category: response.data.data.categoryArray,
          isLoading: false,
        });
        console.log('Category Navigation Data', response.data.data);
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getHeaderLayer2();
  }*/

    render() {
        return (
         <div>
           <div className="row">
             <div className="col-md-6 ">
               <label className="form-labeled" htmlFor="name">Full Name</label>
               <input className="form-controlerLeft" id="name" name="name" type="text" />
             </div>
             <div className="col-md-6">
               <label className="form-labeled" htmlFor="email">Email</label>
               <input className="form-controler" id="email" style={{marginLeft:'20'}} name="email" type="email" />
             </div>
           </div>
           <br /><br />
           <div className="row">
             <div className="col-md-6 ">
               <label className="form-labeled" htmlFor="dropdown">What Would you Like to Do</label>
               <select className="form-controlerLeft">
                 <option value="Select an option">Select an option</option>
                 <option value="Select an option">Select an option</option>
                 <option value="Select an option">Select an option</option>
                 <option value="Select an option">Select an option</option>
               </select>
             </div>
             <div className="col-md-6"> <label className="form-labeled" htmlFor="number">Mobile Number</label>
               <input className="form-controllering" id="number" name="number" type="number" /> </div>
           </div><br /><br /><br />
           <div className="row">
             <label className="form-labeled" htmlFor="massage">Massage</label>

             <input className="form-controlered" id="massage" name="massage" type="text" />
           </div>
           <div className='row'>
             <button className="send-div">Send</button>
           </div>
         </div>
        );
    }
}  

export default ConsultForm;
