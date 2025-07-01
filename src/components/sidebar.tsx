"use client";
import { useRouter } from "next/navigation";
import { FaHome, FaInfoCircle } from 'react-icons/fa';
import { RiDiscountPercentFill } from "react-icons/ri";
import { usePathname } from 'next/navigation';
import { MdImageSearch } from "react-icons/md";
import { MdOutlineCompare } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { logoutUser } from "@/actions/user_action";
import toast from "react-hot-toast";
import Image from "next/image";


const Sidebar = () => {
  const logout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    logoutUser()
      .then(() => {
        toast.success("Logged out successfully");
        window.location.href = "/login";
      })
      .catch((error) => {
        toast.error("Logout failed. Please try again.");
        console.error("Logout failed:", error);
      });
  }
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <aside className="hidden sm:flex w-[60px] lg:w-64 sticky top-0 lg:rounded-l-xl max-h-screen bg-transparent border-r-[1px] border-gray-700 px-0 pb-6 lg:p-6 flex-col justify-between lg:shadow-lg">
        <div className="flex flex-col items-center">
          <Image
            src="/assets/logo.png"
            alt="PriceSphere Logo"
            width={130}
            height={55}
            className="transition-transform transform hover:scale-105 w-[130px] lg:w-24 h-[55px] lg:h-[90px]"
            priority
          />
          <div className="hidden lg:block text-2xl font-extrabold text-orange-500">PriceSphere</div>
        </div>
        <nav className="space-y-6 mb-56 mt-8">

          <div
            onClick={() => { router.push("/dashboard") }}
            className={`flex hover:cursor-pointer items-center lg:justify-normal justify-center text-base ${pathname === '/dashboard' ? 'text-orange-500 lg:bg-gray-800' : 'text-gray-400 hover:text-orange-400 hover:bg-gray-700'} lg:px-3 py-2 rounded transition`}>
            <span className="text-xl lg:text-lg lg:mr-3"><FaHome /></span>
            <span className='hidden lg:block'>Home</span>
          </div>
          <div
            onClick={() => { router.push("/imagesearch") }}
            className={`flex hover:cursor-pointer items-center lg:justify-normal justify-center text-base ${pathname === '/imagesearch' ? 'text-orange-500 lg:bg-gray-800' : 'text-gray-400 hover:text-orange-400 hover:bg-gray-700'} lg:px-3 py-2 rounded transition`}>
            <span className="text-xl lg:text-lg lg:mr-3"><MdImageSearch /></span>
            <span className='hidden lg:block'>Search</span>
          </div>
          <div
            onClick={() => { router.push("/coupons") }}
            className={`flex hover:cursor-pointer items-center lg:justify-normal justify-center text-base ${pathname === '/coupons' ? 'text-orange-500 lg:bg-gray-800' : 'text-gray-400 hover:text-orange-400 hover:bg-gray-700'} lg:px-3 py-2 rounded transition`}>
            <span className="text-xl lg:text-lg lg:mr-3"><RiDiscountPercentFill /></span>
            <span className='hidden lg:block'>Coupons</span>
          </div>
          <div
            onClick={() => { router.push("/compare") }}
            className={`flex hover:cursor-pointer items-center lg:justify-normal justify-center text-base ${pathname === '/compare' ? 'text-orange-500 lg:bg-gray-800' : 'text-gray-400 hover:text-orange-400 hover:bg-gray-700'} lg:px-3 py-2 rounded transition`}>
            <span className="text-xl lg:text-lg lg:mr-3"><MdOutlineCompare /></span>
            <span className='hidden lg:block'>Compare</span>
          </div>
          <div
            onClick={() => { router.push("/aboutus") }}
            className={`flex hover:cursor-pointer items-center lg:justify-normal justify-center text-base ${pathname === '/aboutus' ? 'text-orange-500 lg:bg-gray-800' : 'text-gray-400 hover:text-orange-400 hover:bg-gray-700'} lg:px-3 py-2 rounded transition`}>
            <span className="text-xl lg:text-lg lg:mr-3"><FaInfoCircle /></span>
            <span className='hidden lg:block'>About Us</span>
          </div>
          <div
            onClick={(e) => logout(e)}
            className={`flex hover:cursor-pointer items-center lg:justify-normal justify-center text-base text-gray-400 hover:text-orange-400 hover:bg-gray-700 lg:px-3 py-2 rounded transition`}>
            <span className="text-xl lg:text-lg lg:mr-3"><LuLogOut /></span>
            <span className='hidden lg:block'>Log Out</span>
          </div>
        </nav>
      </aside>

      <div className="flex sm:hidden fixed bottom-0 left-0 w-full z-[1000000] border-t-[1px] border-gray-500 bg-gray-900 justify-around items-center py-[13px] shadow-lg">
        <div onClick={() => { router.push("/dashboard") }} className={`flex hover:cursor-pointer flex-col items-center ${pathname === '/dashboard' ? 'text-orange-600' : 'text-white hover:text-orange-500'}   transition`}>
          <FaHome size={20} />
        </div>
        <div onClick={() => { router.push("/imagesearch") }} className={`flex hover:cursor-pointer flex-col items-center ${pathname === '/imagesearch' ? 'text-orange-600' : 'text-white hover:text-orange-500'}  transition`}>
          <MdImageSearch size={20} />
        </div>
        <div onClick={() => { router.push("/coupons") }} className={`flex hover:cursor-pointer flex-col items-center ${pathname === '/coupons' ? 'text-orange-600' : 'text-white hover:text-orange-500'}  transition`}>
          <RiDiscountPercentFill size={20} />
        </div>
        <div onClick={() => { router.push("/compare") }} className={`flex hover:cursor-pointer flex-col items-center ${pathname === '/compare' ? 'text-orange-600' : 'text-white hover:text-orange-500'}  transition`}>
          <MdOutlineCompare size={20} />
        </div>
        <div onClick={() => { router.push("/aboutus") }} className={`flex hover:cursor-pointer flex-col items-center ${pathname === '/aboutus' ? 'text-orange-600' : 'text-white hover:text-orange-500'}  transition`}>
          <FaInfoCircle size={20} />
        </div>
        <div onClick={(e) => logout(e)} className={`flex hover:cursor-pointer flex-col items-center text-white hover:text-orange-500 transition`}>
          <LuLogOut size={20} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
