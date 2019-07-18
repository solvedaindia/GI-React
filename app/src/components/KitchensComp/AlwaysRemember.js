import React from 'react';
import { Row, Col,Grid } from 'react-bootstrap';


import  '../../../public/styles/kitchens/kitchens.scss'

class AlwaysRemember extends React.Component {
    constructor(props){
        super(props);
        const scatchImg1 =  require('../../../public/images/scatch1.png')
        const scatchImg2 =  require('../../../public/images/btnsch2.jpg')
        const scatchImg3 =  require('../../../public/images/btnsch3.jpg') 

        this.state = {
            imgList: [scatchImg1,scatchImg2,scatchImg3],
index: 0
        }
    }

    onHandleClickFirst= () => (this.state.index === 0 || this.state.index === 2) ?   this.setState({index:1}) : "" ;
    onHandleClickSecond= () => (this.state.index === 1 || this.state.index === 2) ?   this.setState({index:0}) : "" ;
    onHandleClickThird= () => (this.state.index === 0 || this.state.index === 1) ?   this.setState({index:2}) : "" ;

        
        
     
      
    
  

  render() {
    return (
        <div className="remembersection clear fix">
        <div className="row">
            <div className="RectanglularText col-md-5">                
                <h1 className="Image-gallery2">When planning your kitchen, always remember..</h1>
                <h3 className="The-Work-Triangle">The Work Triangle</h3>
                <p className="ParagraphSmall">This consists of 3 fundamental and basic workstations i.e. the sink, refrigerator and the cooking hob/range. The triangle is measured from the center of the sink to the top of the refrigerator to the center of the cooking range.</p>
                <h3 className="The-Work-Triangle ">The 26 Feet Rule</h3>
                <p className="ParagraphSmall">To ensure maximum efficiency, the work triangle perimeter should be at least 12 feet but must not exceed 26 feet.</p>

            </div>

            <div className="col-md-7">
           
               <div className="rememberImgbox">
                <div className="imgCenterbox">
                    <img className="imgcenter" src={this.state.imgList[this.state.index]} alt="rectangle"/>
                 </div>
                 
                 <div className="btnwrapper">
                      <button type="button" onClick={this.onHandleClickFirst.bind(this)} className="button active">G Kitchen</button>
                      <button type="button"  onClick={this.onHandleClickSecond.bind(this)} className="button">Parallel Kitchen</button>
                      <button type="button"  onClick={this.onHandleClickThird.bind(this)} className="button">L Kitchen</button>
                    </div>
               </div>
                 
            </div>
                    
          

        </div>
        </div>
    );
  }
}

export default AlwaysRemember;
