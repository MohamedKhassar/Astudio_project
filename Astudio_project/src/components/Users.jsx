import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { BiSearch } from "react-icons/bi"
import { AiFillCaretDown, AiFillCaretLeft, AiFillCaretRight } from "react-icons/Ai"
import { GrPowerReset } from "react-icons/gr"
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {

    const { users, rows, setLimit, setUsers, limit, pag, skip, setSkip } = useContext(UserContext)
    const [isHidden, setIsHidden] = useState(true)
    const [isNameHidden, setIsNameHidden] = useState(true)
    const [isEmailHidden, setIsEmailHidden] = useState(true)
    const [isBdHidden, setIsBdHidden] = useState(true)
    const [isGenderHidden, setIsGenderHidden] = useState(true)
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Bd, setBd] = useState("0")
    const [Gender, setGender] = useState("male")
    const [key, setKey] = useState("")
    const [value, setValue] = useState("")
    const [search, setSearch] = useState("")


    const handelNameInput = (e) => {
        setName(e.target.value)
        setValue(e.target.value)
        setEmail("")
        setBd("")
        setGender("")
        setKey('firstName')
        setSearch("")
    }

    const handelEmailInput = (e) => {
        setEmail(e.target.value)
        setValue(e.target.value)
        setKey('email')
        setName("")
        setBd("")
        setGender("")
        setSearch("")
    }

    const handelBdInput = (e) => {
        setBd(e.target.value)
        setValue(e.target.value)
        setKey("birthDate")
        setName("")
        setEmail("")
        setGender("")
        setSearch("")
    }

    const handelGenderInput = (e) => {
        setGender(e.target.value)
        setValue(e.target.value)
        setKey("gender")
        setName("")
        setEmail("")
        setBd("")
        setSearch("")
    }

    const handelVisible = () => {
        setIsHidden(!isHidden)
        setIsNameHidden(true)
        setIsEmailHidden(true)
        setIsBdHidden(true)
        setIsGenderHidden(true)

    }

    const handelNameVisible = () => {
        setIsNameHidden(!isNameHidden)
        setIsEmailHidden(true)
        setIsBdHidden(true)
        setIsGenderHidden(true)
        setIsHidden(true)
        setSearch("")


    }

    const handelEmailVisible = () => {

        setIsEmailHidden(!isEmailHidden)
        setIsNameHidden(true)
        setIsBdHidden(true)
        setIsGenderHidden(true)
        setIsHidden(true)
        setSearch("")

    }
    const handelBdVisible = () => {
        setIsBdHidden(!isBdHidden)
        setIsEmailHidden(true)
        setIsNameHidden(true)
        setIsGenderHidden(true)
        setIsHidden(true)
        setSearch("")

    }

    const handelGenderVisible = () => {
        setIsGenderHidden(!isGenderHidden)
        setIsEmailHidden(true)
        setIsNameHidden(true)
        setIsBdHidden(true)
        setIsHidden(true)
        setKey('gender')
        setValue(Gender)
        setSearch("")

    }

    const filterData = async () => {
        if (value.length == 0) {
            getData()
        }
        else {
            await axios.get(`https://dummyjson.com/users/filter?key=${key}&value=${value}`).then(data => setUsers(data.data))
            setCurrentPage(1)
        }

    }

    async function getData() {
        
        
        await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`).then(data => setUsers(data.data))
        

    }

    async function resetData() {
        await axios.get(`https://dummyjson.com/users?limit=12`).then(data => setUsers(data.data))
        setIsGenderHidden(true)
        setIsEmailHidden(true)
        setIsNameHidden(true)
        setIsBdHidden(true)
        setIsHidden(true)
        setEmail("")
        setName("")
        setBd("")
        setGender("")
        setSearch("")
        setCurrentPage(1)
        setSkip(0)

    }

    const handelInput = (e) => {
        setLimit(e.target.value)
        setSkip((currentPage - 1) * limit);

    }

    const handelSearch = (e) => {
        setSearch(e.target.value)

    }

    async function searchData() {


        const res = await axios.get(`https://dummyjson.com/users`)

        const data = res.data

        const bloodGroup = data.users.filter(user => user.bloodGroup.toString().toLowerCase() == search.toString().toLowerCase())
        const firstName = data.users.filter(user => user.firstName.toLowerCase() === search.toLowerCase())
        const lastName = data.users.filter(user => user.lastName.toLowerCase() === search.toLowerCase())
        const maidenName = users.users.filter(user => user.maidenName.toLowerCase() === search.toLowerCase())
        const age = data.users.filter(user => parseInt(user.age) === parseInt(search))
        const email = data.users.filter(user => user.email.toLowerCase() === search.toLowerCase())
        const gender = data.users.filter(user => user.gender.toLowerCase().toLowerCase() === search.toLowerCase())
        const eyeColor = data.users.filter(user => user.eyeColor.toLowerCase() === search.toLowerCase())
        const username = data.users.filter(user => user.username.toLowerCase() === search.toLowerCase())


        if (firstName.length > 0) {
            setUsers({ users: firstName.slice(0, 1) })
        }
        else if (lastName.length > 0) {
            setUsers({ users: lastName.slice(0, 1) })
        }
        else if (maidenName.length > 0) {
            setUsers({ users: maidenName.slice(0, 1) })
        }
        else if (age.length > 0) {
            setUsers({ users: age.slice(0, 1) })
        }
        else if (email.length > 0) {
            setUsers({ users: email.slice(0, 1) })
        }
        else if (gender.length > 0) {
            setUsers({ users: gender.slice(0, 1) })
        }
        else if (eyeColor.length > 0) {
            setUsers({ users: eyeColor.slice(0, 1) })
        }
        else if (bloodGroup.length > 0) {
            setUsers({ users: bloodGroup.slice(0, 1) })
        }
        else {
            setUsers({ users: username.slice(0, 1) })
        }


    }
    


    const [currentPage, setCurrentPage] = useState(1);

    
    const data = Array.from({ length: users.users && users.users.length }, (_, i) => i + 1);

   
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
                <p>Home / <span style={{ fontWeight: 'bold', background: "yellow" }}>Users</span></p>
                <Link to='/products' className="link">Products Page</Link>
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
                        <p className="label search" onClick={handelNameVisible}>{!isNameHidden ? 'Search' : "Name"}<AiFillCaretDown /></p>
                        <div className={`search ${!isNameHidden && ' name'} `} >
                            <input hidden={isNameHidden} value={Name} onChange={handelNameInput} type="search" className="search-input" placeholder="Name" />
                            {!isNameHidden && <BiSearch onClick={filterData} cursor={"pointer"} />}
                        </div>
                    </div>
                    <div className="search" >
                        <p className="label search" onClick={handelEmailVisible}>{!isEmailHidden ? 'Search' : "Email"}<AiFillCaretDown /></p>
                        <div className={`search ${!isEmailHidden && 'name'} `} >
                            <input hidden={isEmailHidden} value={Email} onChange={handelEmailInput} type="email" className="search-input" placeholder="Email" />
                            {!isEmailHidden && <BiSearch onClick={filterData} cursor={"pointer"} />}
                        </div>
                    </div>
                    <div className="search" >
                        <p className="label search" onClick={handelBdVisible}>{!isBdHidden ? 'Search' : "Birth Date"}<AiFillCaretDown /></p>
                        <div className={`search ${!isBdHidden && 'name'} `} >
                            <input hidden={isBdHidden} value={Bd} onChange={handelBdInput} type="date" className="search-input" placeholder="Birth Date" />
                            {!isBdHidden && <BiSearch onClick={filterData} cursor={"pointer"} />}
                        </div>
                    </div>
                    <div className="search" >
                        <p className="label search" onClick={handelGenderVisible}>{!isGenderHidden ? 'Search' : "Gender"}<AiFillCaretDown /></p>
                        <div className={`search ${!isGenderHidden && 'name'} `} >
                            <select hidden={isGenderHidden} onChange={handelGenderInput} className="search-input" >
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                            {!isGenderHidden && <BiSearch onClick={filterData} cursor={"pointer"} />}
                        </div>
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
                            <th>first name</th>
                            <th>last name</th>
                            <th>maiden name</th>
                            <th>age</th>
                            <th>gender</th>
                            <th>email</th>
                            <th>username</th>
                            <th>bloodgroup</th>
                            <th>eyecolor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.users ? users.users.map(user =>
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.maidenName}</td>
                                <td>{user.age}</td>
                                <td>{user.gender}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.bloodGroup}</td>
                                <td>{user.eyeColor}</td>
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

export default Users;