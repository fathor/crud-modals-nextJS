"use client"

import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation"

type Product = {
    id: number;
    title: string;
    price: number;
};

export default function DeleteProduct(product: Product) {
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter()

    async function handleDelete(productId: number) {
        setIsMutating(true)
        await fetch(`http://localhost:5000/products/${productId}`, {
            method: "DELETE",
        });
        setIsMutating(false);

        router.refresh();
        setModal(false);
    }

    function handleChange() {
        setModal(!modal)
    }
    return (
        <div>
            <button className="btn btn-error btn-sm" onClick={handleChange}>Delete </button>
            <input type="checkbox" className="modal-toggle" checked={modal} onChange={handleChange} />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delete this product {product.title} ?</h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>Close</button>
                        {!isMutating ? <button className="btn btn-primary" type="button" onClick={() => handleDelete(product.id)}>Delete</button> : <button type="button" className="btn loading">Deleting...</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}
