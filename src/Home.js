import React from 'react';
import { Card, Image, List,Tag ,Row,Col } from 'antd';

function Home({ items, totalElements, onChange }) {

    return (

        <List

            id="list-items"
            grid={{
                gutter: 12,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 8 ,
            }}
            locale={ {emptyText: "No se encontraron datos, busca otro término"} }
            pagination = {{ position : "both" , pageSize : "20" , total : totalElements, onChange: onChange, showSizeChanger:false }}

            dataSource={items}
            renderItem={item => (
                <List.Item>
                    <Card
                        key={item.id}
                        hoverable
                        cover={<Image alt="img-producto2" src={"http://" + item.image} style={{ backgroundColor: "white" }} />}>
                        <Row>
                            <Col>
                                <span class="brand"> {item.brand} </span> <span class="description"> {item.description} </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span class="price"> ${new Intl.NumberFormat('es-CL').format(item.price)} </span>{ item.palindrome ? <Tag  color="#f50" >50%</Tag> : "" }
                            </Col>
                        </Row>
                        {
                            item.palindrome ? <Row><Col><span class="price-discount">${new Intl.NumberFormat('es-CL').format(item.orginalPrice)} </span></Col></Row> : ""
                        }
                    </Card>
                </List.Item>
            )}
        />
    );

}

export default Home;