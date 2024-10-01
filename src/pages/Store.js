import { Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard'
import NaviBar from '../components/Navbar';
import Header from '../components/Header'
import { useQuery, useLazyQuery } from '@apollo/client';
import { PRODUCTS, USER_CART } from '../utils/queries'
import { useAuth } from '../contexts/AuthContext'


function Store() {

    const { loading, error, data } = useQuery(PRODUCTS);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const products = data?.products || [];

    return (

        <div>
            <Row>
                <Col className='col-6'>
                    <Header />
                </Col>
                <Col className='mt-3 justify-content-right'>
                    <NaviBar />
                </Col>
            </Row>
            <h1 align='center' className='p-3'>
            </h1>
            <Row xs={1} sm={2} md={4} className='g-4'>
                {products.map((product) => (
                    <Col align='center' key={product._id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Store;