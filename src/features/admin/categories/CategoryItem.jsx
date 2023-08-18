import { useEffect, useState } from "react";

const { Row, Col, Button } = require("react-bootstrap");

const CategoryItem = function ({
  category,
  handleEdit,
  handleSave,
  handleDelete
}) {
  const [newName, setNewName] = useState(category ? category.id : "");
  const onSave = () => {
    handleSave({
      id: category.id,
      name: newName,
    });
  };

  const onEdit = () => {
    setNewName(category.name);
    handleEdit(category.id);
  };

  return (
    <Row className="categoryItem">
      <Row className="title">
        <Col className="categoryId">
          <div>id</div>
        </Col>
        <Col className="categoryName">
          <div className="title">Name:</div>
        </Col>
        <Col></Col>
      </Row>
      <Row className="value">
        <Col className="categoryId">
          <div className="value">{category.id}</div>
        </Col>
        <Col className="categoryName">
          {category.status === CategoryItemStatus.edit ? (
            <input
              className="categoryNameInput"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            ></input>
          ) : (
            <div className="value">{category.name}</div>
          )}
        </Col>
        <Col className="editContainer">
          <Row className="buttonContainer">
            <div className="m-1 buttonWrapper">
              {category.status === CategoryItemStatus.edit ? (
                <Button onClick={(e) => onSave()}>Save</Button>
              ) : (
                <Button
                  disabled={category.status === CategoryItemStatus.inProgress}
                  onClick={(e) => onEdit(category.id)}
                >
                  Edit
                </Button>
              )}
            </div>
            <div className="m-1 buttonWrapper">
              <Button onClick={() => handleDelete(category.id)}>Delete</Button>
            </div>
          </Row>
          <Row className="errorMessageContainer">
            <p className="messageWrapper">
              {category.error && "*" + category.error}
            </p>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

const CategoryItemStatus = {
  read: "READ",
  edit: "EDIT",
  inProgress: "INPROGRESS",
};

export { CategoryItem, CategoryItemStatus };
