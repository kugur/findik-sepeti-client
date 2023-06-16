import { Row, Button, Container, Col } from 'react-bootstrap';
import { Img } from 'components/Img';

function ProductTemplate({ data, setValue, onSubmit }) {
    return (<Container className="editProduct">
        <Row>{JSON.stringify(data)}</Row>
        <Row className="imageContainer">
            <Col>
                <Row>
                    <Img src={data.imageUrl}></Img>
                </Row>
                <Row>
                    <Button>Upload Image</Button>
                </Row>
            </Col>
            <Col className="detailsContainer">
                <Row>
                    ismi: <input onChange={e => setValue("name", e.target.value)} value={data.name}></input>
                </Row>
                <Row>
                    kategori: <input onChange={e => setValue("category", e.target.value)} value={data.category}></input>
                </Row>
                <Row>
                    ucret: <input onChange={e => setValue("price", e.target.value)} value={data.price}></input>
                </Row>
            </Col>
        </Row>
        <Row>
            aciklama: <textarea onChange={e => setValue("description", e.target.value)} value={data.description}></textarea>
        </Row>
        <Row>
            <Button onClick={e => onSubmit()}>Kaydet</Button>
        </Row>
    </Container>)
}

export { ProductTemplate };