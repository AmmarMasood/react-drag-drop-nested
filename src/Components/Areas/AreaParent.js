import React, { useState, useEffect } from "react";
import { Button, notification, Modal, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./AreaParent.css";
import AreaChild from "./AreaChild";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { server } from "../../Utils/Server";

function AreaParent({ roomId }) {
  // area dimentsion popover
  const [visible, setVisible] = useState(false);
  // current added area dimensions input
  // stores the temp value of x and y
  const [tempDimension, setTempDimension] = useState({ x: 1, y: 1 });
  // const [areaIdn, setAreaIdn] = useState(`area-${Date.now() + Math.random()}`);
  // const [itemIdn, setItemIdn] = useState(`item-${Date.now() + Math.random()}`);
  const [state, setState] = useState({
    areas: {
      // modal data for testing
      // [areaIdn]: {
      //   roomId: roomId,
      //   areaTitle: "New Area",
      //   areaId: areaIdn,
      //   itemIds: [itemIdn],
      //   x: 1,
      //   y: 1
      // }
    },
    items: {
      // modal data for testing
      // [itemIdn]: {
      //   itemTitle: "Item 1",
      //   roomId: roomId,
      //   itemId: itemIdn,
      //   fields: [
      //     "Data field 1",
      //     "Data field 2",
      //     "Data field 3",
      //     "Data field 4"
      //   ],
      //   disableField: true,
      //   bgColor: "#ffffff"
      // }
    },
    areaOrder: [],
    itemTitles: [0]
  });

  // this function updates the state every 40 seconds(backend script should be uncommented)
  // useEffect(() => {
  //   loadData();
  //   setInterval(loadData, 30000);
  // }, []);

  // const loadData = () => {
  //   axios
  //     .get(`${server}/state/get-state`)
  //     .then(res => setState(res.data))
  //     .catch(err => console.log("error " + err));
  // };

  const openNotificationWithIcon = (type, err) => {
    notification[type]({
      message: "Error while loading the Serials from backend.",
      description: `${err}`
    });
  };

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
    // serials for each item goes here:
    let serial = [];

    // Backend script to populate the serial numbers in item
    // axios
    //   .get(`${server}/item/get-serials`)
    //   .then(res => (serial = res.data))
    //   .catch(err => openNotificationWithIcon("error", err));

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
          bgColor: "#ffffff",
          serial: serial
        }
      },

      itemTitles: [...prevState.itemTitles, itemTitle]
    }));
    // backend script to save the area in backend
    // axios.post(`${server}/add-area`, state)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
  };

  const onRemoveItem = (itemId, areaId, itemTitle) => {
    const itemtitle = itemTitle.replace(/^\D+/g, "");
    const newAreaItemIds = state.areas[areaId].itemIds.filter(
      e => e !== itemId
    );

    const newItemTitles = state.itemTitles.filter(
      e => e !== parseInt(itemtitle)
    );

    const newState = {
      ...state,
      areas: {
        ...state.areas,
        [areaId]: {
          ...state.areas[areaId],
          itemIds: newAreaItemIds
        }
      },
      itemTitles: newItemTitles
    };
    delete newState.items[itemId];
    setState(newState);
    // backend script to save the area in backend
    // axios.post(`${server}/add-area`, state)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
    return;
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
    // backend script to save the area in backend
    // axios.post(`${server}/add-area`, state)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
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
          itemIds: [],
          x: tempDimension.x,
          y: tempDimension.y
        }
      },
      areaOrder: [...prevState.areaOrder, areaId]
    }));
    // backend script to save the area in backend
    // axios.post(`${server}/add-area`, state)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
  };

  // changes the fields in item to active-data selected in ItemsChild
  const onActiveDataSelect = (itemId, d) => {
    const newState = {
      ...state,
      items: {
        ...state.items,
        [itemId]: {
          ...state.items[itemId],
          fields: d
        }
      }
    };
    setState(newState);
    // backend script to save the area in backend
    // axios.post(`${server}/add-area`, state)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
  };

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
    // backend script to save the area in backend
    // axios.post(`${server}/add-area`, state)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
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
      // backend script to save the area in backend
      // axios.post(`${server}/add-area`, state)
      // .then(res => console.log(res))
      // .catch(err => console.log(err))
      return;
    }

    // dealing with movement of items

    const start = state.areas[source.droppableId];
    const finnsh = state.areas[destination.droppableId];

    if (start === finnsh) {
      // console.log(source);
      // console.log(destination);
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
      // console.log(state.items);
      // backend script to save the area in backend
      // axios.post(`${server}/add-area`, state)
      // .then(res => console.log(res))
      // .catch(err => console.log(err))
      return;
    }

    if (finnsh.x * finnsh.y === finnsh.itemIds.length) {
      // console.log(finnsh.x * start.y);
      // console.log(finnsh.itemIds.length);
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
    // backend script to save the area in backend
    // axios.post(`${server}/add-area`, state)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
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
    // console.log(newItemTitles);
    // console.log(c);
    // end

    const newState = {
      ...state,
      areaOrder: newAreaOrder,
      items: newItems,
      itemTitles: newItemTitles
    };
    delete newState.areas[areaId];
    setState(newState);
    // backend script to save the area in backend
    // axios.post(`${server}/add-area`, state)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
    return;
  };

  const handleChangeColor = (color, e, itemId) => {
    // console.log(color, e, itemId);
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
    // backend script to save the area in backend
    // axios.post(`${server}/add-area`, state)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
    return;
  };

  // area modal if user clicks on ok
  const areaModalHandleOk = () => {
    setVisible(false);
    addArea();
  };

  const areaModalHandleCancel = () => {
    setTempDimension({ x: 1, y: 1 });
    setVisible(false);
  };

  const onXdimensionChange = value => {
    setTempDimension({ ...tempDimension, x: value });
  };
  const onYdimensionChange = value => {
    setTempDimension({ ...tempDimension, y: value });
  };
  return (
    <>
      <div className="area-main">
        <div className="area-main-btn">
          {/* area input x and y modal starts */}
          <Modal
            title="Enter Dimensions"
            visible={visible}
            onOk={areaModalHandleOk}
            onCancel={areaModalHandleCancel}
          >
            <div style={{ padding: "10px", textAlign: "center" }}>
              <label>X: </label>
              <InputNumber
                min={1}
                max={100}
                value={tempDimension.x}
                onChange={onXdimensionChange}
                style={{ margin: "10px" }}
              />
              <label>Y: </label>
              <InputNumber
                min={1}
                max={100}
                value={tempDimension.y}
                onChange={onYdimensionChange}
                style={{ margin: "10px" }}
              />
            </div>
          </Modal>
          {/* area input x and y modal ends */}
          <Button
            style={{ right: 0 }}
            // onClick={onCreateArea}
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setVisible(true)}
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
                    const items = area.itemIds.map(
                      itemId => state.items[itemId]
                    );
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
                        onRemoveItem={onRemoveItem}
                        onActiveDataSelect={onActiveDataSelect}
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
    </>
  );
}

export default AreaParent;
