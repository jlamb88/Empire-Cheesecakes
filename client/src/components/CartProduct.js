import { Button, Row, Col } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import React, { useContext } from 'react';
// import { getProductData } from '../productStore';

// will give product information to the shopping cart modal
function CartProduct(props) {
    const cart = useCart()
    const id = props.id;
    const quantity = props.quantity;
    const price = props.price
    const name = props.name
    // const productData = getProductData(id);


    return (

        <div className="mb-3">
            <Row><h4>{name}</h4></Row>
            <Row>
                <Col>Qty: {quantity}</Col>
                <Col sm='6'>
                    <Button variant='secondary' sm='6' onClick={() => cart.addOneCart(id)} className='mx-2'>+</Button>
                    <Button variant='secondary' sm='6' onClick={() => cart.removeOne(id)} className='mx-2'>-</Button>
                </Col>
            </Row>
            <h4>${(quantity * price).toFixed(2)}</h4>
            <Button variant='danger' size='sm' onClick={() => cart.deleteFromCart(id)}>Remove</Button>
        </div>
    );
};

export default CartProduct;