import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./AreaParent.css";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import ItemChild from "../Items/ItemsChild";

function AreaChild({
  area,
  key,
  items,
  createItem,
  index,
  changeAreaTitle,
  onAreaRemove,
  handleChangeColor,
  onItemFieldEdit,
  setDisabledFields
}) {
  // a little function to help us with reordering the result

  // const getAreas = () => (
  //   <Card
  //     size="large"
  //     key
  //     title={
  //       <div
  //         style={{
  //           border: "2px solid red",
  //           width: "100%",
  //           cursor: "grab"
  //         }}
  //       >
  //         <Input
  //           style={{ width: "50%" }}
  //           value={area.areaTitle}
  //           // onChange={e => changeTitle(e, p.areaId)}
  //         />
  //       </div>
  //     }
  //     extra={
  //       <Button
  //         type="primary"
  //         shape="circle"
  //         icon={<CloseOutlined />}
  //         size={"small"}
  //       />
  //     }
  //     style={{
  //       width: 500,
  //       margin: "5px",
  //       minHeight: 400
  //     }}
  //   >
  //     <div className="showItems">
  //       <Button
  //         type="primary"
  //         shape="square"
  //         icon={<PlusOutlined />}
  //         size={"small"}
  //         onClick={() => createItem(area.areaId)}
  //       />
  //       <Droppable droppableId={area.areaId}>
  //         {provided => (
  //           <div
  //             className="child-list"
  //             innerRef={provided.innerRef}
  //             {...provided.droppableProps}
  //           >
  //             {items.map((item, index) => (
  //               <ItemChild
  //                 key={item.itemId}
  //                 item={item}
  //                 createItem={createItem}
  //                 index={index}
  //               />
  //             ))}
  //             {provided.placeholder}
  //           </div>
  //         )}
  //       </Droppable>
  //     </div>
  //   </Card>
  // );
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "white"
    // display: "flex",
    // padding: 0,
    // width: "100%",
    // overflow: "scroll"
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
                  border: "2px solid red",
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
              width: 500,
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
                onClick={() => createItem(area.areaId)}
              />
              <Droppable
                droppableId={area.areaId}
                // direction="horizontal"
                type="items"
              >
                {(provided, snapshot) => (
                  <div
                    className="child-list"
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
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
