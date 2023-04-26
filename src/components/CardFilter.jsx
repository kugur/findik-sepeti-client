const { Dropdown } = require("react-bootstrap");

export default function CardFilter({items, selectedValue, onSelect}) {

  return (
      <Dropdown onSelect={onSelect} className="customCardFilter">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {items[selectedValue].title}
        </Dropdown.Toggle>

        <Dropdown.Menu className="customCardFilterDropDown">
          {Object.keys(items).map((attr) => (
            <Dropdown.Item eventKey={attr} active={selectedValue === attr}>
              {items[attr].title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
  );
}
