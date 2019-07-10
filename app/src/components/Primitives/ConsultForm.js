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

               <input className="form-controlerLeft" id="name" name="name" type="text"/>

             </div>
             <div className="col-md-6">


               <div className="">
                 <input className="form-controler" id="name" style={{marginLeft:'20'}} name="name" type="text"/> </div>
             </div>
           </div><br/><br/>


           <div className="row">
             <div className="col-md-6 ">
                 <select className="form-controlerLeft">
                   <option value="Select an option">Select an option</option>
                   <option value="Select an option">Select an option</option>
                   <option value="Select an option">Select an option</option>
                   <option value="Select an option">Select an option</option>
                 </select>

             </div>
             <div className="col-md-6">


               <div className="">
               <label className="form-labeled" htmlFor="address">Name</label>

                 <input className="form-controler" id="name" name="name" type="text"/> </div>
             </div>
           </div><br/><br/><br/>
           <div className="row">
             <div className="col-md-12">

               <div className="form-div clearfix div-error">
                 <div className="">
                   <input className="form-controlered" id="name" name="name" type="text"/> </div>
               </div>
               <div className='row'>
                     <div className='col-md-12 form-group'>
                     <button className="">Send</button>
                     </div>                    
                    </div>

             </div>
           </div>

         </div>
        );
    }
}  

export default ConsultForm;
