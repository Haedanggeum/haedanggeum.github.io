import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Row style={{ padding: 2 + "em", textAlign: "center" }}>
        <h2 style={{ textAlign: "center" }}>기초분석기</h2>
      </Row>
      <Row>
        <Container style={{ paddingLeft: 2 + "em", paddingRight: 2 + "em" }}>
          {children}
        </Container>
      </Row>
    </>
  );
}
