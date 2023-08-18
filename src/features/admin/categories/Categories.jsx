import httpClientWrapper from "components/Common/HttpClientWrapper";
import { CategoryItem, CategoryItemStatus } from "./CategoryItem";
import { useEffect, useState } from "react";
import { useFetchData } from "app/hooks/dataFetchingHooks";
const { Container, Row, Button} = require("react-bootstrap");

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

  const save = function (category) {
    setStatus(category.id, CategoryItemStatus.inProgress);
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

  const onDelete = function (id) {
    const paramMap = new Map();
    paramMap.set("ids", [id]);
    httpClientWrapper.delete(
      "category",
      function (response) {
        if (response.successful) {
          setCategories(categories => categories.filter((item) => item.id !== id));
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
    categories.add({id: undefined, name: "", status: CategoryItemStatus.edit});
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
    <Container>
      <h1>Kategori sayfasi</h1>
      <Row>
        <Button onClick={()=> addNewCategory()}> Yeni Kategori</Button>
      </Row>
      {categoryList}
    </Container>
  );
};

export { Categories };
