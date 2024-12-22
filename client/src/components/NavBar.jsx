import { Container, Navbar, Nav, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="navbar">
        <Container>
          <Navbar.Brand>
            <Link className="text-light text-decoration-none ml-1000" to="/">
              MyApp
            </Link>
          </Navbar.Brand>
          <Navbar.Text className="text-warning">Logged in as Guest</Navbar.Text>
          <Nav>
            <Stack direction="horizontal" gap={4}>
              <Link className="link-light text-decoration-none" to="/login">
                Login
              </Link>
              <Link className="link-light text-decoration-none" to="/register">
                Register
              </Link>
            </Stack>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
