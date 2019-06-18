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
        <div className="container">
        <div className="Blacks">

        <div className="row">

            <div className="col-md-4">
                
                <div className="Rectangle-Copy-4">
                    <h1 className="Image-gallery2">When planning your<br /> kitchen, always remember..</h1>
                <h3 className="The-Work-Triangle ">The Work Triangle</h3>
                <p4 className="ParagraphSmall">This consists of 3 fundamental and basic<br/> workstations i.e. the sink, refrigerator and<br/> the cooking hob/range. The triangle is<br/> measured from the center of the sink to the<br/> top of the refrigerator to the center of the<br/> cooking range.</p4>
                <h3 className="The-Work-Triangle ">The 26 Feet Rule</h3>
                <p4 className="ParagraphSmall">To ensure maximum efficiency, the work<br/> triangle perimeter should be at least 12 feet<br/> but must not exceed 26 feet.</p4>

                </div>
            </div>

            <div className="col-md-8">
            <img
                      className="Group-60"
                      src={this.state.imgList[this.state.index]}
                      alt="rectangle"
                    />
                    <div className="btn-group">
  <button type="button" onClick={this.onHandleClickFirst.bind(this)} className="rectbut1">G Kitchen</button>
  <button type="button"  onClick={this.onHandleClickSecond.bind(this)} className="rectbut1">Parallel Kitchen</button>
  <button type="button"  onClick={this.onHandleClickThird.bind(this)} className="rectbut1">L Kitchen</button>
</div>
            </div>

        </div>
        </div>
        </div>
    );
  }
}

export default AlwaysRemember;
