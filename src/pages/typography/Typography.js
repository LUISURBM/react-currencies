import React from "react";
import { Row, Col, Progress } from "reactstrap";
import AnimateNumber from "react-animated-number";
import Widget from "../../components/Widget";
import { Button } from "@amcharts/amcharts4/core";

class Typography extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: undefined,
      payments: []
    };
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ update: false })
      };
      fetch("http://localhost:8090/payment/view", requestOptions).then((response) => response.json()).then((response) => {
        this.setState({ ...this.state, payments: response?.executions });
      }
      );
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (<div>
      <h1 className="page-title">
        Envios - <span className="fw-semi-bold">Historial de envios </span>
      </h1>
      <Row>
        <Col xs={12} lg={6}>
          <Widget
            title={
              <h5>
                Envios {" "}
                <small className="text-muted">de lotes</small>
              </h5>
            }
            close
            collapse
          >
            <h4>Reciente {this.state.payments?.length}</h4>
            <p>Lo último enviado <AnimateNumber value={this.state.payments?.length} /></p>
            <div className="widget-padding-md w-100 h-100 text-left border rounded">

              <Row>
                <Col sm={2}>
                  <p >BUYSELL</p>
                </Col>
                <Col sm={2}>
                  <p className="text-info">STATUS</p>
                </Col>
                <Col sm={2}>
                  <p className="text-warning">PLISID</p>
                </Col>
                <Col sm={2}>
                  <p className="text-primary">Total USD</p>
                </Col>
                <Col sm={2}>
                  <p className="text-lime">Total PLIS</p>
                </Col>
                <Col sm={2}>
                  <p className="text-success">batchTxt</p>
                </Col>
              </Row>
              {this.state.payments.map(p =>
              (
                <Row>
                  <Col sm={2}>
                    <p
                      onClick={(e) => this.view(e, p)}
                      className={`${p.bpyPymtPaymentId ? "text-success" : "text-danger"}`}>{p.symbol}</p>
                  </Col>
                  <Col sm={2}>
                    <p className="text-info">{p.texto}</p>
                  </Col>
                  <Col sm={2}>
                    <p className="text-warning">{p.account}</p>
                  </Col>
                  <Col sm={2}>
                    <p className={`${p.orderQty ? "text-primary" : "text-danger"}`}>{p.orderQty}</p>
                  </Col>
                  <Col sm={2}>
                    <p className={`${p.orderQty2 ? "text-lime" : "text-danger"}`}>{p.orderQty2}</p>
                  </Col>
                  <Col sm={2}>
                    <p className="text-success">{p.batchTxt}</p>
                  </Col>
                </Row>
              )
              )}
            </div>
          </Widget>
        </Col>

        <Col xs={12} lg={6}>
            <Progress
              color="red"
              value={10}
              className="progress-sm mb-xs"
            />
        </Col>
        <Col xs={12} lg={6}>
          <Widget
            title={
              <h5>
                Desembolso con estado<small className="text-muted">{this.state.payment?.bpyStatusId}</small>
              </h5>
            }
            close
            collapse
          >
            <h4>{this.state.payment?.bpyCurrencyQty}{this.state.payment?.bpyCurrencyQty2}</h4>
            <p>Re-enviar</p>
            <div className="widget-padding-md w-100 h-100 text-left border rounded">
              <textarea value={JSON.stringify(this.state.payment, null, 2)} cols="60" rows="55" ></textarea>
            </div>
          </Widget>
        </Col>
      </Row>
    </div>
    )
  }

  view = (e, p) => {
    e.preventDefault();
    this.setState({ payment: p });
  };
}

export default Typography;
