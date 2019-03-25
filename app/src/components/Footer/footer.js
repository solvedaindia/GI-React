import React from 'react';
import Footerlinks  from './footerLinks';
import Newsletter  from './newsletter';
import Stores  from './stores';
import Categories  from './categories';
import { Grid, Row, Col } from 'react-bootstrap';
import { footerLogoUrl } from '../../../public/constants/constants';

const FooterComponent = (props) => (
	<Grid>
		<Row>
			<Col md={8} sm={12} xs={12}>
				<Row>
					<div className='logo_white'>
						<img className='logo_width' src={footerLogoUrl} alt='logo'/>
					</div>
					<Footerlinks name={props.links} />
				</Row>
			</Col>
			<Col md={4} sm={12} xs={12}>
				<Row>
					<Newsletter name={props.newsletter} socialicon={props.socialicons}  />
				</Row>
			</Col>
		</Row>
		<Row>
			<Col md={8} sm={12} xs={12}>
				<Row>
					<Stores name={props.stores} />
				</Row>
			</Col>
			<Col md={4} sm={12} xs={12}>
				<Row>
					<Categories name={props.categories} />
				</Row>
			</Col>
		</Row>  
	</Grid>
);

export default FooterComponent;
