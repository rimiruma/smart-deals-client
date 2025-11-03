import { Suspense, use } from "react";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";


const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);

  return (
    <div>
      <h2 className="text-center text-5xl">
        Recent <span className="text-primary">Products</span>
      </h2>

      <Suspense fallback={<Loading />}>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default LatestProducts;
