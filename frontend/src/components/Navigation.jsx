import React, { useState, useEffect } from 'react';
import {
  MapPin, Clock, Search, User, Menu, X, ChevronRight, Star,
  TrendingUp, Download, CreditCard, Check, Filter, LogOut, Settings, Upload
} from 'lucide-react';
import { authAPI } from '../services/api';
import logo from '../assets/logo-removebg-preview.png';

const Navigation = ({ currentView, setCurrentView, userRole, setUserRole, showMobileMenu, setShowMobileMenu }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // ✅ Sync user info when userRole or token changes
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const data = await authAPI.getMe();
        setName(data.user.name);
        setEmail(data.user.email);
        setProfileImage(data.user.profileImage || '');
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, [userRole]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setUserRole(null);
    setCurrentView('home');
    setShowUserMenu(false);
  };

  // ✅ Update profile (name/email)
  const handleUpdateProfile = async () => {
    try {
      const data = await authAPI.updateProfile({ name, email });
      alert('Profile updated successfully!');
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userEmail', data.user.email);
      setShowSettings(false);
    } catch (err) {
      alert('Error updating profile');
    }
  };

  // ✅ Change password
  const handleChangePassword = async () => {
    try {
      await authAPI.changePassword({ currentPassword, newPassword });
      alert('Password updated successfully!');
      setShowPasswordFields(false);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      alert('Error updating password');
    }
  };

  // ✅ Handle profile image upload
  const handleUploadImage = async () => {
    if (!selectedFile) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      const data = await authAPI.uploadProfileImage(formData);
      setProfileImage(data.profileImage);
      alert('Profile image updated successfully!');
      setSelectedFile(null);
    } catch (err) {
      alert('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-md shadow-2xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* ===== Logo ===== */}
            <div
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setCurrentView('home')}
            >
              <img src={logo} alt="Eventure Logo" className="h-10 w-auto" />
              <span className="text-2xl font-bold text-gradient">Eventure</span>
            </div>

            {/* ===== Desktop Menu ===== */}
            <div className="hidden lg:flex items-center gap-8">
              {userRole !== 'admin' && (
                <>
                  <button
                    onClick={() => setCurrentView('home')}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                      currentView === 'home'
                        ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
                        : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
                    }`}
                  >
                    Home
                  </button>

                  <button
                    onClick={() => setCurrentView('events')}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                      currentView === 'events'
                        ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
                        : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
                    }`}
                  >
                    Events
                  </button>

                  <button
                    onClick={() => setCurrentView('about')}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                      currentView === 'about'
                        ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
                        : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
                    }`}
                  >
                    About
                  </button>

                  <button
                    onClick={() => setCurrentView('contact')}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                      currentView === 'contact'
                        ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
                        : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
                    }`}
                  >
                    Contact
                  </button>

                  {userRole === 'user' && (
                    <button
                      onClick={() => setCurrentView('dashboard')}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                        currentView === 'dashboard'
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
                          : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
                      }`}
                    >
                      My Bookings
                    </button>
                  )}
                </>
              )}

              {userRole === 'admin' && (
                <button
                  onClick={() => setCurrentView('admin')}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                    currentView === 'admin'
                      ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
                  }`}
                >
                  Admin
                </button>
              )}

              {/* ===== Login / User Menu ===== */}
              {!userRole ? (
                <button
                  onClick={() => setCurrentView('login')}
                  className="btn-primary text-sm font-semibold shadow-lg hover:shadow-xl"
                >
                  Login
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-gray-300 hover:text-white"
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
                      />
                    ) : (
                      <User size={22} />
                    )}
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-4 w-56 z-50">
                      <p className="text-gray-100 font-semibold text-base">{name || 'User'}</p>
                      <p className="text-gray-400 text-sm mb-3">{email || ''}</p>

                      <button
                        onClick={() => {
                          setShowSettings(true);
                          setShowUserMenu(false);
                        }}
                        className="flex items-center gap-2 w-full text-left text-gray-300 hover:text-white font-medium"
                      >
                        <Settings size={18} /> Settings
                      </button>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left text-red-400 hover:text-red-500 font-medium mt-3"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ===== Mobile Menu Button ===== */}
            <button
              className="lg:hidden p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ===== Mobile Menu Overlay ===== */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMobileMenu(false)}
          ></div>

          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl border-l border-gray-700 transform transition-transform duration-300 ease-in-out">
            <div className="p-6">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-700 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <X size={24} className="text-gray-300" />
              </button>

              {/* Logo */}
              <div className="flex items-center gap-3 mb-8 mt-8">
                <img src={logo} alt="Eventure Logo" className="h-8 w-auto" />
                <span className="text-xl font-bold text-gradient">Eventure</span>
              </div>

              {/* Navigation Links */}
              <div className="space-y-4">
                {userRole !== 'admin' && (
                  <>
                    <button
                      onClick={() => {
                        setCurrentView('home');
                        setShowMobileMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                        currentView === 'home'
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
                          : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
                      }`}
                    >
                      Home
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView('events');
                        setShowMobileMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                        currentView === 'events'
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
                          : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
                      }`}
                    >
                      Events
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView('about');
                        setShowMobileMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                        currentView === 'about'
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
                          : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
                      }`}
                    >
                      About
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView('contact');
                        setShowMobileMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                        currentView === 'contact'
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
                          : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
                      }`}
                    >
                      Contact
                    </button>

                    {userRole === 'user' && (
                      <button
                        onClick={() => {
                          setCurrentView('dashboard');
                          setShowMobileMenu(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                          currentView === 'dashboard'
                            ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
                            : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
                        }`}
                      >
                        My Bookings
                      </button>
                    )}
                  </>
                )}

                {userRole === 'admin' && (
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      setShowMobileMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                      currentView === 'admin'
                        ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
                        : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
                    }`}
                  >
                    Admin
                  </button>
                )}
              </div>

              {/* User Section */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                {!userRole ? (
                  <button
                    onClick={() => {
                      setCurrentView('login');
                      setShowMobileMenu(false);
                    }}
                    className="w-full btn-primary text-sm font-semibold shadow-lg hover:shadow-xl py-3"
                  >
                    Login
                  </button>
                ) : (
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                          <User size={20} className="text-gray-300" />
                        </div>
                      )}
                      <div>
                        <p className="text-gray-100 font-semibold text-base">{name || 'User'}</p>
                        <p className="text-gray-400 text-sm">{email || ''}</p>
                      </div>
                    </div>

                    {/* User Menu Options */}
                    <button
                      onClick={() => {
                        setShowSettings(true);
                        setShowMobileMenu(false);
                      }}
                      className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Settings size={18} /> Settings
                    </button>

                    <button
                      onClick={() => {
                        handleLogout();
                        setShowMobileMenu(false);
                      }}
                      className="flex items-center gap-3 w-full text-left text-red-400 hover:text-red-500 font-medium py-2 px-3 rounded-lg hover:bg-red-900 hover:bg-opacity-20 transition-colors"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ SETTINGS DIALOG */}
      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-4">User Settings</h2>

            {/* Profile Image Upload */}
            <div className="mb-4">
              <label className="text-gray-300 text-sm block mb-2">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full mb-2 p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
              {selectedFile && (
                <button
                  onClick={handleUploadImage}
                  disabled={uploadingImage}
                  className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
                    uploadingImage
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {uploadingImage ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Updating Profile...
                    </>
                  ) : (
                    <>
                      <Upload size={18} /> Upload Image
                    </>
                  )}
                </button>
              )}
            </div>

            <label className="text-gray-300 text-sm">Name</label>
            <input
              type="text"
              className="w-full mb-3 p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              className="w-full mb-3 p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {showPasswordFields ? (
              <>
                <label className="text-gray-300 text-sm">Current Password</label>
                <input
                  type="password"
                  className="w-full mb-3 p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <label className="text-gray-300 text-sm">New Password</label>
                <input
                  type="password"
                  className="w-full mb-3 p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <button
                  onClick={handleChangePassword}
                  className="w-full mb-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Update Password
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowPasswordFields(true)}
                className="w-full mb-3 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600"
              >
                Change Password
              </button>
            )}

            <button
              onClick={handleUpdateProfile}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mb-3"
            >
              Update Profile
            </button>

            <button
              onClick={() => {
                setShowSettings(false);
                setShowPasswordFields(false);
              }}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
