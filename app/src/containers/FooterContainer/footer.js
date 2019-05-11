import React from 'react';
import apiManager from '../../utils/apiManager';
import { footerApi, storeId, accessToken } from '../../../public/constants/constants';
import Footer from '../../components/Footer/footer';
import '../../../public/styles/footerContainer/footerContainer.scss';
import { Alert } from 'react-bootstrap';

class FooterContainer extends React.Component {
    constructor() {
        super();
        this.callFooterApi = this.callFooterApi.bind(this);
        this.state = {
            data: {},
            loading: true,
            error: false,
        }
    }

    componentDidMount() {
        this.callFooterApi();
    }

    callFooterApi() {
            apiManager.get(footerApi).then(response => {
                this.setState({
                    footer: response.data,
                    loading: false
                });
            }).catch(error => {
                this.setState({
                    error: error.message,
                    loading: false
                });
            });
    }

    render() {
        return(
            <footer className='footer'>
                { !this.state.loading ? (
                    <>
                        {!this.state.error && this.state.footer.status === 'success' ? (
                            <Footer
                                links={this.state.footer.data.Footer_Links}
                                newsletter={this.state.footer.data.Footer_Newsletter_Data}
                                socialicons={this.state.footer.data.Footer_Social_Data}
                                stores={this.state.footer.data.Footer_StoreLinks}
                                categories={this.state.footer.data.Footer_Categories}        
                            />
                        ) : (
                            <Alert className='alert-danger text-center'>Something Went Wrong!</Alert>                
                        )}
                    </>
                ) : (
                    <Alert className='alert-primary text-center'>Footer is loading please wait....</Alert>
                )}
            </footer>
        )
    }
}

export default FooterContainer;