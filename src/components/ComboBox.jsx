import { Dropdown } from "react-bootstrap";
import httpClientWrapper from "components/Common/HttpClientWrapper";
import { useState } from "react";

const ComboBox = function ({ value, onChange, url, defaultItems=[]}) {
  const [items, setItems] = useState(defaultItems);
  const [loading, setLoading] = useState(false);

  const fetchData = function () {
    if (items.length > 0) return;

    setLoading(true);
    httpClientWrapper.get(
      url,
      function (response) {
        setItems(response);
        setLoading(false);
      },
      function (error) {
        setLoading(false);
      }
    );
  };

  const handleItemClick = function (id) {
    onChange(items.find(item => item.id === (isNaN(id) ? id : parseInt(id))));
  };

  const loadingItem = (
    <Dropdown.Item >Loading...</Dropdown.Item>
  );
  const itemList = loading
    ? loadingItem
    : items.map((item) => {
        return (
          <Dropdown.Item id={item.id} key={item.id} onClick={(e) =>{
            e.preventDefault();
            handleItemClick(e.target.id);
          }}>
            {item.name}
          </Dropdown.Item>
        );
      });

  console.log("items:: {}", JSON.stringify(items));
  return (
    <Dropdown onClick={() => fetchData()}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {value}
      </Dropdown.Toggle>

      <Dropdown.Menu>{itemList}</Dropdown.Menu>
    </Dropdown>
  );
};

export { ComboBox };
