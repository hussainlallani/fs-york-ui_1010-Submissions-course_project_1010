import React from 'react'
import { Container, Row, Col, Button, CardBody, CardTitle, CardText, CardFooter, Card } from 'reactstrap'
import Tilt from 'react-tilt';

const Home = () => {
    return(
        <Container>
            <Row className="my-5">
                <Col lg="7">
                <Tilt className="Tilt" options={{ max : 25 }}  >
                    <img className="img-fluid rounded mb-4 mb-lg-0" src={"/img/laxon_arts_logo.jpg"} alt="" />
                </Tilt>
                </Col>
                <Col lg="5">
                    {/* <h1 className="font-weight-light">Laxon Arts</h1> */}
                    <p class="text-justify"><h2>Web Development Company</h2>
                    A Full-Service Digital Agency and Web Design Firm in Canada with Excellence in Web Design & Development Services
                        <ul>
                            <li>Designing robust websites for startups to top corp.</li>
                            <li>Help organizations to grab opportunities with reactive web apps</li>
                            <li>Experienced web experts team to make your project successful</li>
                        </ul>
                    </p>
                    <a href="/contact">
                         <Button color="primary">Get 30-Min FREE Consultation!</Button>
                    </a>
                </Col>
            </Row>
            <Card className="text-white bg-secondary my-5 py-4 text-center cta-line">
                <CardBody>
                    <CardText><p className="text-white m-0">Turn your business ideas into 'Clickable' solutions!</p></CardText>
                </CardBody>
            </Card>
            <Row className="text-center">
                <Col md="4" className="mb-5 align-items-stretch">
                    <Card className="h-100">
                        <CardBody>
                            <CardTitle><h2>CMS Website Development</h2></CardTitle>
                            <CardBody>We build dynamic CMS enabled websites that empower you and your business.</CardBody>
                        </CardBody>
                        <CardFooter className="text-center">
                        <a href="/contact">
                            <Button color="primary" size="sm">Consult With Our Experts!</Button>
                        </a>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="4" className="mb-5">
                    <Card className="h-100">
                        <CardBody>
                            <CardTitle><h2>eCommerce Store Development</h2></CardTitle>
                            <CardBody>We build a solid eCommerce portal that contains all essential features to simplify the online ordering process.</CardBody>
                        </CardBody>
                        <CardFooter className="text-center">
                        <a href="/contact">
                            <Button color="primary" size="sm">Consult With Our Experts!</Button>
                        </a>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="4" className="mb-5">
                    <Card className="h-100">
                        <CardBody>
                            <CardTitle><h2>Website Application Development</h2></CardTitle>
                            <CardBody> We help your business grow with a one-stop web app solution by creating user-centric designs.</CardBody>
                        </CardBody>
                        <CardFooter className="text-center"> 
                        <a href="/contact">
                            <Button color="primary" size="sm">Consult With Our Experts!</Button>
                        </a>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Home