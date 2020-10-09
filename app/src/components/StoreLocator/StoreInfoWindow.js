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

    get_tex_size(txt, font) {
        this.element = document.createElement('canvas');
        this.context = this.element.getContext("2d");
        this.context.font = font;
        var tsize = {'width':this.context.measureText(txt).width, 'height':parseInt(this.context.font)};
        return tsize;
    }


    render() {
        const markerWindowWidth = this.get_tex_size(this.props.storeHours.split('|')[0], "13px CeraGIRegular");
        if (this.state.isOpen) {
            return (
                <InfoWindow onCloseClick={() => this.onCloseWindow()}>
                    <div style={{ margin: "10px", width: markerWindowWidth }}>
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