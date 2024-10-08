import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


export default function Home() {


    const [search, setSearch] = useState('');
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();

        setfoodItem(response[0]);
        setfoodCat(response[1]);
        //console.log(response[0], response[1])
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div><Navbar></Navbar></div>
            <div>
                <form className="d-flex my-4 -flex justify-content-center">
                    <input className="form-control w-50 mx-3 " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    {/*<button className="btn btn-outline-success" type="submit">Search</button>*/}
                </form>
            </div>
            <div className='container'>
                {

                    (foodCat !== [])
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3 '>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItem !== []
                                        ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card foodName={filterItems.name}
                                                            options={filterItems.options[0]}
                                                            imgSrc={filterItems.img}
                                                            desc={filterItems.description}></Card>
                                                    </div>
                                                )
                                            }) : <div>No such data found</div>}
                                </div>
                            )
                        })

                        : ""
                }


            </div>
            <div><Footer /></div>
        </div>
    )
}
