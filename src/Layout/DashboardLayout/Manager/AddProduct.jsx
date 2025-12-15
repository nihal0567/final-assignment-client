import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [previewImages, setPreviewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const axiosSecure = useAxiosSecure()


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // ================= REMOVE IMAGE =================
  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  // ================= UPLOAD TO IMGBB =================
  const uploadImagesToImgBB = async (imageFiles) => {
    const uploadedImageUrls = [];

    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append('image', file);
      const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`;
      const res = await axios.post(img_API_URL, formData);
      uploadedImageUrls.push(res.data.data.url);
    }
    return uploadedImageUrls;
  };

  // FORM SUBMIT 
  const onSubmit = async (data) => {
  
    try {
      // 1️⃣ upload images
      const imageUrls = await uploadImagesToImgBB(imageFiles);

      // 2️⃣ prepare product data
      const productData = {
        productName: data.productName,
        productOption: data.productOption,
        productDesc: data.productDesc,
        productPrice: data.productPrice,
        productQuantity: data.productQuantity,
        minOrderQuantity: data.minOrderQuantity,
        paymentOption: data.paymentOption,
        videoURL: data.videoURL || '',
        showOnHome: data.showOnHome || false,
        productImages: imageUrls,
      };

      // 3️⃣ send to backend
      await axiosSecure.post('/add-products', productData);

      toast('Product added successfully!');

      // ✅ soft reset (layout stable)
      reset({
        productName: '',
        productOption: '',
        productDesc: '',
        productPrice: '',
        productQuantity: '',
        minOrderQuantity: '',
        paymentOption: '',
        videoURL: '',
        showOnHome: false,
      });

      setPreviewImages([]);
      setImageFiles([]);

    } catch (error) {
      console.error(error);
      toast('Something went wrong!');
    } finally {
      window.scrollTo({ top: scrollY, behavior: 'auto' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-center text-white mb-12">
          Add New <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Product</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-900/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT SIDE */}
            <div className="space-y-8">

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Product Name *</label>
                <input
                  {...register('productName', { required: true })}
                  type="text"
                  placeholder="Enter product name"
                  className="w-full px-6 py-4 bg-slate-800/60 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/30 transition"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                <select
                  {...register('productOption', { required: true })}
                  className="w-full px-6 py-4 bg-slate-800/60 border border-white/20 rounded-xl text-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/30 transition cursor-pointer"
                >
                  <option value="">Select category</option>
                  <option value="shirt">Shirt</option>
                  <option value="pant">Pant</option>
                  <option value="jacket">Jacket</option>
                  <option value="tshirt">T-Shirt</option>
                  <option value="hoodie">Hoodie</option>
                  <option value="accessories">Accessories</option>
                  <option value="kids">Kids Wear</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea
                  {...register('productDesc', { required: true })}
                  rows="6"
                  placeholder="Write detailed description..."
                  className="w-full px-6 py-4 bg-slate-800/60 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/30 transition resize-none"
                ></textarea>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-8">

              {/* Price / Qty / MOQ */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price (BDT) *</label>
                  <input
                    {...register('productPrice', { required: true, valueAsNumber: true })}
                    type="number"
                    placeholder="Price"
                    className="w-full px-5 py-4 bg-slate-800/60 border border-white/20 rounded-xl text-white focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Available Qty *</label>
                  <input
                    {...register('productQuantity', { required: true, valueAsNumber: true })}
                    type="number"
                    placeholder="Stock"
                    className="w-full px-5 py-4 bg-slate-800/60 border border-white/20 rounded-xl text-white focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">MOQ *</label>
                  <input
                    {...register('minOrderQuantity', { required: true, valueAsNumber: true })}
                    type="number"
                    placeholder="Min order"
                    className="w-full px-5 py-4 bg-slate-800/60 border border-white/20 rounded-xl text-white focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
              </div>

              {/* Payment Option */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Payment Option *</label>
                <select
                  {...register('paymentOption', { required: true })}
                  className="w-full px-6 py-4 bg-slate-800/60 border border-white/20 rounded-xl text-white focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/30 transition cursor-pointer"
                >
                  <option value="">Select payment method</option>
                  <option value="advance">PayFirst</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>

              {/* Demo Video Link */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Demo Video Link <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  {...register('videoURL')}
                  type="url"
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full px-6 py-4 bg-slate-800/60 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/30 transition"
                />
              </div>

              {/* Multiple Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Images * (Multiple)
                </label>
                <label className="block">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="px-8 py-12 border-4 border-dashed border-white/20 rounded-2xl text-center bg-slate-800/50 hover:border-amber-500/50 cursor-pointer transition">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 shadow-xl">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-white font-semibold">Click to upload images</p>
                    <p className="text-gray-400 text-sm mt-1">or drag and drop (PNG, JPG)</p>
                  </div>
                </label>

                {/* Image Previews */}
                {previewImages.length > 0 && (
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {previewImages.map((src, i) => (
                      <div key={i} className="relative group">
                        <img src={src} alt="preview" className="w-full h-32 object-cover rounded-xl shadow-lg" />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-red-600 text-white w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Show on Home */}
              <div className="flex items-center gap-3">
                <input
                  {...register('showOnHome')}
                  type="checkbox"
                  id="showHome"
                  className="w-5 h-5 rounded border-white/20 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="showHome" className="text-gray-300 cursor-pointer">
                  Show on Home Page
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-xl py-5 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Save Product
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;