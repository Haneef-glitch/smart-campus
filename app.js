import React, { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Book, Star, Plus, Trash2, Edit, Save, X, LogIn, LogOut, Globe, Image, Eye } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Helper function to generate a unique ID for new items
const generateId = () => uuidv4();

// Mock data to simulate fetching from a backend database
// Note: latitude and longitude are replaced with a single mapLink
const initialData = [
  {
    id: 'c1',
    name: 'Tech University',
    type: 'college',
    location: 'Bengaluru',
    fees: [
      { course: 'Computer Science', feeAmount: 150000 },
      { course: 'Mechanical Engineering', feeAmount: 120000 },
      { course: 'Electronics', feeAmount: 135000 }
    ],
    images: [
      'https://placehold.co/800x600/E0E7FF/4F46E5?text=TechU+Campus+1',
      'https://placehold.co/800x600/E0E7FF/4F46E5?text=TechU+Library',
      'https://placehold.co/800x600/E0E7FF/4F46E5?text=TechU+Lab'
    ],
    description: 'A leading institution for technology and engineering.',
    rating: 4.5,
    logoUrl: 'https://placehold.co/150x150/E0E7FF/4F46E5?text=TechU',
    mapLink: 'https://maps.app.goo.gl/yFqGf8E123ABCDEF', // New map link field
    reviews: [
      { id: 'r1', text: 'Great faculty and infrastructure!', user: 'Alice', rating: 5 },
      { id: 'r2', text: 'Excellent placement opportunities.', user: 'Bob', rating: 4 },
      { id: 'r6', text: 'The campus life is amazing.', user: 'Student X', rating: 5 },
    ],
    websiteUrl: 'https://www.techu.edu',
  },
  {
    id: 'c2',
    name: 'Art & Design College',
    type: 'college',
    location: 'Mumbai',
    fees: [
      { course: 'Fine Arts', feeAmount: 80000 },
      { course: 'Fashion Design', feeAmount: 100000 }
    ],
    images: [
      'https://placehold.co/800x600/FBE8FF/8B5CF6?text=ADC+Studio',
      'https://placehold.co/800x600/FBE8FF/8B5CF6?text=ADC+Gallery'
    ],
    description: 'Specialized in creative arts and design programs.',
    rating: 4.2,
    logoUrl: 'https://placehold.co/150x150/FBE8FF/8B5CF6?text=ADC',
    mapLink: 'https://maps.app.goo.gl/zGf8E123ABCDEF4',
    reviews: [
      { id: 'r3', text: 'The campus is beautiful and inspiring.', user: 'Charlie', rating: 5 },
    ],
    websiteUrl: 'https://www.adc.ac.in',
  },
  {
    id: 'h1',
    name: 'Green View Hostel',
    type: 'hostel',
    location: 'Bengaluru',
    fees: 50000,
    images: [
      'https://placehold.co/800x600/D1FAE5/065F46?text=Hostel+Room',
      'https://placehold.co/800x600/D1FAE5/065F46?text=Hostel+Mess'
    ],
    description: 'Affordable and well-maintained hostel with good amenities.',
    rating: 3.8,
    logoUrl: 'https://placehold.co/150x150/D1FAE5/065F46?text=GVH',
    mapLink: 'https://maps.app.goo.gl/yFqGf8E123ABCDEF',
    reviews: [
      { id: 'r4', text: 'Good food, but rooms are a bit small.', user: 'David', rating: 3 },
      { id: 'r7', text: 'A great place to stay for students on a budget.', user: 'Student Y', rating: 4 },
    ],
    websiteUrl: 'https://www.greenviewhostel.com',
  },
  {
    id: 'c3',
    name: 'National School of Business',
    type: 'college',
    location: 'Delhi',
    fees: [
      { course: 'Business Administration', feeAmount: 250000 },
      { course: 'Marketing', feeAmount: 220000 }
    ],
    images: [
      'https://placehold.co/800x600/FFEFD5/F59E0B?text=NSB+Auditorium'
    ],
    description: 'Top-tier business school with a focus on practical skills.',
    rating: 4.8,
    logoUrl: 'https://placehold.co/150x150/FFEFD5/F59E0B?text=NSB',
    mapLink: 'https://maps.app.goo.gl/d7E123ABCDEF8G',
    reviews: [],
    websiteUrl: 'https://www.nsb.ac.in',
  },
  {
    id: 'h2',
    name: 'Urban Living Hostel',
    type: 'hostel',
    location: 'Mumbai',
    fees: 75000,
    images: [
      'https://placehold.co/800x600/C1D8FF/1D4ED8?text=ULH+Lobby'
    ],
    description: 'Modern hostel located near major colleges.',
    rating: 4.1,
    logoUrl: 'https://placehold.co/150x150/C1D8FF/1D4ED8?text=ULH',
    mapLink: 'https://maps.app.goo.gl/zGf8E123ABCDEF4',
    reviews: [
      { id: 'r5', text: 'Clean and safe environment.', user: 'Eva', rating: 4 },
      { id: 'r8', text: 'A bit expensive for the services provided.', user: 'Frank', rating: 3 },
    ],
    websiteUrl: 'https://www.urbanliving.co.in',
  },
  {
    id: 'c4',
    name: 'Science Institute',
    type: 'college',
    location: 'Hyderabad',
    fees: [
      { course: 'Biotechnology', feeAmount: 120000 },
      { course: 'Chemistry', feeAmount: 110000 }
    ],
    images: [
      'https://placehold.co/800x600/F0F9FF/0284C7?text=SI+Lab',
      'https://placehold.co/800x600/F0F9FF/0284C7?text=SI+Building'
    ],
    description: 'Research-focused institute with advanced labs.',
    rating: 4.6,
    logoUrl: 'https://placehold.co/150x150/F0F9FF/0284C7?text=SI',
    mapLink: 'https://maps.app.goo.gl/kL8E123ABCDEF9M',
    reviews: [
      { id: 'r9', text: 'Excellent research facilities and helpful staff.', user: 'Grace', rating: 5 },
      { id: 'r10', text: 'The curriculum is very challenging but rewarding.', user: 'Heidi', rating: 4 },
    ],
    websiteUrl: 'https://www.scienceinstitute.edu',
  },
];

// Main App Component
export default function App() {
  // Authentication states
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Main application states
  const [items, setItems] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: 'All',
    fees: 'All',
    type: 'All',
  });
  const [filteredItems, setFilteredItems] = useState(items);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showImageGalleryModal, setShowImageGalleryModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  // Admin Panel states
  const [formState, setFormState] = useState({
    id: '',
    name: '',
    type: 'college',
    location: '',
    fees: [],
    singleFee: '',
    images: [],
    description: '',
    rating: 0,
    logoUrl: '',
    mapLink: '', // Updated to a single map link
    reviews: [],
    websiteUrl: '',
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);


  // A list of unique options for filters, extracted from mock data
  const locations = ['All', ...new Set(items.map(item => item.location))];
  const feeRanges = [
    { label: 'All', value: 'All' },
    { label: 'Under ₹50k', value: '50000' },
    { label: '₹50k - ₹1.5L', value: '150000' },
    { label: 'Above ₹1.5L', value: '250000' },
  ];

  // Effect to handle filtering and searching
  useEffect(() => {
    let tempItems = items.filter(item => {
      // Search by name and description
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by type (college or hostel)
      const matchesType = filters.type === 'All' || item.type === filters.type;

      // Filter by location
      const matchesLocation = filters.location === 'All' || item.location === filters.location;

      // Filter by fees - now supports multiple courses
      const matchesFees = filters.fees === 'All' || (() => {
        const feeValue = parseInt(filters.fees);
        if (item.type === 'college') {
          return item.fees.some(fee => {
            if (feeValue === 50000) return fee.feeAmount <= 50000;
            if (feeValue === 150000) return fee.feeAmount > 50000 && fee.feeAmount <= 150000;
            if (feeValue === 250000) return fee.feeAmount > 150000;
            return false;
          });
        } else { // Hostel
          if (feeValue === 50000) return item.fees <= 50000;
          if (feeValue === 150000) return item.fees > 50000 && item.fees <= 150000;
          if (feeValue === 250000) return item.fees > 150000;
          return false;
        }
      })();

      return matchesSearch && matchesLocation && matchesFees && matchesType;
    });

    setFilteredItems(tempItems);
  }, [searchTerm, filters, items]);

  // Handler for filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handler to open the review submission modal
  const handleOpenReviewModal = (item) => {
    setSelectedItem(item);
    setShowReviewModal(true);
  };
  
  // Handler to open the image gallery modal
  const handleOpenImageGallery = (item) => {
    setSelectedImages(item.images);
    setShowImageGalleryModal(true);
  };

  // Handler to open the review viewing modal
  const handleViewReviews = (item) => {
    setSelectedItem(item);
    setShowReviewsModal(true);
  };

  // Handler to submit a new review
  const handleAddReview = () => {
    if (!selectedItem || !newReviewText) return;

    // This block simulates the update without a backend
    const updatedItems = items.map(item => {
      if (item.id === selectedItem.id) {
        const newReview = {
          id: generateId(),
          text: newReviewText,
          user: 'Anonymous User',
          rating: newReviewRating,
        };
        const updatedReviews = [...item.reviews, newReview];
        const newRating = (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1);
        return {
          ...item,
          reviews: updatedReviews,
          rating: parseFloat(newRating),
        };
      }
      return item;
    });

    setItems(updatedItems);
    
    // Clear form and close modal
    setNewReviewText('');
    setNewReviewRating(5);
    setShowReviewModal(false);
  };

  // AUTHENTICATION LOGIC
  const handleAdminLogin = (e) => {
    e.preventDefault();
    const adminUsername = 'haneef';
    const adminPassword = 'hH9,haneef';

    if (loginUsername === adminUsername && loginPassword === adminPassword) {
      setIsAdminAuthenticated(true);
      setShowLoginModal(false);
      setLoginError('');
      setLoginUsername('');
      setLoginPassword('');
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  // ADMIN PANEL LOGIC

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      // Clear fees and images when switching type
      setFormState(prev => ({
        ...prev,
        [name]: value,
        fees: [],
        singleFee: '',
        images: [],
      }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCourseFeeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFees = formState.fees.map((fee, i) =>
      i === index ? { ...fee, [name]: name === 'feeAmount' ? parseInt(value) || '' : value } : fee
    );
    setFormState(prev => ({ ...prev, fees: updatedFees }));
  };

  const addCourseFeePair = () => {
    setFormState(prev => ({
      ...prev,
      fees: [...prev.fees, { course: '', feeAmount: '' }]
    }));
  };
  
  const removeCourseFeePair = (index) => {
    const updatedFees = formState.fees.filter((_, i) => i !== index);
    setFormState(prev => ({ ...prev, fees: updatedFees }));
  };

  const handleImageChange = (index, e) => {
    const { value } = e.target;
    const updatedImages = formState.images.map((url, i) =>
      i === index ? value : url
    );
    setFormState(prev => ({ ...prev, images: updatedImages }));
  };

  const addImageField = () => {
    setFormState(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index) => {
    const updatedImages = formState.images.filter((_, i) => i !== index);
    setFormState(prev => ({ ...prev, images: updatedImages }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      ...formState,
      id: generateId(),
      fees: formState.type === 'college' ? formState.fees : parseInt(formState.singleFee),
      images: formState.images.filter(url => url), // Filter out empty URLs
      rating: 0,
      reviews: [],
    };
    setItems(prev => [...prev, newItem]);
    resetForm();
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    const fees = item.type === 'college' ? item.fees : item.fees.toString();
    setFormState({ 
      ...item, 
      fees: item.type === 'college' ? item.fees : [],
      singleFee: item.type === 'hostel' ? item.fees.toString() : '',
      images: item.images,
      mapLink: item.mapLink // Set the map link for editing
    });
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    const updatedItems = items.map(item =>
      item.id === editingItemId ? {
        ...formState,
        fees: formState.type === 'college' ? formState.fees : parseInt(formState.singleFee),
        images: formState.images.filter(url => url),
      } : item
    );
    setItems(updatedItems);
    resetForm();
    setEditingItemId(null);
  };

  const confirmDeleteItem = (itemId) => {
    setItemToDeleteId(itemId);
    setShowDeleteConfirmModal(true);
  };

  const handleDeleteItem = () => {
    if (itemToDeleteId) {
      const updatedItems = items.filter(item => item.id !== itemToDeleteId);
      setItems(updatedItems);
      setShowDeleteConfirmModal(false);
      setItemToDeleteId(null);
    }
  };

  const resetForm = () => {
    setFormState({
      id: '',
      name: '',
      type: 'college',
      location: '',
      fees: [],
      singleFee: '',
      images: [],
      description: '',
      rating: 0,
      logoUrl: '',
      mapLink: '', // Reset the map link field
      reviews: [],
      websiteUrl: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-8">
      {/* Header */}
      <header className="bg-white rounded-xl shadow-lg p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-indigo-700">Smart Campus Finder</h1>
          <p className="text-gray-500 mt-1">Find your perfect college or hostel</p>
        </div>
        <div className="text-center mt-4 sm:mt-0">
          {isAdminAuthenticated ? (
            <button
              onClick={handleAdminLogout}
              className="px-4 py-2 text-white bg-red-500 rounded-full flex items-center space-x-2 hover:bg-red-600 transition duration-300"
            >
              <LogOut className="w-4 h-4" /><span>Logout</span>
            </button>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 text-white bg-indigo-500 rounded-full flex items-center space-x-2 hover:bg-indigo-600 transition duration-300"
            >
              <LogIn className="w-4 h-4" /><span>Admin Login</span>
            </button>
          )}
        </div>
      </header>

      {/* Conditional Rendering for Student vs Admin View */}
      {isAdminAuthenticated ? (
        // Admin Panel
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h2>
          
          {/* Add/Edit Item Form */}
          <form onSubmit={editingItemId ? handleUpdateItem : handleAddItem} className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">{editingItemId ? 'Edit Item' : 'Add New Item'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700">Type</label>
                <select
                  name="type"
                  value={formState.type}
                  onChange={handleFormChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                >
                  <option value="college">College</option>
                  <option value="hostel">Hostel</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleFormChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Tech University"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={handleFormChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Bengaluru"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Logo URL</label>
                <input
                  type="url"
                  name="logoUrl"
                  value={formState.logoUrl}
                  onChange={handleFormChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="https://example.com/logo.png"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Website URL</label>
                <input
                  type="url"
                  name="websiteUrl"
                  value={formState.websiteUrl}
                  onChange={handleFormChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="https://example.com"
                  required
                />
              </div>
              {/* New Map Link field */}
              <div>
                <label className="block text-gray-700">Map Link (URL)</label>
                <input
                  type="url"
                  name="mapLink"
                  value={formState.mapLink}
                  onChange={handleFormChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., https://maps.app.goo.gl/..."
                  required
                />
              </div>
              <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleFormChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg resize-none"
                  rows="2"
                  placeholder="A brief description of the institution."
                  required
                ></textarea>
              </div>
              
              {/* Conditional Fee Input based on Type */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-4">
                {formState.type === 'college' ? (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-gray-700 font-medium">Course Fees</label>
                      <button type="button" onClick={addCourseFeePair} className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300">
                        Add Course
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formState.fees.map((fee, index) => (
                        <div key={index} className="flex space-x-2 items-center">
                          <input
                            type="text"
                            name="course"
                            value={fee.course}
                            onChange={(e) => handleCourseFeeChange(index, e)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg"
                            placeholder="Course Name"
                            required
                          />
                          <input
                            type="number"
                            name="feeAmount"
                            value={fee.feeAmount}
                            onChange={(e) => handleCourseFeeChange(index, e)}
                            className="w-24 p-2 border border-gray-300 rounded-lg"
                            placeholder="Fee"
                            required
                          />
                          <button type="button" onClick={() => removeCourseFeePair(index)} className="text-red-500 p-2 hover:bg-red-100 rounded-full">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-gray-700">Hostel Fee (₹)</label>
                    <input
                      type="number"
                      name="singleFee"
                      value={formState.singleFee}
                      onChange={handleFormChange}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                      placeholder="e.g., 50000"
                      required
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 font-medium">Campus Images</label>
                <button type="button" onClick={addImageField} className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300">
                  Add Image URL
                </button>
              </div>
              <div className="space-y-2">
                {formState.images.map((image, index) => (
                  <div key={index} className="flex space-x-2 items-center">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg"
                      placeholder="Image URL"
                      required
                    />
                    <button type="button" onClick={() => removeImageField(index)} className="text-red-500 p-2 hover:bg-red-100 rounded-full">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white rounded-full flex items-center space-x-2 hover:bg-indigo-600 transition duration-300"
              >
                {editingItemId ? <><Save className="w-4 h-4"/><span>Update Item</span></> : <><Plus className="w-4 h-4"/><span>Add Item</span></>}
              </button>
              {editingItemId && (
                <button
                  type="button"
                  onClick={() => { setEditingItemId(null); resetForm(); }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full flex items-center space-x-2 hover:bg-gray-300 transition duration-300"
                >
                  <X className="w-4 h-4" /><span>Cancel Edit</span>
                </button>
              )}
            </div>
          </form>

          {/* List of Items */}
          <h3 className="text-xl font-semibold mb-4">Current Listings</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 text-sm font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{item.name}</td>
                    <td className="py-3 px-4 text-gray-800">{item.type}</td>
                    <td className="py-3 px-4 text-gray-800">{item.location}</td>
                    <td className="py-3 px-4 flex space-x-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="p-2 text-indigo-500 rounded-full hover:bg-indigo-100"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => confirmDeleteItem(item.id)}
                        className="p-2 text-red-500 rounded-full hover:bg-red-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      ) : (
        // Student Dashboard (original content)
        <>
          {/* Search and Filter System */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-2 mb-4">
              <Search className="text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges or hostels..."
                className="flex-1 outline-none text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="text-gray-600 block mb-1">Location</label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
                >
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Fees</label>
                <select
                  name="fees"
                  value={filters.fees}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
                >
                  {feeRanges.map(range => <option key={range.value} value={range.value}>{range.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-600 block mb-1">Type</label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
                >
                  <option value="All">All</option>
                  <option value="college">College</option>
                  <option value="hostel">Hostel</option>
                </select>
              </div>
            </div>
          </div>

          {/* Student Dashboard - Display Results */}
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg flex flex-col">
                  {/* Item Logo and Image Display */}
                  <div className="relative p-6 pb-0 flex flex-col items-center">
                    <div className="w-24 h-24 absolute -top-12 bg-white rounded-full p-1 shadow-md">
                      <img
                        src={item.logoUrl}
                        alt={`${item.name} logo`}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => { e.target.src = 'https://placehold.co/150x150/E0E7FF/4F46E5?text=Logo'; }}
                      />
                    </div>
                    <img
                      src={item.images[0] || item.logoUrl}
                      alt={`${item.name} campus photo`}
                      className="w-full h-48 rounded-lg mb-4 mt-12 object-cover"
                      onError={(e) => { e.target.src = 'https://placehold.co/800x600/E0E7FF/4F46E5?text=Campus+Photo'; }}
                    />
                    {item.images && item.images.length > 1 && (
                      <button
                        onClick={() => handleOpenImageGallery(item)}
                        className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-full flex items-center space-x-1 hover:bg-indigo-600 transition duration-300"
                      >
                        <Image className="w-4 h-4" />
                        <span>View Photos ({item.images.length})</span>
                      </button>
                    )}
                  </div>
                  <div className="p-6 pt-0 flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 text-center">{item.description}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-indigo-500 mr-2" />
                        <span className="font-medium">Location:</span> {item.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-indigo-500 mr-2" />
                        <span className="font-medium">Fees:</span>
                        {item.type === 'college' ? (
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            {item.fees.map((fee, index) => (
                              <li key={index} className="flex items-center space-x-1">
                                <span>{fee.course}:</span>
                                <span>₹{fee.feeAmount.toLocaleString()}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span>₹{item.fees.toLocaleString()}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-2" fill="currentColor" />
                        <span className="font-medium">Rating:</span> {item.rating || 'No ratings yet'} ({item.reviews.length} reviews)
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between p-6 pt-0 space-x-2">
                    {item.websiteUrl && (
                      <a
                        href={item.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center space-x-2 bg-gray-200 text-gray-800 rounded-full py-2 px-4 hover:bg-gray-300 transition duration-300"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Visit Website</span>
                      </a>
                    )}
                    {item.reviews.length > 0 && (
                      <button
                        onClick={() => handleViewReviews(item)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 transition duration-300"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Reviews</span>
                      </button>
                    )}
                    {/* New button to view map link */}
                    {item.mapLink && (
                        <a
                            href={item.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center space-x-2 bg-teal-500 text-white rounded-full py-2 px-4 hover:bg-teal-600 transition duration-300"
                        >
                            <MapPin className="w-4 h-4" />
                            <span>View on Map</span>
                        </a>
                    )}
                    <button
                      onClick={() => handleOpenReviewModal(item)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-indigo-500 text-white rounded-full py-2 px-4 hover:bg-indigo-600 transition duration-300"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Review</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500 p-8">
                No results found. Try adjusting your search or filters.
              </div>
            )}
          </main>
        </>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-bold">Admin Login</h4>
              <button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-bold">Add a Review for {selectedItem?.name}</h4>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setNewReviewRating(star)}
                    className="text-2xl"
                  >
                    <Star
                      className={`w-6 h-6 ${newReviewRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="reviewText" className="block text-gray-700 mb-2">Your Review</label>
              <textarea
                id="reviewText"
                rows="4"
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                placeholder="Share your experience..."
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddReview}
                className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Review Viewing Modal */}
      {showReviewsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-bold">Reviews for {selectedItem?.name}</h4>
              <button onClick={() => setShowReviewsModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            {selectedItem?.reviews.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedItem.reviews.map(review => (
                  <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="font-semibold text-gray-800">{review.user}</span>
                      <div className="flex ml-4">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${review.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No reviews found for this institution yet.</p>
            )}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowReviewsModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Image Gallery Modal */}
      {showImageGalleryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-bold">Image Gallery</h4>
              <button onClick={() => setShowImageGalleryModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto">
              {selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Campus view ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => { e.target.src = 'https://placehold.co/800x600/E0E7FF/4F46E5?text=Photo+Error'; }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h4 className="text-xl font-bold mb-4">Confirm Deletion</h4>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteItem}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
