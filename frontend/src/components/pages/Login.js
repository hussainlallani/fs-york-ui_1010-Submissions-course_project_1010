import React, { useState } from 'react'
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, Card, CardBody, CardText } from 'reactstrap'
// import { useHistory, useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'


const Login = () => {
    let history = useHistory();
    // let location = useLocation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useState(true)

    const loginSubmit = async event => {
      
      event.preventDefault()
      try{
        const response = await fetch('http://localhost:9000/auth', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true, 
                },
              body: JSON.stringify({email, password})
          });
          const payload = await response.json();
          if (response.status >= 400) {
              setAuth(false);
          } else {
              console.log(payload);
              sessionStorage.setItem('token', payload.token);
              console.log({history});
  
              // let { from } = location.state || { from: { pathname: "/" } };
              // history.replace(from);
              history.push("/");
          }
        } catch(ex){
          if (ex.response && ex.response.status === 400){
            const errors = {...this.state.errors};
            errors.username = ex.response.data;
            this.setState({errors});
          }
          console.log(ex);
        }
    }

    return (
        <Container>
        {!auth && 
            <Card className="text-white bg-primary my-5 py-4 text-center">
            <CardBody>
                <CardText className="text-white m-0">Invalid credentials, please try again</CardText>
            </CardBody>
        </Card>
        }
        <Form className="my-5" onSubmit={loginSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="usernameEntry">Email</Label>
                <Input type="text" name="email" id="emailEntry" placeholder="Username" value={email} onChange={e => setEmail(e.target.value)}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="passwordEntry">Password</Label>
                <Input type="password" name="password" id="passwordEntry" placeholder="Valid password" onChange={e => setPassword(e.target.value)}/>
              </FormGroup>
            </Col>
          </Row>
          <Button color="success">Sign in</Button>
        </Form></Container>
    )
}

export default Login