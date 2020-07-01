import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Popover,
  Button,
  Modal,
  Switch,
  Collapse,
  List,
  Typography,
  notification,
  Divider
} from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TwitterPicker } from "react-color";
import "./Items.css";
import axios from "axios";
import { server } from "../../Utils/Server";

function ItemsChild({
  item,
  index,
  handleChangeColor,
  // onItemFieldEdit,
  setDisabledFields,
  onActiveDataSelect,
  onRemoveItem,
  areaId
}) {
  const [activeData, setActiveData] = useState([]);

  const onCheckChange = (itemId, check) => {
    // console.log(!check);
    setDisabledFields(itemId, !check);
  };
  // notification for successfully selected serial
  const openNotificationWithIconSuccess = type => {
    notification[type]({
      message: "Success.",
      description: `Serial added`
    });
  };
  // notification for failed selected serial
  const openNotificationWithIconFailure = (type, err) => {
    notification[type]({
      message: "Error.",
      description: `${err}`
    });
  };

  // notification for failure in in getting active-diplayed data from backend
  const openNotificationWithAciveFailure = (type, err) => {
    notification[type]({
      message: "Error while loading actively-displayed data from server.",
      description: `${err}`
    });
  };

  // backend script for selection of serial from list
  // const onSerialSelect = (item, i) => {
  //   axios
  //     .post(`${server}/serial/item?itemId=${item.itemId}&serial=${i}`)
  //     .then(res => openNotificationWithIconSuccess("success"))
  //     .catch(err => openNotificationWithIconFailure("error", err));
  // };

  //backend script to load the actively-displayed list data
  // useEffect(() => {
  //   axios
  //     .get(`${server}/actively-displayed-data`)
  //     .then(res => setActiveData(res.data))
  //     .catch(err => openNotificationWithAciveFailure("error", err));
  // }, []);

  // content in options
  const content = item => (
    <div style={{ textAlign: "right" }}>
      <div style={{ margin: "10px" }}>
        <Button
          type="primary"
          danger
          onClick={() => onRemoveItem(item.itemId, areaId, item.itemTitle)}
        >
          Remove
        </Button>
      </div>
      <TwitterPicker
        onChange={(color, e) => handleChangeColor(color, e, item.itemId)}
      />
      <br />
      <Collapse accordion>
        <Collapse.Panel header="Serial Addition" key="1">
          <div className="list-panel">
            <List
              size="small"
              bordered
              dataSource={item.serial}
              renderItem={i => (
                <List.Item
                  className="list-item-style"
                  // onClick={() => onSerialSelect(item, i)}
                >
                  {i}
                </List.Item>
              )}
            />
          </div>
        </Collapse.Panel>
        <Collapse.Panel header="Actively Displayed" key="2">
          <div className="list-panel">
            <List
              size="small"
              bordered
              dataSource={activeData}
              renderItem={i => (
                <List.Item
                  onClick={() => onActiveDataSelect(item.itemId, i)}
                  className="list-item-style"
                >
                  {i.join(", ")}
                </List.Item>
              )}
            />
          </div>
        </Collapse.Panel>
      </Collapse>

      <br />
      <Switch
        checkedChildren="Disable Fields"
        unCheckedChildren="Enable Fields"
        onChange={() => onCheckChange(item.itemId, item.disableField)}
        checked={item.disableField}
      />
      {/* <p>Content</p> */}
    </div>
  );
  return (
    <>
      <Draggable draggableId={item.itemId} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Card
              style={{ backgroundColor: `${item.bgColor}` }}
              extra={
                <div>
                  <Popover
                    content={() => content(item)}
                    trigger="click"
                    placement="right"
                  >
                    <Button>Options</Button>
                  </Popover>
                </div>
              }
              title={
                <div style={{ fontSize: "20px" }}>{`${item.itemTitle}`}</div>
              }
            >
              <div>
                {/* <ChromePicker /> */}
                <Input
                  style={{ margin: "2px" }}
                  size="small"
                  placeholder="small size"
                  value={item.fields[0]}
                  disabled={!item.disableField}
                />
                <Input
                  style={{ margin: "2px" }}
                  size="small"
                  placeholder="small size"
                  value={item.fields[1]}
                  disabled={!item.disableField}
                />
                <Input
                  style={{ margin: "2px" }}
                  size="small"
                  placeholder="small size"
                  value={item.fields[2]}
                  disabled={!item.disableField}
                />
                <Input
                  style={{ margin: "2px" }}
                  size="small"
                  placeholder="small size"
                  value={item.fields[3]}
                  disabled={!item.disableField}
                />
              </div>
            </Card>
          </div>
        )}
      </Draggable>
    </>
  );
}

export default ItemsChild;
