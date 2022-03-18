import { useState } from 'react';
import './App.css';
import WorkSpace from './Components/WorkSpace/WorkSpace';
import SideBar from './Components/SideBar/SideBar';

const resources = [
  {
    id: 5,
    keyitem: 5,
    name: 'lava',
    photo: 'download (3).png'
  },
  {
    id: 6,
    keyitem: 6,
    name: 'obsidian',
    photo: 'download (4).png',
    underline: true
  },
  {
    id: 7,
    keyitem: 7,
    name: 'steam',
    photo: 'download (5).png'
  },
  {
    id: 8,
    keyitem: 8,
    name: 'stone',
    photo: 'download (6).png'
  },
  {
    id: 9,
    keyitem: 9,
    name: 'volcano',
    photo: 'download (7).png'
  },
  {
    id: 10,
    keyitem: 10,
    name: 'energy',
    photo: 'download (1).png'
  },
  {
    id: 11,
    keyitem: 11,
    name: 'wind',
    photo: 'download (9).png'
  },
]

function App() {
  const [itemWorkSpace, setItemWorkSpace] = useState([]);
  const [itemSideBar, setItemSideBar] = useState([
    {
      id: 1,
      keyitem: 1,
      name: 'air',
      photo: 'download0.png'
    },
    {
      id: 2,
      keyitem: 2,
      name: 'earth',
      photo: 'download.png'
    },
    {
      id: 3,
      keyitem: 3,
      name: 'fire',
      photo: 'download (2).png'
    },
    {
      id: 4,
      keyitem: 4,
      name: 'water',
      photo: 'download (8).png'
    },
  ]);

  return (
    <div className="App">
      <WorkSpace
        resources={resources}
        items={itemWorkSpace}
        setItemWorkSpace={setItemWorkSpace}
        setItemSideBar={setItemSideBar}
      />
      <SideBar
        resources={resources}
        itemSideBar={itemSideBar}
        itemWorkSpace={itemWorkSpace}
        setItemWorkSpace={setItemWorkSpace}
        setItemSideBar={setItemSideBar}
      />
    </div>
  );
}

export default App;
