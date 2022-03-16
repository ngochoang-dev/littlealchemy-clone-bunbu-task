import './App.css';
import WorkSpace from './Components/WorkSpace/WorkSpace';
import SideBar from './Components/SideBar/SideBar';

const resources = [
  {
    id: 1,
    name: 'air',
    photo: 'download0.png'
  },
  {
    id: 2,
    name: 'earth',
    photo: 'download.png'
  },
  {
    id: 3,
    name: 'energy',
    photo: 'download (1).png'
  },
  {
    id: 4,
    name: 'fire',
    photo: 'download (2).png'
  },
  {
    id: 5,
    name: 'lava',
    photo: 'download (3).png'
  },
  {
    id: 6,
    name: 'obsidian',
    photo: 'download (4).png',
    underline: true
  },
  {
    id: 7,
    name: 'steam',
    photo: 'download (5).png'
  },
  {
    id: 8,
    name: 'stone',
    photo: 'download (6).png'
  },
  {
    id: 9,
    name: 'volcano',
    photo: 'download (7).png'
  },
  {
    id: 10,
    name: 'water',
    photo: 'download (8).png'
  },
  {
    id: 11,
    name: 'wind',
    photo: 'download (9).png'
  },
]

function App() {

  return (
    <div className="App">
      <WorkSpace />
      <SideBar
        resources={resources}
      />
    </div>
  );
}

export default App;
