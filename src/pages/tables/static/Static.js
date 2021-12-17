import React from "react";
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
} from "reactstrap";
import { Sparklines, SparklinesBars } from "react-sparklines";

import Widget from "../../../components/Widget";
import s from "./Static.module.scss";
import { order, desembolsos } from "./mock";
import { toast } from "react-toastify";

class Static extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      tableStyles: [
        {
          id: 1,
          picture: require("../../../assets/tables/1.png"), // eslint-disable-line global-require
          description: "Monto base",
          label: {
            colorClass: "primary",
            text: "Enviar",
          },
          info: {
            type: "NUEVO",
            total: 0,
          },
          date: new Date("September 14, 2012"),
          size: 1,
          progress: {
            percent: 29,
            colorClass: "success",
          },
        },
        {
          id: 2,
          picture: require("../../../assets/tables/2.png"), // eslint-disable-line global-require
          description: "Monto destino",
          label: {
            colorClass: "primary",
            text: "Enviar",
          },
          info: {
            type: "NUEVO",
            total: 0,
          },
          date: new Date("November 14, 2012"),
          size: 1,
          progress: {
            percent: 33,
            colorClass: "warning",
          },
        },
        {
          id: 3,
          picture: require("../../../assets/tables/3.png"), // eslint-disable-line global-require
          description: "Maximización",
          label: {
            colorClass: "primary",
            text: "Enviar",
          },
          info: {
            type: "NUEVO",
            total: 0,
          },
          date: new Date("September 14, 2012"),
          size: 1,
          progress: {
            percent: 38,
            colorClass: "inverse",
          },
        },
        {
          id: 4,
          picture: require("../../../assets/tables/4.png"), // eslint-disable-line global-require
          description: "Monto directo",
          label: {
            colorClass: "primary",
            text: "Enviar",
          },
          info: {
            type: "NUEVO",
            total: 0,
          },
          date: new Date("September 15, 2012"),
          size: 1,
          progress: {
            percent: 17,
            colorClass: "danger",
          },
        },
        {
          id: 5,
          picture: require("../../../assets/tables/5.png"), // eslint-disable-line global-require
          description: "Ordenes con problemas",
          info: {
            type: "NUEVO",
            total: 0,
          },
          date: new Date("October 1, 2012"),
          size: 1,
          progress: {
            percent: 41,
            colorClass: "primary",
          },
        },
        {
          id: 6,
          picture: require("../../../assets/tables/5.png"), // eslint-disable-line global-require
          description: "Ordenes combinadas",
          label: {
            colorClass: "primary",
            text: "Enviar",
          },
          info: {
            type: "NUEVO",
            total: 0,
          },
          date: new Date("October 1, 2012"),
          size: 1,
          progress: {
            percent: 41,
            colorClass: "primary",
          },
        },
      ],
      checkboxes1: [false, true, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],
      options: {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
      },
    };


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch("http://localhost:8090/batch/country", requestOptions).then((response) => response.json()
    ).then((response) => {
      this.setState({
        countries: response
      })
    }
    );
    this.checkAll = this.checkAll.bind(this);
    this.checkCountry = this.checkCountry.bind(this);

  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${this.dateSet[2]
      }, ${this.dateSet[3]}`;
  }

  checkAll(ev, checkbox) {
    const countriesToBeFiltered = [...this.state.countries];
    const countriesFiltered = countriesToBeFiltered.map(c => {
      c[3] = ev.target.checked;
      return c;
    })
    const ceckboxvalue = this.state.countries.filter(c => c[3] === true).length === this.state.countries.length;
    this.setState({
      [checkbox]: ceckboxvalue,
      countries: countriesFiltered,
    });
  }

  changeCheck(ev, checkbox, id) {
    //eslint-disable-next-line
    this.state[checkbox][id] = ev.target.checked;
    if (!ev.target.checked) {
      //eslint-disable-next-line
      this.state[checkbox][0] = false;
    }
    this.setState({
      [checkbox]: this.state[checkbox],
    });
  }

  checkCountry(id, ev) {
    let countriesToUpdate = [...this.state.countries];
    countriesToUpdate[id][3] = countriesToUpdate[id][2] && ev.target.checked
    this.setState({ countries: countriesToUpdate });

  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Desembolsos - <span className="fw-semi-bold">MOCKUP</span>
        </h2>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <Widget
              title={
                <h5>
                  Ejecutar <span className="fw-semi-bold">Escenario</span>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <div className={s.overFlow}>
                <Table lg={12} md={12} sm={12} striped>
                  <thead>
                    <tr className="fs-sm">
                      <th>Escenario</th>
                      <th className="hidden-sm-down">Info</th>
                      <th className="hidden-sm-down">Últ. Ejecución</th>
                      <th className="hidden-sm-down">Ordenes</th>
                      <th className="hidden-sm-down">Completados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tableStyles.map((row, index) => (
                      <tr key={row.id}>
                        <td >
                          {row.description}
                          {row.label && (
                            <div>
                              <Button
                                disabled={(!this.state.countries || this.state.countries.filter(e => e[3]).length <= 0)}
                                className="mr-2" size="sm" color={row.label.colorClass} onClick={() => { this.toggle(row, index); }}>
                                {row.label.text}
                              </Button>
                            </div>
                          )}
                        </td>
                        <td>
                          <p className="mb-0">
                            <small>
                              Type:
                              <span className="text-muted fw-semi-bold">
                                &nbsp; {row.info.type}
                              </span>
                            </small>
                          </p>
                          <p>
                            <small>
                              Total USD:
                              <span className="text-muted fw-semi-bold">
                                &nbsp; {row.info.total}
                              </span>
                            </small>
                          </p>
                        </td>
                        <td className="text-muted">{this.parseDate(row.date)}</td>
                        <td className="text-muted">
                          <Input
                            id="batchSize"
                            type="number"
                            defaultValue={row.size}
                            onChange={this.handleChange.bind(this, index)}
                          />
                        </td>
                        <td className="width-150">
                          <Progress
                            color={row.progress.colorClass}
                            value={row.progress.percent}
                            className="progress-sm mb-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="clearfix">
                <div className="float-right">
                  <Button color="default" className="mr-2" size="sm">
                    Send to...
                  </Button>
                  <UncontrolledButtonDropdown>
                    <DropdownToggle
                      color="inverse"
                      className="mr-xs"
                      size="sm"
                      caret
                    >
                      Clear
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Clear</DropdownItem>
                      <DropdownItem>Move ...</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Separated link</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div>
                <p>Basic table with styled content</p>
              </div>
            </Widget>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <Widget
              title={
                <h5>
                  Configurar <span className="fw-semi-bold">Paises</span>
                </h5>
              }
              settings
              close
            >
              <div className={`widget-table-overflow ${s.overFlow}`}>
                <Table className="table-striped">
                  <thead>
                    <tr>
                      <th>
                        <div className="abc-checkbox">
                          <Input
                            id="checkbox1"
                            type="checkbox"
                            checked={this.state.checkbox1}
                            onChange={(event) =>
                              this.checkAll(event, "checkbox1")
                            }
                          />
                          <Label for="checkbox1" />
                        </div>
                      </th>
                      <th>CURRENCY</th>
                      <th>COUNTRY</th>
                      <th>ACCOUNT TYPE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.countries.map((country, index) => (
                      <tr key={index}>
                        <td>
                          <div className="abc-checkbox">
                            <Input
                              id={`${index}"countryOpt"`}
                              type="checkbox"
                              checked={this.state.countries[index][3]}
                              onChange={this.checkCountry.bind(this, index)}
                            />
                            <Label for={`${index}"countryOpt"`} />
                          </div>
                        </td>
                        <td>{country[0]}</td>
                        <td>{country[1]}</td>
                        <td>
                          <Badge color={`{${country[2] ? "sucess" : "danger"}}`}>{country[2]}</Badge>
                        </td></tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
  handleChange(i, event) {
    let values = [...this.state.tableStyles];
    values[i].size = event.target.value;
    this.setState({ tableStyles: values });
  }
  toggle(jobDetail, index) {
    toast.success(
      "Generando lote!",
      this.state.options
    );
    let paymentsUpdated = this.state.tableStyles;
    paymentsUpdated[index].date = new Date();
    const pymt = {
      bpyBacAccountNumber: "9781003",
      bpyBacSwiftCode: "ITAUBRSP",
      bpyPlisId: "46",
      bpyBacBankAddress: "Agence Saclay Tech Point. 19",
      bpyBacBankName: "BNP Paribas",
      bpyBacCountryIsoCode: "USA",
      bpyBacCurrencyIsoCode: "USD",
      bpyCurrencyQty: "USD",
      bpyCurrencyQty2: "USD",
      bpyOrderQty1: "",
      bpyOrderQty2: "",
      bpyPadAddressLine: "Agence Saclay Tech Point. 19",
      bpyPadPostalCode: "EC1N",
      bpyPadCity: "London",
      bpyPadState: "London",
      bpyPaymentReference: "IDRojasACOLFUTURO",
      bpyPrnEmail: "anilejo@hotmail.com",
      bpyPrnFullname: "CAN2Anibal Alejandro R45",
      bpyPrnMobileNumber: "7896541230",
      ctdPersonTypeId: "1",
      bpyRcptClientReferenceId: "15058",
      bpyRoutingCodeValue: "200415",
      bpyRoutingCodeType: "Transit",
      bpySide: "1",
      bpyTransactionPurpose: "OTHERS"
    };
    const availableCountry = this.state.countries.filter(c => c[3]);
    const pymts = Array.from({ length: jobDetail.size }, (i) => {
    // const pymts = desembolsos.map((i) => {
      const generado = Math.floor(Math.random() * 713) + 10000;
      const iPaisGenerado = Math.floor(Math.random() * availableCountry.length);
      const bpyOrderQty1 = index == 1 ? undefined : (Math.floor(Math.random() * 10) + 5) * (index == 4 ? Math.floor(Math.random()) : 1);
      const bpyOrderQty2 = index == 0 ? undefined : (Math.floor(Math.random() * 10) + 5) * (index == 4 ? Math.floor(Math.random()) : 1);
      const bpyCurrencyQty = pymt.bpyCurrencyQty;
      const bpyCurrencyQty2 = index == 3 || ((index == 4 ? 1 : 0) * (Math.floor(Math.random()))) ? 'USD' : availableCountry[iPaisGenerado][1];

      const pymtsi = desembolsos[Math.floor(Math.random() * 5000)];
      const rPayment = {
        ...pymtsi,
        // bpyBacAccountNumber: '9781003' + Math.floor(Math.random() * 9),
        bpyBacAccountNumber: availableCountry[iPaisGenerado][1] !== "GBR" ? pymtsi.bpyBacAccountNumber.split(pymtsi.bpyBacSwiftCode)[1] : pymtsi.bpyBacAccountNumber,
        bpyBacSwiftCode: `${availableCountry[iPaisGenerado][1]}${bpyCurrencyQty}${generado}${bpyCurrencyQty2}`,
        bpyPlisId: generado,
        bpyPrnFullname: `CTD${bpyCurrencyQty} ${generado}${bpyCurrencyQty2}CLIENT`,
        bpyPaymentReference: `CTD${bpyCurrencyQty} ${generado}${bpyCurrencyQty2}CLIENT`,
        bpyPadCity: `${bpyCurrencyQty}${generado}${bpyCurrencyQty2}`,
        bpyPadState: `${bpyCurrencyQty}${generado}${bpyCurrencyQty2}`,
        bpyBacCountryIsoCode: availableCountry[iPaisGenerado][1],
        bpyRoutingCodeType: mapper.filter(m => Object.keys(m)[0] === availableCountry[iPaisGenerado][0]).map(m => m[Object.keys(m)[0]])[0],
        // bpyRoutingCodeValue: ,
        bpyBacCurrencyIsoCode: availableCountry[iPaisGenerado][1],
        bpyOrderQty1: bpyOrderQty1,
        bpyOrderQty2: bpyOrderQty2,
        bpyCurrencyQty2: bpyCurrencyQty2,
      };
      return rPayment;
    });

    // const requestAuth = {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: {
    //     "Content-Type": "text/plain",
    //     'Content-Type': 'aplication/json',
    //     'Accept': '*/*',
    //     'Accept-Encoding': 'gzip, deflate, br',
    //     'Connection': 'keep-alive',
    //     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //     'Access-Control-Allow-Methods': 'POST',
    //     'Response-Type': 'json',
    //     'Cache-Control': 'no-cache'
    //   },
    //   body: "grant_type=client_credentials&client_id=l764e7b61d3bc547018a00812e17c2d42e&client_secret=c4afc978965d4c3b8382c924f290e15c&scope=internal"
    // };
    // debugger

    // fetch("https://uatapi.currenciesdirect.com/auth/oauth/v2/token", requestAuth).then((token) => token.json()).then(token => {

    //   const requestRcpt = {
    //     method: 'POST',
    //     mode: 'no-cors',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': "Bearer " + token.access_token
    //     },
    //   };
    //   fetch("https://uatapi.currenciesdirect.com/v1/customers/0201000002982640/recipients?page=1&limit=100", requestRcpt).then(response => response.json()).then((response) => {
    //     console.dir(response);
    //   });
    // });
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "bchPlisId": '21' + new Date().getDate() + '' + new Date().getMonth(),
        "bpyCountPayments": "1094",
        "bpyUsrCreation": "LFUM",
        "bpyUsrModification": "LFUM",
        "bpyUsdValue": "107.72",
        "bpyBatchPayments": [...pymts]
      })
    };

    toast.success(
      "Enviando lote!",
      this.state.options
    );

    fetch("http://localhost:8090/batch/process", requestOptions).then((response) => {
      toast.success(
        "Confirmando lote!",
        this.state.options
      );
      paymentsUpdated[index].info.total = response.status != 200 ? Number.NaN : response.bpyUsdValue;
      paymentsUpdated[index].progress.colorClass = response.status != 200 ? 'danger' : 'success';
      this.setState({
        ...this.state,
        tableStyles: paymentsUpdated
      })
      return response.json();
    }).then((response) => { }
    );
  }
}

export default Static;

export const mapper = [{ 'USA': 'ABA' },
{ 'COL': 'BRANCH' },
{ 'ALB': 'BRANCH' },
{ 'DEU': 'BRANCH' },
{ 'AGO': 'BRANCH' },
{ 'HO1': 'BRANCH' },
{ 'SAU': 'BRANCH' },
{ 'ARG': 'BRANCH' },
{ 'ARM': 'BRANCH' },
{ 'AUS': 'BSB' },
{ 'AUT': 'BRANCH' },
{ 'BAR': 'BRANCH' },
{ 'BEL': 'BRANCH' },
{ 'BLR': 'BRANCH' },
{ 'BOL': 'BRANCH' },
{ 'BIH': 'BRANCH' },
{ 'BOY': 'BRANCH' },
{ 'BRA': 'BRANCH' },
{ 'BRN': 'BRANCH' },
{ 'BUC': 'BRANCH' },
{ 'CPV': 'BRANCH' },
{ 'KHM': 'BRANCH' },
{ 'CAN': 'Transit' },
{ 'CAC': 'BRANCH' },
{ 'CHL': 'BRANCH' },
{ 'CHN': 'CNAPS' },
{ 'CAD': 'BRANCH' },
{ 'COO': 'BRANCH' },
{ 'COG': 'BRANCH' },
{ 'CRI': 'BRANCH' },
{ 'CUB': 'BRANCH' },
{ 'DFM': 'BRANCH' },
{ 'DNK': 'BRANCH' },
{ 'ECU': 'BRANCH' },
{ 'EGY': 'BRANCH' },
{ 'SLV': 'BRANCH' },
{ 'ARE': 'BRANCH' }];