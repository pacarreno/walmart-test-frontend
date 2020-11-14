import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';

import { useState } from 'react';

import { message, Layout, Input, Row, Col } from 'antd';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function App() {

  const [items, setItems] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [searchValue, setSearchValue] = useState();

  let baseURL = 'https://guarded-refuge-29710.herokuapp.com/';

  const onSearch = (value) => {

    if( !value ) {
      setSearchValue("");
      setItems([]);
      setTotalElements(0);
      return;
    }

    if( value.length < 3 ){
      message.config({
        top: 120
      });
      message.error('Debe buscar por más de 3 carácteres');
      return;
    }

    setSearchValue(value);

    fetch(baseURL + 'products?searchValue=' + value)
      .then(response => response.json())
      .then(({ content, totalElements }) => {
        console.log(content);
        console.log(totalElements);
        if(totalElements === 0 ){
          message.warn("No se encontraron elementos, intenta buscar con otro término")
        }
        setItems(content);
        setTotalElements(totalElements);
      });
  }

  const onChange = page => {

    fetch(baseURL+'/products?searchValue=' + searchValue + '&page=' + (page - 1))
      .then(response => response.json())
      .then(({ content, totalElements }) => {
        console.log(content);
        console.log(totalElements);
        setItems(content);
        setTotalElements(totalElements);
      });

  };

  return (
    <Layout className="layout">
      <Header style={{ zIndex: 1, width: '100%', backgroundColor: '#0071ce' }} >
        <Row>
          <Col xs={16} sm={16} md={6} lg={8} xl={10} >
            <img alt="logo walmart" className="logo" src={'./logo.svg'} />
          </Col>
          <Col xs={24} sm={16} md={14} lg={14} xl={14} >
            <Search placeholder="¿Qué estás buscando?" onSearch={value => onSearch(value)} enterButton size="large" style={{width:'100%',paddingTop:'12px'}} />
          </Col>
        </Row>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 70 }}>
        <Switch>
          <Route path="/">
            <Home items={items} totalElements={totalElements} onChange={onChange} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ver Información Legal</Footer>
    </Layout>
  );
}

export default App;
