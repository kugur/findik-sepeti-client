import {React, useContext, useEffect} from "react";
import { Navbar, Container, Nav, Stack, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { UserButton } from "./UserButton";
import { UserContext } from "app/UserContext";

export const TopNavigation = (data) => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.email) {
            fetch("http://" + process.env.REACT_APP_SERVER_URL + "/users", {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': 'localhost:8080, localhost:3000',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
                    'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept, Authorization, X-Requested-With',
                },
            })
                .then(function (response) {
                
                    if (response.status === 200) {
                        console.log("resonse :: ", response);
                        return response.json();
                    } else if (response.status === 403) {
                        // Handle error case
                        console.log("exceoption occurred while fetching products");
                      
                    }
                })
                .then(function (data) {
                    // Do something with the data, like store it in a local variable
                    if (data) {
                        console.log(`Response body ${JSON.stringify(data)}`);
                        setUser(data);
                      
                    }
            })
        }
    })
    // const userInfo = data && data.userInfo;
    
    // console.log(`userinfo in Topnavigation ::: ${JSON.stringify(userInfo, null, 2)}`);
    
    return (
        <Navbar bg="light" expand="lg" className="dashboard">
            <Container  >
                <Navbar.Brand as={Link} to="/" >Findik Sepeti</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="justify-content-md-center">
                    <Nav className="me-auto">
                        <Nav.Link href="login">Home</Nav.Link>
                        <Nav.Link href="processedNuts">Islenmis Findik</Nav.Link>
                        <Nav.Link href="raw">Islenmemis Findik</Nav.Link>
                        {/* <Form className="d-flex justify-center">
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
        </Form> */}
                    </Nav>
                </Navbar.Collapse>
                <Stack direction="horizontal" gap={1} className='m-2' >
                    <UserButton userInfo={user}></UserButton>
                    {/* <Button variant="outline-secondary" onClick={e => navigate('/login')}> {userInfo ? userInfo.email : 'Log in'}</Button> */}
                    <Button variant="secondary" >Sepet</Button>
                </Stack>
            </Container>
        </Navbar>
    );
};


