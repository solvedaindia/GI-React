import React from 'react';
import { InfoWindow } from "react-google-maps";
class StoreInfoWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    openWindow() {
        this.setState({
            isOpen: true
        })
    }
    onCloseWindow() {
        this.setState({
            isOpen: false
        })
        this.props.onWindowClose()
    }


    render() {
        if (this.state.isOpen) {
            return (
                <InfoWindow onCloseClick={() => this.onCloseWindow()}>
                    <div style={{ margin: "10px", width: "270px" }}>
                        <h4>{this.props.storeName}</h4>
                        {this.props.pincode &&
                            <p>{this.props.data} Km</p>
                        }
                        {this.props.storeHours && this.props.storeHours.split('|')[0] && <p>{this.props.storeHours.split('|')[0]}</p>}
                        {this.props.storeHours && this.props.storeHours.split('|')[1] && <p>{this.props.storeHours.split('|')[1]}</p>}

                    </div>
                </InfoWindow>
            )
        }
        else {
            return null;
        }

    }

}
export default StoreInfoWindow;