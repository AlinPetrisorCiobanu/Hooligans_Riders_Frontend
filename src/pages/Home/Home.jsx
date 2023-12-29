import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.scss";

export const Home = () => {
  return (
    <>
      <Container fluid className="container-background-home">
        <Container fluid className="container-background-black"></Container>
        <Container className="text-center container-home">
          <Row className="mt-5">
            <Col className="login_home">
              <h1>Hooligans~Riders</h1>
              <Button
                className="button_custom mt-5 mb-5"
                href="http://localhost:5173/login_user"
              >
                Login
              </Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Row>
                <Col>
                  <Button className="button_custom" href="https://www.facebook.com/groups/460968801996657" target="blank"><i class="fa-brands fa-facebook"></i></Button>
                </Col>
                <Col>
                  <Button className="button_custom" href="https://www.instagram.com/hooligan.riders/" target="blank"><i class="fa-brands fa-instagram"></i></Button>
                </Col>
                <Col>
                  <Button className="button_custom" href="https://www.tiktok.com/@hooligan.rider" target="blank"><i class="fa-brands fa-tiktok"></i></Button>
                </Col>
                <Col>
                  <Button className="button_custom" href="#" target="blank"><i class="fa-brands fa-youtube"></i></Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};
