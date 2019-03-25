import React from 'react';
import WelcomeBack from '../../WelcomeBack';
import axios from "axios";
import '../../../../public/styles/headerContainer/headerL1.scss';
/* Header API */
const secureHttp = 'https';
const port2 = '8002';
const host = 'localhost';
const heaerApi1 = `${secureHttp}://${host}:${port2}/api/v1/header_static_info`;
const headers1 = {
    'store_id': '10151',
    'access_token': 'U2FsdGVkX19d0pokZtJdXBiW30vxjkBf2uszk3LBlK9YM/m5uB+s/P8zUi2ITi2SfqKb05rKsyo4GP/MhDvvaUyfc9T+e0ZOhitF8ydSXvdoXtet7h9di6+Z8b0tDCdi1Jg8SaTXO/ShxJs/XFWp5qnaeR8rOukv+J+yd03OpKveMgDVwU/VryR3lXqngP4X/Pbk1il+SV0vfEz+tNA8OXAOqWTNWOjxqim1caXlTYMmLx52S4+Ku7mB43xL9theAVARrqJlbxSqtj8CMwlNefL3QBBiGgEW4Wl6VLksdZImnu2hmkBKL+ltNt7EPVDIdh/lireF+fJeRPk6C97/2YaB+pIEnHDUBfIVJBbV/4WiXvnNKgS7JsAwdsnxG3bNpYAO9p3U30fPrP6js2E8Q66k7tFywLwtGhXBge0wwgig+bIjp6HHJBxEybmMGkgTEg0sOmX7SI9XeZvjcWYkxs0NjoV+sjMwYnzN8LSPWfIGDR8r9gjs27T7N2PwRRXOVGy7gBQJYY9aiUBoLMBX6YRKKaxnNDRAwOo6DGUVEbUbGDSpl4wFQWC+xD/dTfQtYb5RolnY4BoNl+7ICZEN8FF69iTBrW0EpqWQbCIV8MpZ2PO4hCbpB2PH0ygGf8abDL7fFz/LwVzVMN0F0NdDTLiy8xDzFdBi8LDQtMziJbngUNChV+B0Kx2vff1sCjOjonJOVkBMuiOsiqaAYgVEKLDeh9z4iNrX0vaeW9et7UoX0X8sZrlnEhKl/dN/jEQhIcpJh6W1+IghfIM/3+1f/E/qckXV4yev3cQDdn+XjbQJVetF+2xxTRv0yOPpxCnSDzyVYmicZeQwqaHbR49Iv9uyZnykPxJQx5izvN0mVuNP4/O6E5+ZQlsHi3XxIVlJaRW84S54787Vm995xEAeAcnVPT8VJnunnBxjHDolkUopIQzwcj8W0+U34a3fMOpKlAtdBLHGD5aVbtUGz7rVoVPdc7MNKYLX5MO8XWydBEQ=' 
}

class HeaderL1 extends React.Component{
    state = {
        layer1Data:[],
        isLoading: true,
        errors: null
    };

    getHeaderLayer1() {
        axios
        .get(heaerApi1, {headers:headers1})
        .then(response => {
            this.setState({
                layer1Data: response.data.data.Header_Static_Links,
                isLoading: false
            });
                // console.log('#############', response.data.data.Header_Static_Links);
        })
        .catch(error => {
            this.setState({
                error,
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.getHeaderLayer1();
    }

    render() {
        const { isLoading, layer1Data } = this.state;
        return (
            <ul className='layer1'>
                {!isLoading ? (
                    layer1Data.map((linkData, index) => {
                        return (
                            <li className='listItems' key={index}>
                                <a className='action' href={linkData.action}>
                                    {linkData.text}
                                </a>
                            </li>
                        );
                    })
                ) : (
                    <div>Something Went Wrong</div>
                )}
            </ul>
        );
    }
}  

export default HeaderL1;
