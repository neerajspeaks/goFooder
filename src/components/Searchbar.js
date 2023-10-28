import React from 'react';

const Searchbar = () => {
    return (
        <div>
            <nav className="navbar bg-body-tertiary bg-dark">
                <div className="container-fluid">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search your food items" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    );
}

export default Searchbar;
