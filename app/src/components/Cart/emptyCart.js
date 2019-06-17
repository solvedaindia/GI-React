import React from 'React';
import '../../../public/styles/cart/emptyCart.scss';

class EmptyCart extends React.Component {
    render() {
      return (
        <section className='emptyCartContainer'>
            <div className='emptyCart'>
                <h2 className='title'><span className='cartBold'>Cart</span> is empty :( </h2>
                <div className=''>

                </div>
            </div>
            <div className='shopInfo'>
                <h2 className='shopTitle'>Why shop from us</h2>
            </div>
        </section>
      );
    }
}

export default EmptyCart;