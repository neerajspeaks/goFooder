import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FoodItem from '../components/FoodItem';
import Searchbar from '../components/Searchbar';

const Home = () => {
    const [search, setSearch] = useState('');
    const [foodCategory, setFoodCategory] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const empty = [];

    const loadData = async () => {
        const response = await fetch('http://localhost:5000/display/fooddata', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
        }).then(async function (response) {
            const jsonResponse = await response.json();
            console.log(jsonResponse[1]);
            console.log(jsonResponse[0]);
            setFoodItem(jsonResponse[0]);
            setFoodCategory(jsonResponse[1]);
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                {/* <Searchbar /> */}
                <div className="container-fluid">
                    <div className="d-flex mt-3 justify-content-center" role="search">
                        <input className="form-control me-2 w-25" type="search" placeholder="Search your food items" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    </div>
                </div>
            </div>
            <div className="container">
                {
                    foodCategory !== empty ? foodCategory.map((data) => {
                        return (
                            <div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {
                                    foodItem !== empty ?
                                        foodItem.filter((item) => (item.CategoryName === data.CategoryName) 
                                        && (item.name.toLowerCase().includes(search.toLowerCase())))
                                            .map(filteredItems => {
                                                return (
                                                    <div key={filteredItems._id} className='col-md-4'>
                                                        <FoodItem key={filteredItems._id}
                                                            foodName={filteredItems.name}
                                                            options={filteredItems.options[0]}
                                                            imgSrc={filteredItems.img} />
                                                    </div>
                                                )
                                            }) : <div>No food Items found.</div>
                                }
                            </div>
                        )
                    }) : "Hello"
                }
            </div>
            <Footer />
        </div>
    );
}

export default Home;
