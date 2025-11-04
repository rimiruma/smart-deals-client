import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
    const { user } = use(AuthContext);
    const [bids, setBids] = useState([])

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setBids(data)

                })
        }
    }, [user?.email])

    const handleDeleteBid = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log('now delete');
                fetch(`http://localhost:3000/bids/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log('after this delete', data);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });
                            const remainingBids = bids.filter(bid => bid._id !== _id);
                            setBids(remainingBids)
                        }

                    })


            }
        });
    }

    return (
        <div>
            <h3 className="text-3xl text-center py-10">
                Bids for this Product:
                <span className="text-primary">{bids.length}</span>
            </h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Product</th>
                            <th>Seller</th>
                            <th>Bid Price</th>
                            <th>Status</th>
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
                                        {bid.status === 'pending' ? <div className="badge badge-warning p-4">
                                            {bid.status}
                                        </div> : <div className="badge badge-success">
                                            {bid.status}
                                        </div>}
                                    </th>
                                    <th>
                                        <button onClick={() => handleDeleteBid(bid._id)} className="btn btn-sm hover:bg-red-600 hover:text-white border-red-600">Remove Bid</button>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;