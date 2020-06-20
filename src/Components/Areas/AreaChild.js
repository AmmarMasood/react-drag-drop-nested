import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./AreaParent.css";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import ItemChild from "../Items/ItemsChild";

function AreaChild({
  area,
  items,
  createItem,
  index,
  changeAreaTitle,
  onAreaRemove,
  handleChangeColor,
  onItemFieldEdit,
  setDisabledFields,
  onActiveDataSelect
}) {
  const getListStyle = (isDraggingOver, area) => ({
    background: isDraggingOver ? "lightblue" : "white",
    display: "grid",
    gridTemplateColumns: `repeat(${area.y}, 1fr)`,
    gridAutoRows: `repeat(${area.x}, 1fr)`,
    gridGap: "5px",
    height: "100%",
    width: "100%",
    padding: "10px"
  });

  return (
    <Draggable draggableId={area.areaId} index={index}>
      {provided => (
        <div
          className="area-child-main"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Card
            style={{ padding: "0 !important" }}
            size="large"
            key
            title={
              <div
                {...provided.dragHandleProps}
                style={{
                  border: "1px solid #c1c1c1",
                  padding: "2px",
                  width: "100%",
                  cursor: "grab"
                }}
              >
                <Input
                  style={{ width: "50%" }}
                  value={area.areaTitle}
                  onChange={e => changeAreaTitle(e, area.areaId)}
                />
              </div>
            }
            extra={
              <Button
                type="primary"
                shape="circle"
                icon={<CloseOutlined />}
                size={"small"}
                onClick={() => onAreaRemove(area.areaId)}
              />
            }
            style={{
              width: `${area.y * 280}px`,
              margin: "5px"
              // minHeight: 400,
            }}
          >
            <div className="showItems">
              <Button
                type="primary"
                shape="square"
                icon={<PlusOutlined />}
                size={"small"}
                disabled={area.itemIds.length === area.x * area.y}
                onClick={() => createItem(area.areaId)}
              />

              <Droppable droppableId={area.areaId} type="items">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver, area)}
                    {...provided.droppableProps}
                  >
                    {items.map((item, index) => (
                      <ItemChild
                        key={item.itemId}
                        item={item}
                        createItem={createItem}
                        index={index}
                        handleChangeColor={handleChangeColor}
                        onItemFieldEdit={onItemFieldEdit}
                        setDisabledFields={setDisabledFields}
                        onActiveDataSelect={onActiveDataSelect}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
}

export default AreaChild;
