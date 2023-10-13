import { useState, useEffect } from 'react'
import './App.css'
import randomPetNames from './randomPetNames';
import CatContainer from './components/catContainer';
import BanList from './components/BanList';
function App() {
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const APIurl = 'https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=live_BbvSEOm7P9dSG7BLzs8LYWIBOfrFdqC7EdFMQxaGhfZrt6HNCZEYQ69aIJLAQfzt';
  const [data, setData] = useState(null);
  const [cat, setCat] = useState({
    breed: "",
    origin: "",
    life_span: "",
    country_code: "",
    id: "",
    img: "",
    desc: ""
  });
  const [name, setName] = useState('');
  const [banList, setBanList] = useState(new Set());
  const addToBanList = (tag) => {
    setBanList((prevBanList) => {
      const newBanList = new Set(prevBanList);
      newBanList.add(tag);
      return newBanList;
    });
  };
  
  const removeFromBanList = (tag) => {
    setBanList((prevBanList) => {
      const newBanList = new Set(prevBanList);
      newBanList.delete(tag);
      return newBanList;
    });
  };
  const generateRandomName = () => {
    const randomIndex = Math.floor(Math.random() * randomPetNames.length);
    const randomPetName = randomPetNames[randomIndex];
    if(randomPetName == name) {
      generateRandomName();
    }
    setName(randomPetName);
  }
  const fetchNewCat = () => {
    let newCat = null;
    const getNewCat = () => {
      fetch(APIurl)
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        if(Array.isArray(jsonData) && jsonData.length > 0) {
          setCat({
            breed: jsonData[0].breeds[0].name,
            origin: jsonData[0].breeds[0].origin,
            life_span: jsonData[0].breeds[0].life_span,
            country_code: jsonData[0].breeds[0].country_code,
            id: jsonData[0].breeds[0].id,
            img: jsonData[0].url,
            desc: jsonData[0].breeds[0].description
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    };
    const tryFetchNewCat = () => {
      getNewCat();
      if (newCat === null) {
        // If the fetched cat is on the ban list, try fetching again
        tryFetchNewCat();
      } else {
        // Set the new cat when it's not on the ban list
        setCat(newCat);
      }
    };
  
    tryFetchNewCat();
  };
  // Call fetchNewCat when you want to fetch a new cat, e.g., in response to a button click
  const handleFetchNewCat = () => {
    generateRandomName();
    fetchNewCat();
  };
  useEffect(() => {
    // Log the updated banList whenever it changes
    console.log(banList);
  }, [banList]);
  console.log(cat);
  // console.log(data);
  return (
    <div>
      <div>
        <BanList banList={banList} removeFromBanList={removeFromBanList}/>
        <CatContainer cat={cat} name={name} banList={banList} addToBanList={addToBanList}/>
        <button onClick={handleFetchNewCat}>new cat!</button>
      </div>
    </div>
  );
};

export default App;

