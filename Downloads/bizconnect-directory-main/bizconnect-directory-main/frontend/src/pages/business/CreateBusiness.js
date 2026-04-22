import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, MapPin, Phone, Mail, Globe,
  Clock, Image as ImageIcon, Tag, DollarSign,
  Upload, X
} from 'lucide-react';
import api from '../../utils/api';
import { businessCategories } from '../../data/categories';

const CreateBusiness = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    category: '',
    subcategory: [],
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    website: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    services: [{ name: '', description: '', price: '' }],
    hours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' },
      saturday: { open: '10:00', close: '16:00' },
      sunday: { open: '', close: '' }
    }
  });
  const [images, setImages] = useState([]);
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const categories = [
    'Restaurant', 'Retail', 'Service', 'Health', 'Education', 'Entertainment', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (name.includes('address.')) {
      const [, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index][field] = value;
    setFormData(prev => ({ ...prev, services: updatedServices }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', description: '', price: '' }]
    }));
  };

  const removeService = (index) => {
    const updatedServices = formData.services.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, services: updatedServices }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    }
    
    if (step === 2) {
      if (!formData.address.street.trim()) newErrors['address.street'] = 'Street address is required';
      if (!formData.address.city.trim()) newErrors['address.city'] = 'City is required';
      if (!formData.address.state.trim()) newErrors['address.state'] = 'State is required';
      if (!formData.address.zipCode.trim()) newErrors['address.zipCode'] = 'ZIP code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    // 1. First, test if the form has data
    console.log("Form data to send:", formData);
    
    // 2. Create a SIMPLE object with only essential fields
    const simpleData = {
      businessName: formData.businessName || "Test Business",
      description: formData.description || "Test Description",
      category: formData.category || "Service",
      email: formData.email || "test@example.com", 
      phone: formData.phone || "1234567890",
      address: {
        street: formData.address.street || "123 Test St",
        city: formData.address.city || "Test City",
        state: formData.address.state || "TS",
        zipCode: formData.address.zipCode || "12345"
      }
    };
    
    console.log("Sending:", simpleData);
    
    // 3. Use fetch instead of axios - SIMPLE
    const token = localStorage.getItem('token') || "test-token";
    
    const response = await fetch('http://localhost:5000/api/businesses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(simpleData)
    });
    
    // 4. Get the response text first to see what's happening
    const responseText = await response.text();
    console.log("Raw response:", responseText);
    
    // 5. Try to parse as JSON
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { message: responseText };
    }
    
    // 6. Check if successful
    if (response.ok) {
      alert("✅ Business created successfully!");
      navigate('/businesses');
    } else {
      console.error("Backend error:", result);
      alert(`❌ Error: ${result.message || result.error || 'Unknown error'}`);
    }
    
  } catch (error) {
    console.error("Network error:", error);
    alert("Network error: " + error.message);
  } finally {
    setLoading(false);
  }
};
const testBackendExpectations = async () => {
  try {
    const token = localStorage.getItem('token');
    
    // Test 1: Send as JSON (no FormData)
    const jsonData = {
      businessName: 'Test JSON Business',
      description: 'Test description',
      category: 'Service',
      email: 'test@example.com',
      phone: '1234567890',
      address: {
        street: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345'
      }
    };
    
    console.log('🧪 Testing JSON POST...');
    const response1 = await api.post('/businesses', jsonData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ JSON test successful:', response1.data);
    
  } catch (error) {
    console.error('❌ JSON test failed:', error.response?.data || error.message);
  }
};
    // Debug function to test API
  const testBusinessCreation = async () => {
    try {
      console.log('🧪 Testing business creation...');
      
      // Test with mock data
      const mockBusiness = {
        businessName: 'Test Business ' + Date.now(),
        description: 'This is a test business',
        category: 'Service',
        email: 'test@example.com',
        phone: '+1 (555) 123-4567',
        address: {
          street: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zipCode: '12345',
          country: 'USA'
        },
        services: [{ name: 'Test Service', description: 'Test description', price: '50' }],
        hours: formData.hours
      };
      
      const response = await api.post('/businesses', mockBusiness);
      console.log('✅ Test business created:', response.data);
      alert('Test business created successfully!');
      
      // Refresh business list
      navigate('/businesses');
      
    } catch (error) {
      console.error('❌ Test failed:', error);
      alert(`Test failed: ${error.message}`);
    }
    const testSimpleConnection = async () => {
  console.log("Testing connection...");
  
  const testData = {
    test: "Hello",
    businessName: "My Business"
  };
  
  try {
    const response = await fetch('http://localhost:5000/api/test/create-business', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    console.log("✅ Test successful:", result);
    alert("Connection works! Backend received: " + JSON.stringify(result.received));
  } catch (error) {
    console.error("❌ Test failed:", error);
    alert("Test failed: " + error.message);
  }
};
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {['Basic Info', 'Location', 'Services', 'Media & Hours'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  index + 1 === currentStep
                    ? 'bg-blue-600 text-white'
                    : index + 1 < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">Step {index + 1}</p>
                  <p className="text-xs text-gray-600">{step}</p>
                </div>
                {index < 3 && (
                  <div className={`w-16 h-1 mx-4 ${
                    index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Business Listing</h1>
            <p className="text-gray-600">
              Step {currentStep} of 4: {currentStep === 1 ? 'Basic Information' : 
              currentStep === 2 ? 'Location Details' :
              currentStep === 3 ? 'Services & Pricing' : 'Media & Business Hours'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.businessName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your business name"
                    />
                  </div>
                  {errors.businessName && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe your business, services, and what makes you unique"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="mb-6">
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Category *
               </label>
            <select
               name="category"
              value={formData.category}
               onChange={handleChange}
               className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
               errors.category ? 'border-red-500' : 'border-gray-300'
               }`}
             required
                 >
    <option value="">Select a category</option>
    {businessCategories.map(cat => (
      <option key={cat.id} value={cat.name}>
                      {cat.icon} {cat.name}
                       </option>
                       ))}
                      </select>
                      {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                      )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategories
                    </label>
                    <input
                      type="text"
                      name="subcategory"
                      value={formData.subcategory.join(', ')}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        subcategory: e.target.value.split(',').map(s => s.trim())
                      }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Coffee Shop, Bakery, Cafe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="business@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors['address.street'] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123 Main Street"
                    />
                  </div>
                  {errors['address.street'] && (
                    <p className="mt-1 text-sm text-red-600">{errors['address.street']}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors['address.city'] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="New York"
                    />
                    {errors['address.city'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['address.city']}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors['address.state'] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="NY"
                    />
                    {errors['address.state'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['address.state']}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors['address.zipCode'] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="10001"
                    />
                    {errors['address.zipCode'] && (
                      <p className="mt-1 text-sm text-red-600">{errors['address.zipCode']}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Media Links
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-blue-600 font-bold">f</div>
                      <input
                        type="url"
                        value={formData.socialMedia.facebook}
                        onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Facebook URL"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-blue-400 font-bold">X</div>
                      <input
                        type="url"
                        value={formData.socialMedia.twitter}
                        onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Twitter URL"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-pink-600 font-bold">IG</div>
                      <input
                        type="url"
                        value={formData.socialMedia.instagram}
                        onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Instagram URL"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-blue-700 font-bold">in</div>
                      <input
                        type="url"
                        value={formData.socialMedia.linkedin}
                        onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="LinkedIn URL"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Services */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">Services & Pricing</h3>
                  <button
                    type="button"
                    onClick={addService}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <Tag size={18} className="mr-2" />
                    Add Service
                  </button>
                </div>

                {formData.services.map((service, index) => (
                  <div key={index} className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold">Service {index + 1}</h4>
                      {formData.services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Name
                        </label>
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Web Development"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={service.description}
                          onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Describe this service"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price (Optional)
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
                          <input
                            type="number"
                            value={service.price}
                            onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 4: Media & Hours */}
            {currentStep === 4 && (
              <div className="space-y-6">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Logo
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                      {logo ? (
                        <div className="relative">
                          <img
                            src={logo.preview}
                            alt="Logo preview"
                            className="w-28 h-28 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => setLogo(null)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto text-gray-400 mb-2" />
                          <p className="text-xs text-gray-500">Upload Logo</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Upload your business logo. Recommended size: 400x400px.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Images Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Images
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.preview}
                          alt={`Preview ${index}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    
                    <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">
                      <ImageIcon className="text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Add Photo</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Upload up to 10 images of your business. Recommended size: 1200x800px.
                  </p>
                </div>

                {/* Business Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Business Hours
                  </label>
                  <div className="space-y-3">
                    {Object.entries(formData.hours).map(([day, hours]) => (
                      <div key={day} className="flex items-center">
                        <div className="w-32">
                          <span className="font-medium capitalize">{day}</span>
                        </div>
                        <div className="flex-1 flex items-center space-x-2">
                          <Clock size={16} className="text-gray-400" />
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) => {
                              const newHours = { ...formData.hours };
                              newHours[day].open = e.target.value;
                              setFormData(prev => ({ ...prev, hours: newHours }));
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
  
                          <span>to</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) => {
                              const newHours = { ...formData.hours };
                              newHours[day].close = e.target.value;
                              setFormData(prev => ({ ...prev, hours: newHours }));
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newHours = { ...formData.hours };
                              newHours[day] = { open: '', close: '' };
                              setFormData(prev => ({ ...prev, hours: newHours }));
                            }}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Closed
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  ← Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Creating Listing...
                    </div>
                  ) : (
                    'Create Business Listing'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBusiness;