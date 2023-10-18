import httpClientWrapper from "components/Common/HttpClientWrapper";
import { CategoryItem, CategoryItemStatus } from "./CategoryItem";
import { useEffect, useState } from "react";
const { Container, Row, Button } = require("react-bootstrap");

const Categories = function () {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    httpClientWrapper.get(
      "/category",
      function (response) {
        setCategories(
          response.map((item) => {
            return { ...item, status: CategoryItemStatus.read, error: "" };
          })
        );
      },
      function (error) {
        console.error("could not fetch error. {}", error);
      }
    );
  }, []);

  const update = function (category) {
    httpClientWrapper.put(
      "/category",
      category,
      function (response) {
        let updatedValue = response.updatedValue;

        setCategories((categories) => {
          return categories.map((ctgry) => {
            if (ctgry.id === updatedValue.id) {
              return { ...updatedValue, status: CategoryItemStatus.read };
            }
            return ctgry;
          });
        });
      },
      function (error) {
        console.log("Cateogry update response error: " + error);
        setStatus(category.id, CategoryItemStatus.read);
      }
    );
  };

  const create = function (category) {
    const previousId = category.id;
    category.id = undefined;
    httpClientWrapper.post(
      "/category",
      category,
      function (response) {
        let updatedValue = response.updatedValue;

        setCategories((categories) => {
          return categories.map((ctgry) => {
            if (ctgry.id === previousId) {
              return { ...updatedValue, status: CategoryItemStatus.read };
            }
            return ctgry;
          });
        });
      },
      function (error) {
        console.log("Cateogry update response error: " + error);
        setStatus(category.id, CategoryItemStatus.read);
      }
    );
  };

  const save = function (category) {
    const willBeSentCategory = {
      id: category.id,
      name: category.name,
    };
    if (category.status === CategoryItemStatus.new) {
      setStatus(category.id, CategoryItemStatus.inProgress);
      create(willBeSentCategory);
    } else {
      setStatus(category.id, CategoryItemStatus.inProgress);
      update(willBeSentCategory);
    }
  };

  const onDelete = function (id) {
    const paramMap = new Map();
    paramMap.set("ids", [id]);
    httpClientWrapper.delete(
      "category",
      function (response) {
        if (response.successful) {
          setCategories((categories) =>
            categories.filter((item) => item.id !== id)
          );
        } else {
          const errorMessage =
            response.generalError || response.couldNotDeleteResults[id];
          setCategories(
            categories.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  status: CategoryItemStatus.read,
                  error: errorMessage,
                };
              } else {
                return item;
              }
            })
          );
        }
      },
      function (error) {
        console.log("Category onDelete, response: " + JSON.stringify(error));
      },
      paramMap
    );
  };

  const setStatus = function (id, status) {
    setCategories((categories) => {
      return categories.map((ctgry) => {
        if (ctgry.id === id) {
          return { ...ctgry, status: status };
        }
        return ctgry;
      });
    });
  };

  const onEdit = (id) => {
    setStatus(id, CategoryItemStatus.edit);
  };

  const addNewCategory = () => {
    const newTimestampKey = Date.now().toString() + Math.random().toString();
    setCategories((categories) => [
      { id: newTimestampKey, name: "", status: CategoryItemStatus.new },
      ...categories,
    ]);
  };

  const categoryList = categories.map((category) => (
    <CategoryItem
      key={category.id}
      category={category}
      handleEdit={onEdit}
      handleSave={save}
      handleDelete={onDelete}
    ></CategoryItem>
  ));
  return (
    <Container className="categoryContainer">
      <h1>Kategori sayfasi</h1>
      <Row className="actionContainer">
        <Button className="newCategory" onClick={() => addNewCategory()}>
          {" "}
          Yeni Kategori
        </Button>
      </Row>
      {categoryList}
    </Container>
  );
};

export { Categories };
