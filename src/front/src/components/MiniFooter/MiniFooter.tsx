import React, { FunctionComponent } from 'react';
import { Container, Jumbotron, Row, Col } from 'reactstrap';


const MiniFooter: FunctionComponent<{}> = () => {

  return (
    <>
      <Jumbotron className="bg-light p-3 m-0">
        <Row>
          <Col className="text-left font-weight-bolder">Masterpiece, 2021.</Col>
          <Col className="text-right font-weight-bolder">Anna Cuilhé</Col>
        </Row>

      </Jumbotron>

    </>
  );
};

export default MiniFooter;