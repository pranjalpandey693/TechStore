import ProductCard from "./component/productCard";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Link } from "react-router-dom";





const ProductSection = () => {
  const {products,loading} = useSelector((state:RootState)=>state.product)


 
  
  return (
    <div className="relative mt-10 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                <button className="text-blue-600 hover:text-blue-700">View All</button>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             { loading? (
              <div className="flex justify-center items-center col-span-full">
              <Spinner size={24} variant="bars"/>
              </div>
             ) : products.length === 0  ? (
              <div className="text-center col-span-full text-gray-500">No Products found.</div>
             ) : (
             
              products.map((product)=>(
                <Link to={`/product/${product._id}`} key={product._id}>
                  <ProductCard  key={product._id} product={product}/>
                </Link>
              ))
             )}
              
             </div>

        </div>
      </div>
    </div>
  );
}

export default ProductSection;
