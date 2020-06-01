import React, { useState, useContext } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./AreaParent.css";
import AreaChild from "./AreaChild";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ItemsParent from "../Items/ItemsParent";
import Column from "rc-table/lib/sugar/Column";

function AreaParent({ roomId }) {
  const [areaIdn, setAreaIdn] = useState(`area-${Date.now() + Math.random()}`);
  const [itemIdn, setItemIdn] = useState(`item-${Date.now() + Math.random()}`);
  const [state, setState] = useState({
    areas: {
      [areaIdn]: {
        roomId: roomId,
        areaTitle: "New Area",
        areaId: areaIdn,
        itemIds: [itemIdn]
      }
    },
    items: {
      [itemIdn]: {
        itemTitle: "Item 1",
        roomId: roomId,
        itemId: itemIdn,
        fields: [
          "Data field 1",
          "Data field 2",
          "Data field 3",
          "Data field 4"
        ],
        disableField: true,
        bgColor: "#ffffff"
      }
    },
    areaOrder: [areaIdn],
    itemTitles: [1, 1]
  });

  // const removeArea = id => {
  //   const n = areas.filter(o => o.areaId !== id);
  //   setAreas(n);
  // };

  // const onCreateArea = () => {
  //   var newId = Date.now() + Math.random();
  //   if (areas.length > 0) {
  //     var n = areas[areas.length - 1].areaId.replace(/[^0-9]/g, "");
  //     newId = parseInt(n, 10) + Date.now() + Math.random();
  //   }
  //   const object = {
  //     roomId,
  //     areaTitle: "New Area",
  //     areaId: `area-${newId}`,
  //     items: <ItemsParent roomId areaId />
  //   };

  //   setAreas([...areas, object]);
  //   console.log(areas);
  // };

  // const changeTitle = (e, id) => {
  //   for (var i in areas) {
  //     if (areas[i].areaId == id) {
  //       areas[i].areaTitle = e.target.value; //new value
  //       setAreas([...areas]); //update the value
  //       break;
  //     }
  //   }
  // };

  const setDisabledFields = (itemId, check) => {
    const newState = {
      ...state,
      items: {
        ...state.items,
        [itemId]: {
          ...state.items[itemId],
          disableField: check
        }
      }
    };
    setState(newState);
  };
  const createItem = areaId => {
    const itemId = `item-${Date.now() + Math.random()}`;
    const itemTitle =
      state.itemTitles.length === 0
        ? 1
        : Math.max.apply(Math, state.itemTitles) + 1;
    setState(prevState => ({
      ...prevState,
      areas: {
        ...prevState.areas,
        [areaId]: {
          ...prevState.areas[areaId],
          itemIds: [...prevState.areas[areaId].itemIds, itemId]
        }
      },
      items: {
        ...prevState.items,
        [itemId]: {
          itemTitle: `Item ${itemTitle}`,
          roomId: roomId,
          itemId: itemId,
          fields: [
            "Data field 1",
            "Data field 2",
            "Data field 3",
            "Data field 4"
          ],
          disableField: true,
          bgColor: "#ffffff"
        }
      },

      itemTitles: [...prevState.itemTitles, itemTitle]
    }));
    console.log(state);
    console.log(itemTitle);
  };

  const onItemFieldEdit = (fields, itemId) => {
    const newState = {
      ...state,
      items: {
        ...state.items,
        [itemId]: {
          ...state.items[itemId],
          fields: fields
        }
      }
    };
    setState(newState);

    return;
  };

  const addArea = () => {
    const areaId = `area-${Date.now() + Math.random()}`;
    const itemTitle = state.itemTitles.length
      ? 1
      : Math.max.apply(Math, state.itemTitles) + 1;
    setState(prevState => ({
      ...prevState,
      areas: {
        ...prevState.areas,
        [areaId]: {
          roomId: roomId,
          areaTitle: "New Area",
          areaId: areaId,
          itemIds: []
        }
      },
      areaOrder: [...prevState.areaOrder, areaId]
    }));
    console.log(state);
    console.log(itemTitle);
  };

  // const getCards = () => {
  //   return state.areaOrder.map(areaId => {
  //     const area = state.areas[areaId];
  //     const items = area.itemIds.map(itemId => state.items[itemId]);
  //     // console.log(areaId);
  //     // console.log(state);
  //     return (
  //       <AreaChild
  //         key={areaId}
  //         area={area}
  //         items={items}
  //         createItem={createItem}
  //       />
  //     );
  //   });
  //   // console.log(state);
  // };

  const changeAreaTitle = (e, areaId) => {
    const newState = {
      ...state,
      areas: {
        ...state.areas,
        [areaId]: {
          ...state.areas[areaId],
          areaTitle: e.target.value
        }
      }
    };
    setState(newState);
  };

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // dealing with movement of areas
    if (type === "areas") {
      const newAreaOrder = Array.from(state.areaOrder);
      newAreaOrder.splice(source.index, 1);
      newAreaOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        areaOrder: newAreaOrder
      };
      setState(newState);
      return;
    }

    // dealing with movement of items

    const start = state.areas[source.droppableId];
    const finnsh = state.areas[destination.droppableId];

    if (start === finnsh) {
      console.log(source);
      console.log(destination);
      const newItemIds = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newArea = {
        ...start,
        itemIds: newItemIds
      };
      const newState = {
        ...state,
        areas: {
          ...state.areas,
          [newArea.areaId]: newArea
        }
      };

      setState(newState);
      console.log(state.items);
      return;
    }
    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(source.index, 1);
    const newStart = {
      ...start,
      itemIds: startItemIds
    };
    const finnshItemIds = Array.from(finnsh.itemIds);
    finnshItemIds.splice(destination.index, 0, draggableId);
    const newFinnsh = {
      ...finnsh,
      itemIds: finnshItemIds
    };

    const newState = {
      ...state,
      areas: {
        ...state.areas,
        [newStart.areaId]: newStart,
        [newFinnsh.areaId]: newFinnsh
      }
    };
    setState(newState);
  };

  // this function will be used to get nnumber from array of itemIds
  const getItems = (listOfItemTitlesToRemove, areaId) => {
    var c = [];
    for (var i = 0; i < listOfItemTitlesToRemove.length; i++) {
      // console.log("hello");
      // console.log(state.items[listOfItemTitlesToRemove[i]]);
      c = c.concat(state.items[listOfItemTitlesToRemove[i]]);
    }
    return c;
  };

  const stringOfArrayToNumbers = myArr => {
    var result = [];
    var arr = [];
    myArr.forEach(function(v) {
      arr = v.match(/[-+]?[0-9]*\.?[0-9]+/g);
      result = result.concat(arr);
    });
    const filtered = result.map(function(x) {
      return parseInt(x, 10);
    });
    return filtered;
  };

  const onAreaRemove = areaId => {
    const newAreaOrder = state.areaOrder.filter(e => e !== areaId);
    const listOfItemTitlesToRemove = state.areas[areaId].itemIds;
    var newItems = { ...state.items };
    // remove all the items
    for (var i = 0; i < listOfItemTitlesToRemove.length; i++) {
      delete newItems[listOfItemTitlesToRemove[i]];
    }

    // removes all the item titles
    var c = [];
    for (var i = 0; i < listOfItemTitlesToRemove.length; i++) {
      c = c.concat(state.items[listOfItemTitlesToRemove[i]].itemTitle);
    }
    var newItemTitles = state.itemTitles.filter(
      el => !stringOfArrayToNumbers(c).includes(el)
    );
    // stringOfArrayToNumbers(c);
    console.log(newItemTitles);
    console.log(c);
    // end

    const newState = {
      ...state,
      areaOrder: newAreaOrder,
      items: newItems,
      itemTitles: newItemTitles
    };
    delete newState.areas[areaId];
    setState(newState);
    return;
  };

  const handleChangeColor = (color, e, itemId) => {
    console.log(color, e, itemId);
    const newState = {
      ...state,
      items: {
        ...state.items,
        [itemId]: {
          ...state.items[itemId],
          bgColor: color.hex
        }
      }
    };

    setState(newState);
    return;
  };

  return (
    <div className="area-main">
      <div className="area-main-btn">
        <Button
          style={{ right: 0 }}
          // onClick={onCreateArea}
          type="primary"
          icon={<PlusOutlined />}
          onClick={addArea}
        >
          Add Area
        </Button>
      </div>
      <div className="area-childern">
        <DragDropContext onDragEnd={result => onDragEnd(result)}>
          <Droppable
            droppableId="all-column"
            direction="horizontal"
            type="areas"
          >
            {provided => (
              <div
                className="area-child-main"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {state.areaOrder.map((areaId, index) => {
                  const area = state.areas[areaId];
                  const items = area.itemIds.map(itemId => state.items[itemId]);
                  // console.log(areaId);
                  // console.log(state);
                  return (
                    <AreaChild
                      index={index}
                      key={areaId}
                      area={area}
                      items={items}
                      createItem={createItem}
                      changeAreaTitle={changeAreaTitle}
                      onAreaRemove={onAreaRemove}
                      handleChangeColor={handleChangeColor}
                      onItemFieldEdit={onItemFieldEdit}
                      setDisabledFields={setDisabledFields}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default AreaParent;
