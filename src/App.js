import React, {useEffect, useState} from "react"
import Alert from "./Alert"
import List from "./List"


const App = () => {

    const getLocalStorage = () => {
        let list = localStorage.getItem("list")
        if(list) {
            return JSON.parse(localStorage.getItem("list"))
        }
        else {
            return []
        }
    }

    const [name, setName] = useState("")
    const [list, setList] = useState(getLocalStorage())
    const [isEditing, setIsEditing] = useState(false)
    const [editID, setEditID] = useState("")
    const [alert, setAlert] = useState({ show: false, message: "", type: "" })

    const showAlert = (show = false, message = "", type = "") => {
        setAlert({show, message, type})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!name) {
            showAlert(true, "Please Enter a Value", "danger")
        }
        else if(name && isEditing) {
            setList(list.map(item => {
                if(item.id === editID) {
                    return {...item, title: name}
                }
                return item
            }))
            showAlert(true, "Item edited", "success")
            setName("")
            setIsEditing(false)
            setEditID("")
        }
        else {
            const newItem = {id: new Date().getTime().toString(), title: name}
            setList([...list, newItem])
            showAlert(true, "Item added", "success")
            setName("")
        }
    }

    const clearItems = () => {
        setList([])
        showAlert(true, "Items Cleared", "success")
        setName("")
        setIsEditing(false)
        setEditID("")
    }

    const removeItem = (id) => {
        setList(list.filter(item => item.id !== id))
        showAlert(true, "Item Removed", "success")
        setName("")
        setIsEditing(false)
        setEditID("")
    }

    const editItem = (id) => {
        const item = list.find(item => item.id === id) 
        setIsEditing(true)
        setEditID(id)
        setName(item.title)
    }

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(list))
    }, [list])

    return (
        <main className="main-container">
            {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
            <h2>Grocery Bud</h2>
            <form className="input-container" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="input-field" 
                    placeholder="E.g., Eggs"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" className="submit-button">
                    {isEditing ? "Edit" : "Submit"}
                </button>
            </form>
            {
                list.length > 0 && (
                    <section className="grocery-list-container">
                        <List items={list} removeItem={removeItem} editItem={editItem} />
                        <button className="clear-button" onClick={clearItems}>Clear Items</button>
                    </section>
                ) 
            }
        </main>
    )

}


export default App

