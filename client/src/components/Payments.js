import React from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';

class Payments extends React.Component {
    render() {

        return (
            <ReactStripeCheckout
                amount={500}
                token={token => console.log(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            />
        );
    }
}

export default Payments;
