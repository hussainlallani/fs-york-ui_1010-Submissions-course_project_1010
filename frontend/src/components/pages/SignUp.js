import React, { useState } from 'react'
import { Form, FormGroup, Col, Input, Label, Button, Container } from 'reactstrap'



const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    

    const formSubmit = async event => {
        event.preventDefault()
        const response = await fetch('http://localhost:9000/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : true, 
              },
            body: JSON.stringify({name, email, password})
        })
        const payload = await response.json()
        if (response.status >= 400) {
            // alert(`Oops! Error: ${payload.message}`)
            alert(`Oops! Error: ${payload.message} for fields: ${payload.invalid.join(",")}`)
        } else {
            alert(`Congrats! Submission submitted with id: ${payload.id}`)
            setEmail("");
            setName("");
            setPassword("");
        }
    }

    return (
        <Container>
           
            <Form className="my-5" onSubmit={formSubmit}>
                <FormGroup row>
                    <Label for="emailEntry" sm={2}>Email</Label>
                    <Col sm={10}>
                    <Input type="email" name="email" id="emailEntry" placeholder="Enter email to contact"  required value={email} onChange={e => setEmail(e.target.value) }/>
                    </Col>
                </FormGroup>
               
                <FormGroup row>
                    <Label for="nameEntry" sm={2}>Full Name</Label>
                    <Col sm={10}>
                    <Input type="name" name="name" id="nameEntry" placeholder="Enter your full name" required value={name} onChange={e => setName(e.target.value)}/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="messageEntry" sm={2}>Password</Label>
                    <Col sm={10}>
                    <Input type="password" name="password" id="passwordEntry" placeholder="Enter the password" required value={password} onChange={e => setPassword(e.target.value)}/>
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                    <Button color="primary">Submit</Button>
                    </Col>
                </FormGroup>
            </Form>
        </Container>
      )
    }

    export default SignUp