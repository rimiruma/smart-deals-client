import { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";


const ProductDetails = () => {
    const { _id: productId } = useLoaderData();
    const [bids, setBids] = useState([])
    const bidModalRef = useRef(null);
    const { user } = use(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productId}`)
            .then(res => res.json())
            .then(data => {
                console.log('bids for this product', data);
                setBids(data);

            })
    }, [])

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    }

    const handleBidSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        console.log(productId, name, email, bid);

        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user?.photoURL,
            bid_price: bid,
            status: "pending"
        }

        fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                // console.log('after placing bid', data)
                if (data.insertedId) {
                    bidModalRef.current.close();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your bid has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // add the new bid to the state
                    newBid._id = data.insertedId;
                    const newBids = [...bids, newBid];
                    newBids.sort((a,b) => b.bid_price - a.bid_price)
                    setBids(newBids);

                }

            })

    }

    return (
        <div>
            {/* product info  */}
            <div>
                <div></div>
                <div>
                    <button onClick={handleBidModalOpen} className="btn btn-primary">I want to Recent this product</button>
                    <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Give the best offer!</h3>
                            <p className="py-4">Offer something seller can not resist</p>

                            <form onSubmit={handleBidSubmit}>
                                <fieldset className="fieldset">
                                    {/* Name */}
                                    <label className="label text-primary">Name</label>
                                    <input type="text" className="input" name="name" readOnly defaultValue={user?.displayName} />
                                    {/* Email */}
                                    <label className="label text-primary">Email</label>
                                    <input type="email" className="input" name="email" readOnly defaultValue={user?.email} />
                                    {/* BidAmount */}
                                    <label className="label text-primary">Bid</label>
                                    <input type="text" className="input" name="bid" placeholder="Your Bid" />
                                    <button className="btn btn-neutral mt-4">Please Your Bid</button>
                                </fieldset>
                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
            {/* bid for this product */}
            <div>
                <h3 className="text-3xl">
                    Bids for this Product:
                    <span className="text-primary">{bids.length}</span>
                </h3>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    SL No.
                                </th>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>Bid Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bids.map((bid, index) =>
                                    <tr key={bid._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={bid.buyer_image || photoURL}
                                                            alt="Buyer Avatar"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{bid.buyer_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{bid.buyer_email}</td>
                                        <td className="font-semibold text-primary">৳ {bid.bid_price}</td>
                                        <th>
                                            <button className="btn btn-sm">Delete</button>
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
