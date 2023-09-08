import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { BiSearch } from "react-icons/bi"
import { AiFillCaretDown, AiFillCaretLeft, AiFillCaretRight } from "react-icons/Ai"
import { GrPowerReset } from "react-icons/gr"
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {

    const { products, rows, setLimit, setProducts, limit, pag, skip, setSkip } = useContext(UserContext)
    const [isHidden, setIsHidden] = useState(true)
    const [isTitleHidden, setIsTitleHidden] = useState(true)
    const [isBrandHidden, setIsBrandHidden] = useState(true)
    const [isCategoryHidden, setIsCategoryHidden] = useState(true)

    const [Title, setTitle] = useState("")
    const [Brand, setBrand] = useState("")
    const [Category, setCategory] = useState("0")
  
    const [value, setValue] = useState("")
    const [search, setSearch] = useState("")

    const handelTitleInput = (e) => {
        setTitle(e.target.value)
        setValue(e.target.value)
        setBrand("")
        setCategory("")
        
        setSearch("")
    }

    const handelBrandInput = (e) => {
        setBrand(e.target.value)
        setValue(e.target.value)
        
        setTitle("")
        setCategory("")
        setSearch("")
    }

    const handelCategoryInput = (e) => {
        setCategory(e.target.value)
        setValue(e.target.value)
       
        setTitle("")
        setBrand("")
        setSearch("")
    }

    const handelVisible = () => {
        setIsHidden(!isHidden)
        setIsTitleHidden(true)
        setIsBrandHidden(true)
        setIsCategoryHidden(true)
        setTitle("")
        setBrand("")
        setCategory("")
        setSearch("")

    }

    const handelNameVisible = () => {
        setIsTitleHidden(!isTitleHidden)
        setIsBrandHidden(true)
        setIsCategoryHidden(true)
        setIsHidden(true)
        setTitle("")
        setBrand("")
        setCategory("")
        setSearch("")

    }

    const handelBrandVisible = () => {

        setIsBrandHidden(!isBrandHidden)
        setIsTitleHidden(true)
        setIsCategoryHidden(true)
        setIsHidden(true)
        setTitle("")
        setBrand("")
        setCategory("")
        setSearch("")
    }
    const handelCategoryVisible = () => {
        setIsCategoryHidden(!isCategoryHidden)
        setIsBrandHidden(true)
        setIsTitleHidden(true)
        setIsHidden(true)
        setTitle("")
        setBrand("")
        setCategory("")
        setSearch("")
    }

    const filterData = async () => {
        if (value.length == 0) {
            getData()
        }
        else {
            await axios.get(`https://dummyjson.com/products/search?q=${value}`).then(data => setProducts(data.data))
            setCurrentPage(1)
        }
    }
    const categoriesData = async () => {
        
            await axios.get(`https://dummyjson.com/products/category/${value}`).then(data => setProducts(data.data))
        
    }

    async function getData() {
        await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`).then(data => setProducts(data.data))
        setCurrentPage(1)

    }

    async function resetData() {
        await axios.get(`https://dummyjson.com/products?limit=12`).then(data => setProducts(data.data))
        setIsBrandHidden(true)
        setIsTitleHidden(true)
        setIsCategoryHidden(true)
        setIsHidden(true)
        setTitle("")
        setBrand("")
        setCategory("")
        setSearch("")

    }

    const handelInput = (e) => {
        setLimit(e.target.value)

    }

    const handelSearch = (e) => {
        setSearch(e.target.value)

    }

    async function searchData() {


        const res = await axios.get(`https://dummyjson.com/products`)

        const data = res.data

        const title = data.products.filter(product => product.title.toString().toLowerCase() == search.toString().toLowerCase())
        const description = data.products.filter(product => product.description.toLowerCase() === search.toLowerCase())
        const price = data.products.filter(product => parseInt(product.price) === parseInt(search))
        const discountPercentage = data.products.filter(product => parseFloat(product.discountPercentage) === parseFloat(search))
        const rating = data.products.filter(product => parseFloat(product.rating) === parseFloat(search))
        const stock = data.products.filter(product => parseInt(product.stock) === parseInt(search))
        const brand = data.products.filter(product => product.brand.toLowerCase().toLowerCase() === search.toLowerCase())
        const category = data.products.filter(product => product.category.toLowerCase() === search.toLowerCase())

        if (title.length > 0) {
            setProducts({ products: title.slice(0, 1) })
        }
        else if (description.length > 0) {
            setProducts({ products: description.slice(0, 1) })
        }
        else if (price.length > 0) {
            setProducts({ products: price.slice(0, 1) })
        }
        else if (discountPercentage.length > 0) {
            setProducts({ products: discountPercentage.slice(0, 1) })
        }
        else if (rating.length > 0) {
            setProducts({ products: rating.slice(0, 1) })
        }
        else if (stock.length > 0) {
            setProducts({ products: stock.slice(0, 1) })
        }
        else if (brand.length > 0) {
            setProducts({ products: brand.slice(0, 1) })
        }
        else {
            setProducts({ products: category.slice(0, 1) })
        }

    }

    const [currentPage, setCurrentPage] = useState(1);

    
    const data = Array.from({ length: products.products && products.products.length }, (_, i) => i + 1);

   
    const totalPages = Math.ceil(data.length / pag);

  




    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setSkip((currentPage - 1) * limit);
            getData()
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setSkip((currentPage - 1) * limit);
            getData()
        }
    };
    return (
        <div>
            <div style={{ display: "flex", columnGap: "80%", alignItems: "center" }}>
                <p>Home / <span style={{ fontWeight: 'bold', background: "yellow" }}>Products</span></p>
                <Link to='/users' className="link">Users Page</Link>
            </div>
            <div className="container select">
                <select onChange={handelInput}>
                    {rows.map(row =>
                        <option key={row} value={row}>{row}</option>
                    )}
                </select>
                <button onClick={getData}>Entries</button>
                <hr className="col"></hr>
                <div className="search">
                    <input type="text" className="search-input" hidden={isHidden} onChange={handelSearch} value={search} />
                    {isHidden ? <BiSearch cursor={"pointer"} onClick={handelVisible} /> : <BiSearch cursor={"pointer"} onClick={searchData} />}
                </div>
                <hr className="col"></hr>
                <div className="search">
                    <div className="search">
                        <p className="label search" onClick={handelNameVisible}>{!isTitleHidden ? 'Search' : "Title"}<AiFillCaretDown /></p>
                        <div className={`search ${!isTitleHidden && ' name'} `} >
                            <input hidden={isTitleHidden} value={Title} onChange={handelTitleInput} type="search" className="search-input" placeholder="Title" />
                            {!isTitleHidden && <BiSearch onClick={filterData} cursor={"pointer"} />}
                        </div>
                    </div>
                    <div className="search" >
                        <p className="label search" onClick={handelBrandVisible}>{!isBrandHidden ? 'Search' : "Brand"}<AiFillCaretDown /></p>
                        <div className={`search ${!isBrandHidden && 'name'} `} >
                            <input hidden={isBrandHidden} value={Brand} onChange={handelBrandInput} type="text" className="search-input" placeholder="Brand" />
                            {!isBrandHidden && <BiSearch onClick={filterData} cursor={"pointer"} />}
                        </div>
                    </div>
                    <div className="search" >
                        <p className="label search" onClick={handelCategoryVisible}>{!isCategoryHidden ? 'Search' : "Category"}<AiFillCaretDown /></p>
                        <div className={`search ${!isCategoryHidden && 'name'} `} >
                            <input hidden={isCategoryHidden} value={Category} onChange={handelCategoryInput} type="text" className="search-input" placeholder="Category" />
                            {!isCategoryHidden && <BiSearch onClick={categoriesData} cursor={"pointer"} />}
                        </div>
                    </div>
                    <div className="search" >
                        <div className="search">
                            <GrPowerReset cursor={'pointer'} onClick={resetData} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>description</th>
                            <th>price</th>
                            <th>discount (%)</th>
                            <th>rating</th>
                            <th>stock</th>
                            <th>brand</th>
                            <th>category</th>

                        </tr>
                    </thead>
                    <tbody>
                        {products.products ? products.products.map(product =>
                            <tr key={product.id}>
                                <td style={{ width: "20px" }}>{product.title}</td>
                                <td style={{ width: "400px" }}>{product.description}</td>
                                <td style={{ width: "20px" }}>{product.price} $</td>
                                <td style={{ width: "20px" }}>{product.discountPercentage} %</td>
                                <td style={{ width: "20px" }}>{product.rating}</td>
                                <td style={{ width: "20px" }}>{product.stock}</td>
                                <td style={{ width: "20px" }}>{product.brand}</td>
                                <td style={{ width: "20px" }}>{product.category}</td>
                            </tr>

                        ) : null}

                    </tbody>
                </table>
                <div className="search" style={{ alignItems: "center", justifyContent: "center", marginTop: "30px" }}>
                    <ul className="search">
                        <AiFillCaretLeft onClick={handlePrevPage} disabled={currentPage === 1} />
                        <span>Page {currentPage} of {totalPages}</span>

                        <AiFillCaretRight onClick={handleNextPage} disabled={currentPage === totalPages} />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Products;