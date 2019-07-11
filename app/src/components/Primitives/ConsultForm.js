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
             <div  className="form-div clearfix div-error">
               <div className="form-group">
                <label className="form-labeled" htmlFor="name">Full Name</label>
                <input className="form-control" id="name" name="name" type="text" />
               </div>
              </div>

             </div>
             <div className="col-md-6">
              <div  className="form-div clearfix div-error">
               <div className="form-group">
                  <label className="form-labeled" htmlFor="email">Email</label>
                  <input className="form-control" id="email"  name="email" type="email" />
                </div>
              </div>

              
             </div>
           </div>

          
           <div className="row">
             <div className="col-md-6 ">
             <div  className="form-div clearfix div-error">
                <div className="form-group">
                  <label className="form-labeled" htmlFor="dropdown">What Would you Like to Do</label>
                  <select className="form-control">
                    <option value="Select an option">Select an option</option>
                    <option value="Select an option">Select an option</option>
                    <option value="Select an option">Select an option</option>
                    <option value="Select an option">Select an option</option>
                  </select>
                </div>
             </div>              
             </div>
             
             <div className="col-md-6"> 
             <div  className="form-div clearfix div-error">
                <div className="form-group">
                  <label className="form-labeled" htmlFor="number">Mobile Number</label>
                  <input className="form-control" id="number" name="number" type="number" />
               </div>
              </div>
            </div>
           </div>


           <div className="row">
           <div className="col-md-12"> 
           <div  className="form-div clearfix div-error">
              <div className="form-group">
                <label className="form-labeled" htmlFor="massage">Massage</label>
                <input className="form-control" id="massage" name="massage" type="text" />
              </div>
           </div>
          </div>
           </div>

           <div className='row'>
           <div className="col-md-12">
           <div  className="form-div clearfix div-error">
            <div className="form-group">
              <button className="send-div">Send</button>
            </div>
             </div>
             </div>
           </div>
         </div>
        );
    }
}  

export default ConsultForm;
