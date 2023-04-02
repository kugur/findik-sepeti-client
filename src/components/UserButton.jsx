import { React } from "react";
import { DropdownButton, Button, Dropdown } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
export const UserButton = (data) => {
    const navigate = useNavigate();

    if (!data || !data.userInfo || !data.userInfo.email) {
        return <Button onClick={e => navigate('/login')}>
            Log in
        </Button>
    } else {
        return <DropdownButton id="user-dropdown-button" title={data.userInfo.email}>
            <Dropdown.Item as={Link}  to="/users">Kisisel Bilgiler</Dropdown.Item>
            <Dropdown.Item as={Link} to="/orders">Siparisler</Dropdown.Item>
            <Dropdown.Item onClick={data.onLogout}>Log out</Dropdown.Item>
        </DropdownButton>
    }

}