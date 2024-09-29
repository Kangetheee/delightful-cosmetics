import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { getTotalCartAmount, cartItems, all_products } = useContext(ShopContext);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);  // Manage discount state
  const navigate = useNavigate();

  // Handle coupon submission
  const handleCouponSubmit = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(10);  // Example discount of 10
    } else {
      alert('Invalid coupon code');
    }
  };

  // Total after applying coupon discount
  const getDiscountedTotal = () => {
    const totalAmount = getTotalCartAmount();
    return totalAmount - (totalAmount * discount / 100);
  };

  return (
    <section className='max-padd-container py-28 xl:py-32'>
      <form className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
        {/* Delivery Information */}
        <div className='flex flex-1 flex-col gap-3 text-[95%]'>
          <h3 className='bold-28 mb-4'>Delivery Information</h3>
          <div className='flex gap-3'>
            <input type="text" placeholder='First Name' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' required />
            <input type="text" placeholder='Last Name' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' required />
          </div>
          <input type="email" placeholder='Your Email' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' required />
          <input type="text" placeholder='Phone Number' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' required />
          <input type="text" placeholder='Street' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' />
          <div className='flex gap-3'>
            <input type="text" placeholder='City' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' />
            <input type="text" placeholder='County' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' />
          </div>
          <div className='flex gap-3'>
            <input type="text" placeholder='Zip code' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' />
            <input type="text" placeholder='Country' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' />
          </div>
        </div>
      </form>

      {/* Card Details */}
      <div className='flex flex-col xl:flex-row gap-20 mt-20'>
        <div className='flex flex-1 flex-col gap-2'>
          <h4 className='bold-22'>Summary</h4>
          <div>
            <div className='flexBetween py-3'>
              <h4 className='medium-16'>SubTotal:</h4>
              <h4 className='text-gray-30 font-semibold'>${getTotalCartAmount()}</h4>
            </div>
            <hr />
            <div className='flexBetween py-3'>
              <h4 className='medium-16'>Shipping Fee</h4>
              <h4 className='text-gray-30 font-semibold'>${2}</h4> {/* Replace with actual shipping fee */}
            </div>
            <hr />
            <div className='flexBetween py-3'>
              <h4 className='medium-18'>Total: </h4>
              <h4 className='text-gray-30 font-semibold'>${getDiscountedTotal() + 2}</h4>
            </div>
          </div>
          <button onClick={() => navigate('/order')} className='btn-secondary w-52 rounded'>
            Proceed to Checkout
          </button>
        </div>

        {/* Coupon Code */}
        <div className='flex flex-1 flex-col gap-8'>
          <h4 className='bold-28 capitalize'>Your Coupon code enter here:</h4>
          <div className='flexBetween h-2.8[rem] bg-white text-center ring-1 ring-slate-900/10 w-full max-w-[488px] rounded'>
            <input
              type='text'
              placeholder='Coupon Code'
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className='pl-3 bg-transparent border-none outline-none'
            />
            <button onClick={handleCouponSubmit} className='btn-dark rounded relative !px-10 !py-3'>
              Submit
            </button>
          </div>
          {discount > 0 && (
            <p className='text-green-500'>
              Coupon applied! {discount}% discount on your total.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Orders;
