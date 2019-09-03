import React from 'react'

const Maintenanceimg = (
    <img
      className="icon"
      src={require('../../../public/images/maintenance.png')}
    />
  );

const Maintenance = () =>
  <div className="pageNotfound">
    <div className="innerContainer">
        <div className="ErrorIcon">
            {Maintenanceimg}
        </div>
       
             
        <div className="ErrorText">
            <h3 className="heading">Site Under Maintenance</h3>
            <div className="errorDescription">Sorry for the inconvenience.To improve our services, we have momentarily shutdown our site.</div>
            <div className="UserDetailsform">
                <div class="form-group">                  
                  <div class="input-group">
                    <input type="email" class="form-control" name="validate-text" id="email" placeholder="Email ID" required=""/>
                    <span class="input-group-addon submit">Submit</span>
                  </div>
            </div>
                </div>
        </div>
     
        </div>
  </div>

export default Maintenance;