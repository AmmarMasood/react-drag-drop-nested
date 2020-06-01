import React, { useState } from "react";
import "./Items.css";
import { Button, Radio } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ItemsChild from "./ItemsChild";

function ItemsParent({ roomId, areaId }) {
  const [items, setItems] = useState([
    {
      itemTitle: 0,
      roomId: roomId,
      areaId: areaId,
      itemId: `item-${Date.now() + Math.random()}`,
      fields: ["field 1", "field 2", "field 3", "field 4"],
      disableField: false
    }
  ]);

  const addItem = () => {
    var newId = Date.now() + Math.random();
    var itemTitle = 0;
    if (items.length > 0) {
      var n = items[items.length - 1].itemId.replace(/[^0-9]/g, "");
      newId = parseInt(n, 10) + Date.now() + Math.random();
      itemTitle =
        Math.max.apply(
          Math,
          items.map(function(o) {
            return o.itemTitle;
          })
        ) + 1;
    }
    const object = {
      itemTitle,
      roomId,
      areaId,
      itemId: `item-${newId}`,
      fields: ["field 1", "field 2", "field 3", "field 4"]
    };

    setItems([...items, object]);
    console.log(items);
  };

  return (
    <div className="items-main">
      <div className="items-main--btn">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="small"
          onClick={addItem}
        />
      </div>
      <div className="items-main--list">
        <ItemsChild items={items} setItems={setItems} />
      </div>
    </div>
  );
}
export default ItemsParent;
