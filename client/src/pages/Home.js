//DEPENDENCIES
import { NavLink } from 'react-router-dom';
import React from 'react'
import { Col, Row, Button, Container, Stack } from 'react-bootstrap'
import NaviBar from '../components/Navbar';

const Home = () => {
	return (
		<div>
			<Row>
				<Col className='col-2 align-content-space-evenly' id='splashbox'>
					<Row style={{ height: "125px" }}></Row>
					<Stack>
						<div className="mt-3"><h1>Shop Our Products</h1></div>
						<div className="mt-3"><h3>Handmade baked goods delivered</h3></div>
						<div><Button className='mt-4 formButton' variant="secondary" type="submit" as={NavLink} to="/store">Enter Store</Button></div>
					</Stack>
				</Col>
				<Col>
					<Row className='mt-3 justify-content-right'><NaviBar /></Row>
					<Row>
						<section id="hero">
							<img
								id="heroimage"
								src="/ECNFM.png"
								alt="Empire Cheesecake Logo"
								style={{ objectFit: "contain", maxWidth: "100%" }} />
						</section>
					</Row>
				</Col>
			</Row>

		</div >

	);
};

export default Home;
