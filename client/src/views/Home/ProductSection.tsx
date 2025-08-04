

const ProductSection = () => {
  return (
    <div className="relative mt-10 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Featured Produtcs</h2>
                <button className="text-blue-600 hover:text-blue-700">View All</button>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

             </div>

        </div>
      </div>
    </div>
  );
}

export default ProductSection;
