const filterItems = {
    all: {"title": "Hepsi", defaultValue: true},
    raw: {"title": "Islenmemis Findik", defaultValue: false, name:"category", value:"raw", operation: "EQUAL"},
    processed: {"title": "Islenmis Findik", defaultValue: false, name:"category", value:"processed", operation: "EQUAL"},
  };

  const orderItems = {
    id: {"title": "Yeni eklenen", value: "DESC,Id"},
    priceAsc: {"title": "Fiyata Gore Artan", value: "ASC,price"},
    priceDesc: {"title": "Fiyata Gore Azalan", value: "DESC,price"}
  };

export {filterItems, orderItems};