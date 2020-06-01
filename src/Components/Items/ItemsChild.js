import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Input } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TwitterPicker } from "react-color";
import { Popover, Button, Modal } from "antd";
import { Switch } from "antd";

function ItemsChild({
  item,
  key,
  index,
  handleChangeColor,
  onItemFieldEdit,
  setDisabledFields
}) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [fields, setFields] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const showModal = (itemFields, itemId) => {
    setCurrentId(itemId);
    setFields(itemFields);
    setOpenModal(true);
  };

  const handleOk = () => {
    onItemFieldEdit(fields, currentId);
    setFields([]);
    setCurrentId("");
    setOpenModal(false);
  };

  const handleCancel = () => {
    setFields([]);
    setOpenModal(false);
  };

  const onFieldItemHandle = (value, index) => {
    var newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  const onCheckChange = (itemId, check) => {
    console.log(!check);
    setDisabledFields(itemId, !check);
  };

  const content = item => (
    <div style={{ textAlign: "right" }}>
      <TwitterPicker
        onChange={(color, e) => handleChangeColor(color, e, item.itemId)}
      />
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
      <Modal
        title="Edit Fields"
        visible={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          {/* <ChromePicker /> */}
          <Input
            style={{ margin: "2px" }}
            size="medium"
            value={fields[0]}
            onChange={e => onFieldItemHandle(e.target.value, 0)}
          />
          <Input
            style={{ margin: "2px" }}
            size="medium"
            value={fields[1]}
            onChange={e => onFieldItemHandle(e.target.value, 1)}
          />
          <Input
            style={{ margin: "2px" }}
            size="medium"
            value={fields[2]}
            onChange={e => onFieldItemHandle(e.target.value, 2)}
          />
          <Input
            style={{ margin: "2px" }}
            size="medium"
            value={fields[3]}
            onChange={e => onFieldItemHandle(e.target.value, 3)}
          />
        </div>
      </Modal>
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
                  <Popover content={() => content(item)} trigger="click">
                    <Button>Options</Button>
                  </Popover>
                </div>
              }
              title={`${item.itemTitle}`}
            >
              <div>
                {/* <ChromePicker /> */}
                <Input
                  style={{ margin: "2px" }}
                  size="small"
                  placeholder="small size"
                  value={item.fields[0]}
                  disabled={!item.disableField}
                  onChange={() => showModal(item.fields, item.itemId)}
                />
                <Input
                  style={{ margin: "2px" }}
                  size="small"
                  placeholder="small size"
                  value={item.fields[1]}
                  disabled={!item.disableField}
                  onChange={() => showModal(item.fields, item.itemId)}
                />
                <Input
                  style={{ margin: "2px" }}
                  size="small"
                  placeholder="small size"
                  value={item.fields[2]}
                  disabled={!item.disableField}
                  onChange={() => showModal(item.fields, item.itemId)}
                />
                <Input
                  style={{ margin: "2px" }}
                  size="small"
                  placeholder="small size"
                  value={item.fields[3]}
                  disabled={!item.disableField}
                  onChange={() => showModal(item.fields, item.itemId)}
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
