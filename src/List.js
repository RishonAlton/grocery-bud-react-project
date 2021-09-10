import React from 'react'
import { FaEdit, FaTrash } from "react-icons/fa"


const List = ({items, removeItem, editItem}) => {

    return (
        <article>
            <ul className="grocery-list">
                {
                    items.map(item => {
                        const {id, title} = item
                        return (
                            <li className="grocery-item" key={id}>
                                <p className="item-name">{title}</p>
                                <div className="buttons-container">
                                    <button className="edit-button" onClick={() => editItem(id)}>
                                        <FaEdit className="fa-edit" />
                                    </button>
                                    <button className="delete-button" onClick={() => removeItem(id)}>
                                        <FaTrash className="fa-trash" />
                                    </button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </article>
    )

}


export default List
