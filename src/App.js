import React, {useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MainTable from "./components/MainTable";
import Modal from "./components/Modal";
import Info from "./components/Info";
import WeekPicker from "./components/WeekPicker";
import Logo from "./img/logo.png";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Компонента основной страницы
function App() {
  // Данные выбранной ячейки в таблице
  const [id, setID] = useState(null);

  return (
    <div className="App">
      <Container>
        <div className="logo mb-6 d-flex">
          <div className="logoImage me-6">
            <img src={Logo} alt="logo" />
          </div>
          <h4 className="d-flex align-items-center">Бронирование бассейна УрФУ</h4>
        </div>
        <Row className="mt-2">
          <Col md={6}>

            <h5 className="mainInfo">
            6 tracks 25 meters long are waiting for everyone. In addition to students,
             anyone can study here in the early morning and evening hours, as well as on 
             weekends using a subscription system. Among the advantages and features of the pool:
              double cleaning, ozonation and chlorination, 
              an automated monitoring system that displays all the necessary data,
               such as water and air temperature. During the day, the water in the pool is updated 2.5 times.
            </h5>
          </Col>
          <Col className="text-center" md={5}>
            {/*<h5>Выбрать неделю</h5>*/}
            <WeekPicker/>
          </Col>
        </Row>
        <div>
          <MainTable setID={setID}/>
          <Modal
            show={id}
            onHide={() => {
              setID(null);
            }}
            data={id}
          />
        </div>
        <Info />
      </Container>
      {/* Менеджер уведомлений сбоку */}
      <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
      />
    </div>
  );
}

export default App;
