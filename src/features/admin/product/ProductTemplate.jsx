import { Row, Button, Container, Col } from 'react-bootstrap';
import { Img } from 'components/Img';
import { useNavigate } from 'react-router-dom';

function ProductTemplate({ data, setValue, onSubmit, errorMessage }) {
    let imageFile;
    let errorDetails;
    const handleSelectImage = function (event) {
        console.log("handleSelectImage");
        imageFile = event.target.files[0];
        setValue("imageFile", imageFile);
    };
    const navigate = useNavigate();

    if (errorMessage) {
        errorDetails = (
            <Row>
                <label>
                    {errorMessage}
                </label>
            </Row>)
    } else {
        errorDetails = "";
    }

    return (<Container className="editProduct">
        <Row>{JSON.stringify(data)}</Row>
        <Row className="">
            <Col className='imageContainer'>
                <Row className='imageWrapper'>
                    <Img src={data.imageUrl} localSrc={data.imageFile} className={"image"}></Img>
                </Row>
                <Row className='imageSelectWrapper'>
                    <Button className="selectImageButton" onClick={e => {
                        e.preventDefault();
                        const fileInput = document.getElementById('selectImage');
                        fileInput.click();
                    }}>Select file</Button>
                    <input id="selectImage" type="file" onChange={handleSelectImage}></input>
                </Row>
            </Col>
            <Col className="detailsContainer">
                <Row>
                    <label className='label' htmlFor="name">
                        isim:
                    </label>
                    <input id="name" onChange={e => setValue("name", e.target.value)} value={data.name}></input>
                </Row>
                <Row>
                    <label className='label' htmlFor="category">
                        kategori:
                    </label>
                    <input id="category" onChange={e => setValue("category", e.target.value)} value={data.category}></input>
                </Row>
                <Row>
                    <label className='label' htmlFor="price">
                        ucret:
                    </label>
                    <input id="price" type="number" step="0.01" min="0" onChange={e => setValue("price", e.target.value)} value={data.price}></input>
                </Row>
                <Row>
                    <label className='label' htmlFor="description">
                        aciklama:
                    </label> <textarea id="description" onChange={e => setValue("description", e.target.value)} value={data.description}></textarea>
                </Row>
                {errorDetails}
            </Col>
        </Row>

        <Row className="saveButtonContainer">
            <Button className="backButton" onClick={e => navigate("/")}>Geri</Button>
            <Button className="saveButton" onClick={e => onSubmit()}>Kaydet</Button>

        </Row>
    </Container>)
}

export { ProductTemplate };