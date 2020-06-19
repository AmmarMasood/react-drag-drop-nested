import React from "react";
import { Tabs, Input } from "antd";
import AreaParent from "./Areas/AreaParent";
import "./Room.css";
import { server } from "../Utils/Server";
import axios from "axios";

const { TabPane } = Tabs;

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: "Tab 1", content: <AreaParent roomId={1} />, key: "1" }
    ];
    this.state = {
      activeKey: panes[0].key,
      panes
    };
  }

  componentDidMount() {
    // backend script to add tab into backend (should be uncommented)
    // axios.post(`${server}/update/room`, this.state.panes)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  onTableTitleChange = (e, key) => {
    // console.log(e.target.value);
    for (var i in this.state.panes) {
      if (this.state.panes[i].key == key) {
        let panes = [...this.state.panes]; // create the copy of state array
        panes[i].title = e.target.value; //new value
        this.setState({ panes }); //update the value
        break;
      }
    }
    // backend script to change tab title in backend (should be uncommented)
    // axios.post(`${server}/update/room`, this.state.panes)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: "New Tab",
      content: <AreaParent roomId={activeKey} />,
      key: activeKey
    });
    this.setState({ panes, activeKey });
    // backend script to add tab into backend (should be uncommented)
    // axios.post(`${server}/update/room`, this.state.panes)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
    // backend script to add tab into backend (should be uncommented)
    // axios.post(`${server}/update/room`, this.state.panes)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
  };

  render() {
    return (
      <Tabs
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {this.state.panes.map(pane => (
          // <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
          <TabPane
            tab={
              <Input
                value={pane.title}
                style={{ width: "60%", marginRight: "30%" }}
                onChange={e => this.onTableTitleChange(e, pane.key)}
              />
            }
            key={pane.key}
            closable={pane.closable}
          >
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

export default Rooms;
