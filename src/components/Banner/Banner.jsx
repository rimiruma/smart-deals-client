const Banner = () => {
  return (
    <div className="h-[400px] bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 flex flex-col justify-center items-center relative overflow-hidden px-4">

      {/* Background abstract wave shapes */}
      <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-purple-200 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-200 opacity-30 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Deal Your <span className="text-purple-600">Products</span><br />
          In A <span className="text-blue-600">Smart Way</span> !
        </h1>

        <p className="mt-4 text-gray-700">
          SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!
        </p>

        {/* Search Input */}
        <div className="mt-6 flex items-center bg-white rounded-full shadow-md px-4 w-full max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search for products, categories..."
            className="flex-1 py-3 px-2 focus:outline-none text-gray-700"
          />
          <button className="p-3 -mr-4 bg-purple-600 rounded-b-2xl -rotate-90">
            🔍
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="btn bg-purple-600 text-white border-none px-6">
            Watch All Products
          </button>
          <button className="btn bg-white text-purple-600 border border-purple-500 px-6">
            Post a Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
