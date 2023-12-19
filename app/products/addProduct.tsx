"use client"

import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function AddProduct() {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const router = useRouter()

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setIsMutating(true)
        await fetch("http://localhost:5000/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                price: price,
            }),
        })
        setIsMutating(false)

        setTitle("")
        setPrice("")
        router.refresh()
        setModal(false)
    }

    function handleChange() {
        setModal(!modal)
    }
    return (
        <div>
            <button className="btn" onClick={handleChange}>Add New </button>
            <input type="checkbox" className="modal-toggle" checked={modal} onChange={handleChange} />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Form Add</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Title</label>
                            <input type="text" className="input w-full input-bordered" placeholder="Product Name" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Price</label>
                            <input type="text" className="input w-full input-bordered" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>Close</button>
                            {!isMutating ? <button type="submit" className="btn btn-primary">Save</button> : <button type="button" className="btn loading">Saving...</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
