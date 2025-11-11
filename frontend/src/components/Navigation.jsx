// // // // import React, { useState } from 'react';
// // // // import { MapPin, Clock, Search, User, Menu, X, ChevronRight, Star, TrendingUp, Download, CreditCard, Check, Filter } from 'lucide-react';
// // // // // import logo from '../assets/logo.png.png';


// // // // const Navigation = ({ currentView, setCurrentView, userRole, setUserRole, showMobileMenu, setShowMobileMenu }) => (
// // // //   <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 shadow-professional border-b border-gray-700">
// // // //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //       <div className="flex justify-between items-center h-20">
// // // //         <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setCurrentView('home')}>
// // // //           {/* <img src={} alt="EventHub Logo" className="w-12 h-12 rounded-xl shadow-lg" /> */}
// // // //           <span className="text-2xl font-bold text-gradient">
// // // //             Eventure
// // // //           </span>
// // // //         </div>

// // // //         <div className="hidden lg:flex items-center gap-8">
// // // //           <button onClick={() => setCurrentView('home')} className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${currentView === 'home' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl' : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'}`}>
// // // //             Home
// // // //           </button>
// // // //           <button onClick={() => setCurrentView('events')} className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${currentView === 'events' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl' : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'}`}>
// // // //             Events
// // // //           </button>
// // // //           <button onClick={() => setCurrentView('about')} className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${currentView === 'about' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl' : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'}`}>
// // // //             About
// // // //           </button>
// // // //           {userRole === 'user' && (
// // // //             <button onClick={() => setCurrentView('dashboard')} className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${currentView === 'dashboard' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl' : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'}`}>
// // // //               My Bookings
// // // //             </button>
// // // //           )}
// // // //           {userRole === 'admin' && (
// // // //             <button onClick={() => setCurrentView('admin')} className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${currentView === 'admin' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl' : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'}`}>
// // // //               Admin
// // // //             </button>
// // // //           )}
// // // //           {!userRole ? (
// // // //             <button
// // // //               onClick={() => setCurrentView('login')}
// // // //               className="btn-primary text-sm font-semibold shadow-lg hover:shadow-xl"
// // // //             >
// // // //               Login
// // // //             </button>
// // // //           ) : (
// // // //             <button
// // // //               onClick={() => {
// // // //                 localStorage.removeItem('token');
// // // //                 localStorage.removeItem('userRole');
// // // //                 setUserRole(null);
// // // //                 setCurrentView('home');
// // // //               }}
// // // //               className="btn-secondary text-sm px-6 py-2 rounded-xl font-semibold"
// // // //             >
// // // //               Logout
// // // //             </button>
// // // //           )}
// // // //         </div>

// // // //         <button
// // // //           className="lg:hidden p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 transition-colors"
// // // //           onClick={() => setShowMobileMenu(!showMobileMenu)}
// // // //         >
// // // //           {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
// // // //         </button>
// // // //       </div>

// // // //       {showMobileMenu && (
// // // //         <div className="lg:hidden py-6 border-t border-gray-700 space-y-4 bg-gradient-to-r from-gray-800 to-gray-900">
// // // //           <button onClick={() => { setCurrentView('home'); setShowMobileMenu(false); }} className={`block w-full text-left px-6 py-3 rounded-xl font-semibold transition-all ${currentView === 'home' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl' : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'}`}>
// // // //             Home
// // // //           </button>
// // // //           <button onClick={() => { setCurrentView('events'); setShowMobileMenu(false); }} className={`block w-full text-left px-6 py-3 rounded-xl font-semibold transition-all ${currentView === 'events' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl' : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'}`}>
// // // //             Events
// // // //           </button>
// // // //           <button onClick={() => { setCurrentView('about'); setShowMobileMenu(false); }} className={`block w-full text-left px-6 py-3 rounded-xl font-semibold transition-all ${currentView === 'about' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl' : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'}`}>
// // // //             About
// // // //           </button>
// // // //           {userRole === 'user' && (
// // // //             <button onClick={() => { setCurrentView('dashboard'); setShowMobileMenu(false); }} className={`block w-full text-left px-6 py-3 rounded-xl font-semibold transition-all ${currentView === 'dashboard' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl' : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'}`}>
// // // //               My Bookings
// // // //             </button>
// // // //           )}
// // // //           {userRole === 'admin' && (
// // // //             <button onClick={() => { setCurrentView('admin'); setShowMobileMenu(false); }} className={`block w-full text-left px-6 py-3 rounded-xl font-semibold transition-all ${currentView === 'admin' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl' : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'}`}>
// // // //               Admin
// // // //             </button>
// // // //           )}
// // // //           {!userRole ? (
// // // //             <button onClick={() => { setCurrentView('login'); setShowMobileMenu(false); }} className="block w-full text-left btn-primary rounded-xl font-semibold transition-colors">
// // // //               Login
// // // //             </button>
// // // //           ) : (
// // // //             <button onClick={() => { setUserRole(null); setShowMobileMenu(false); }} className="block w-full text-left btn-secondary rounded-xl font-semibold transition-colors">
// // // //               Logout
// // // //             </button>
// // // //           )}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   </nav>
// // // // );
// // // // export default Navigation;


// // // import React, { useState } from 'react';
// // // import { MapPin, Clock, Search, User, Menu, X, ChevronRight, Star, TrendingUp, Download, CreditCard, Check, Filter } from 'lucide-react';
// // // // import logo from '../assets/logo.png.png';

// // // const Navigation = ({ currentView, setCurrentView, userRole, setUserRole, showMobileMenu, setShowMobileMenu }) => (
// // //   <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 shadow-professional border-b border-gray-700">
// // //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //       <div className="flex justify-between items-center h-20">
// // //         <div
// // //           className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
// // //           onClick={() => setCurrentView('home')}
// // //         >
// // //           {/* <img src={} alt="EventHub Logo" className="w-12 h-12 rounded-xl shadow-lg" /> */}
// // //           <span className="text-2xl font-bold text-gradient">Eventure</span>
// // //         </div>

// // //         {/* ===== Desktop Menu ===== */}
// // //         <div className="hidden lg:flex items-center gap-8">
// // //           {userRole !== 'admin' && (
// // //             <>
// // //               <button
// // //                 onClick={() => setCurrentView('home')}
// // //                 className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// // //                   currentView === 'home'
// // //                     ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// // //                     : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// // //                 }`}
// // //               >
// // //                 Home
// // //               </button>

// // //               <button
// // //                 onClick={() => setCurrentView('events')}
// // //                 className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// // //                   currentView === 'events'
// // //                     ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// // //                     : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// // //                 }`}
// // //               >
// // //                 Events
// // //               </button>

// // //               <button
// // //                 onClick={() => setCurrentView('about')}
// // //                 className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// // //                   currentView === 'about'
// // //                     ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// // //                     : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// // //                 }`}
// // //               >
// // //                 About
// // //               </button>

// // //               {/* ===== My Bookings (User only) ===== */}
// // //               {userRole === 'user' && (
// // //                 <button
// // //                   onClick={() => setCurrentView('dashboard')}
// // //                   className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// // //                     currentView === 'dashboard'
// // //                       ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// // //                       : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// // //                   }`}
// // //                 >
// // //                   My Bookings
// // //                 </button>
// // //               )}
// // //             </>
// // //           )}

// // //           {/* ===== Admin Panel ===== */}
// // //           {userRole === 'admin' && (
// // //             <button
// // //               onClick={() => setCurrentView('admin')}
// // //               className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// // //                 currentView === 'admin'
// // //                   ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// // //                   : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// // //               }`}
// // //             >
// // //               Admin
// // //             </button>
// // //           )}

// // //           {/* ✅ Profile Button (Visible when logged in)
// // //           {userRole && (
// // //             <button
// // //               onClick={() => setCurrentView('profile')}
// // //               className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// // //                 currentView === 'profile'
// // //                   ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// // //                   : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// // //               }`}
// // //             >
// // //               Profile
// // //             </button>
// // //           )} */}

// // //           {/* ===== Login / Logout ===== */}
// // //           {!userRole ? (
// // //             <button
// // //               onClick={() => setCurrentView('login')}
// // //               className="btn-primary text-sm font-semibold shadow-lg hover:shadow-xl"
// // //             >
// // //               Login
// // //             </button>
// // //           ) : (
// // //             <button
// // //               onClick={() => {
// // //                 localStorage.removeItem('token');
// // //                 localStorage.removeItem('userRole');
// // //                 setUserRole(null);
// // //                 setCurrentView('home');
// // //               }}
// // //               className="btn-secondary text-sm px-6 py-2 rounded-xl font-semibold"
// // //             >
// // //               Logout
// // //             </button>
// // //           )}
// // //         </div>

// // //         {/* ===== Mobile Menu Button ===== */}
// // //         <button
// // //           className="lg:hidden p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 transition-colors"
// // //           onClick={() => setShowMobileMenu(!showMobileMenu)}
// // //         >
// // //           {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
// // //         </button>
// // //       </div>

// // //       {/* ===== Mobile Dropdown Menu ===== */}
// // //       {showMobileMenu && (
// // //         <div className="lg:hidden py-6 border-t border-gray-700 space-y-4 bg-gradient-to-r from-gray-800 to-gray-900">
// // //           {userRole !== 'admin' && (
// // //             <>
// // //               <button
// // //                 onClick={() => {
// // //                   setCurrentView('home');
// // //                   setShowMobileMenu(false);
// // //                 }}
// // //                 className={`block w-full text-left px-6 py-3 rounded-xl font-semibold transition-all ${
// // //                   currentView === 'home'
// // //                     ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
// // //                     : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// // //                 }`}
// // //               >
// // //                 Home
// // //               </button>

// // //               <button
// // //                 onClick={() => {
// // //                   setCurrentView('events');
// // //                   setShowMobileMenu(false);
// // //                 }}
// // //                 className={`block w-full text-left px-6 py-3 rounded-xl font-semibold transition-all ${
// // //                   currentView === 'events'
// // //                     ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
// // //                     : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// // //                 }`}
// // //               >
// // //                 Events
// // //               </button>

// // //               <button
// // //                 onClick={() => {
// // //                   setCurrentView('about');
// // //                   setShowMobileMenu(false);
// // //                 }}
// // //                 className={`block w-full text-left px-6 py-3 rounded-xl font-semibold transition-all ${
// // //                   currentView === 'about'
// // //                     ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
// // //                     : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// // //                 }`}
// // //               >
// // //                 About
// // //               </button>

// // //               {userRole === 'user' && (
// // //                 <button
// // //                   onClick={() => {
// // //                     setCurrentView('dashboard');
// // //                     setShowMobileMenu(false);
// // //                   }}
// // //                   className={`block w-full text-left px-6 py-3 rounded-xl font-semibold transition-all ${
// // //                     currentView === 'dashboard'
// // //                       ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
// // //                       : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// // //                   }`}
// // //                 >
// // //                   My Bookings
// // //                 </button>
// // //               )}
// // //             </>
// // //           )}

// // //           {userRole === 'admin' && (
// // //             <button
// // //               onClick={() => {
// // //                 setCurrentView('admin');
// // //                 setShowMobileMenu(false);
// // //               }}
// // //               className={`block w-full text-left px-6 py-3 rounded-xl font-semibold transition-all ${
// // //                 currentView === 'admin'
// // //                   ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
// // //                   : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// // //               }`}
// // //             >
// // //               Admin
// // //             </button>
// // //           )}

// // //           {/* ✅ Profile Button (Mobile)
// // //           {userRole && (
// // //             <button
// // //               onClick={() => {
// // //                 setCurrentView('profile');
// // //                 setShowMobileMenu(false);
// // //               }}
// // //               className={`block w-full text-left px-6 py-3 rounded-xl font-semibold transition-all ${
// // //                 currentView === 'profile'
// // //                   ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
// // //                   : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// // //               }`}
// // //             >
// // //               Profile
// // //             </button>
// // //           )} */}

// // //           {!userRole ? (
// // //             <button
// // //               onClick={() => {
// // //                 setCurrentView('login');
// // //                 setShowMobileMenu(false);
// // //               }}
// // //               className="block w-full text-left btn-primary rounded-xl font-semibold transition-colors"
// // //             >
// // //               Login
// // //             </button>
// // //           ) : (
// // //             <button
// // //               onClick={() => {
// // //                 setUserRole(null);
// // //                 localStorage.removeItem('token');
// // //                 localStorage.removeItem('userRole');
// // //                 setCurrentView('home');
// // //                 setShowMobileMenu(false);
// // //               }}
// // //               className="block w-full text-left btn-secondary rounded-xl font-semibold transition-colors"
// // //             >
// // //               Logout
// // //             </button>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   </nav>
// // // );

// // // export default Navigation;





// // import React, { useState } from 'react';
// // import { MapPin, Clock, Search, User, Menu, X, ChevronRight, Star, TrendingUp, Download, CreditCard, Check, Filter, LogOut } from 'lucide-react';

// // const Navigation = ({ currentView, setCurrentView, userRole, setUserRole, showMobileMenu, setShowMobileMenu }) => {
// //   const [showUserMenu, setShowUserMenu] = useState(false); // ✅ NEW - dropdown toggle
// //   const userName = localStorage.getItem('userName');
// //   const userEmail= localStorage.getItem('userEmail') // ✅ NEW - get name from localStorage

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('userRole');
// //     localStorage.removeItem('userName'); 
// //     localStorage.removeItem('userEmail')// ✅ NEW - clear name too
// //     setUserRole(null);
// //     setCurrentView('home');
// //     setShowUserMenu(false);
// //   };

// //   return (
// //     <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 shadow-professional border-b border-gray-700">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between items-center h-20">
// //           {/* ===== Logo ===== */}
// //           <div
// //             className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
// //             onClick={() => setCurrentView('home')}
// //           >
// //             <span className="text-2xl font-bold text-gradient">Eventure</span>
// //           </div>

// //           {/* ===== Desktop Menu ===== */}
// //           <div className="hidden lg:flex items-center gap-8">
// //             {userRole !== 'admin' && (
// //               <>
// //                 <button
// //                   onClick={() => setCurrentView('home')}
// //                   className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// //                     currentView === 'home'
// //                       ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// //                       : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// //                   }`}
// //                 >
// //                   Home
// //                 </button>

// //                 <button
// //                   onClick={() => setCurrentView('events')}
// //                   className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// //                     currentView === 'events'
// //                       ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// //                       : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// //                   }`}
// //                 >
// //                   Events
// //                 </button>

// //                 <button
// //                   onClick={() => setCurrentView('about')}
// //                   className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// //                     currentView === 'about'
// //                       ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// //                       : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// //                   }`}
// //                 >
// //                   About
// //                 </button>

// //                 {userRole === 'user' && (
// //                   <button
// //                     onClick={() => setCurrentView('dashboard')}
// //                     className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// //                       currentView === 'dashboard'
// //                         ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// //                         : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// //                     }`}
// //                   >
// //                     My Bookings
// //                   </button>
// //                 )}
// //               </>
// //             )}

// //             {userRole === 'admin' && (
// //               <button
// //                 onClick={() => setCurrentView('admin')}
// //                 className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// //                   currentView === 'admin'
// //                     ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// //                     : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// //                 }`}
// //               >
// //                 Admin
// //               </button>
// //             )}

// //             {/* ===== Login / User Menu ===== */}
// //             {!userRole ? (
// //               <button
// //                 onClick={() => setCurrentView('login')}
// //                 className="btn-primary text-sm font-semibold shadow-lg hover:shadow-xl"
// //               >
// //                 Login
// //               </button>
// //             ) : (
// //               // ✅ NEW - user icon and dropdown
// //               <div className="relative">
// //                 <button
// //                   onClick={() => setShowUserMenu(!showUserMenu)}
// //                   className="flex items-center gap-2 text-gray-300 hover:text-white"
// //                 >
// //                   <User size={22} />
// //                   <span className="font-semibold">{userName?.split(' ')[0] || 'User'}</span>
// //                 </button>

// //                 {showUserMenu && (
// //                   <div className="absolute right-0 mt-3 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-3 w-40 z-50">
// //                     <p className="text-gray-200 font-semibold mb-2">{userName}</p>
// //                     <button
// //                       onClick={handleLogout}
// //                       className="flex items-center gap-2 w-full text-left text-red-400 hover:text-red-500"
// //                     >
// //                       <LogOut size={18} /> Logout
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* ===== Mobile Menu Button ===== */}
// //           <button
// //             className="lg:hidden p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 transition-colors"
// //             onClick={() => setShowMobileMenu(!showMobileMenu)}
// //           >
// //             {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
// //           </button>
// //         </div>

// //         {/* ===== Mobile Dropdown Menu (unchanged) ===== */}
// //         {showMobileMenu && (
// //           <div className="lg:hidden py-6 border-t border-gray-700 space-y-4 bg-gradient-to-r from-gray-800 to-gray-900">
// //             {/* ... your existing mobile menu buttons remain same ... */}

// //             {!userRole ? (
// //               <button
// //                 onClick={() => {
// //                   setCurrentView('login');
// //                   setShowMobileMenu(false);
// //                 }}
// //                 className="block w-full text-left btn-primary rounded-xl font-semibold transition-colors"
// //               >
// //                 Login
// //               </button>
// //             ) : (
// //               <button
// //                 onClick={handleLogout}
// //                 className="block w-full text-left btn-secondary rounded-xl font-semibold transition-colors"
// //               >
// //                 Logout
// //               </button>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navigation;



// ///////////last changed///////////////

// // import React, { useState } from 'react';
// // import { MapPin, Clock, Search, User, Menu, X, ChevronRight, Star, TrendingUp, Download, CreditCard, Check, Filter, LogOut } from 'lucide-react';

// // const Navigation = ({ currentView, setCurrentView, userRole, setUserRole, showMobileMenu, setShowMobileMenu }) => {
// //   const [showUserMenu, setShowUserMenu] = useState(false);
// //   const userName = localStorage.getItem('userName');
// //   const userEmail = localStorage.getItem('userEmail');

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('userRole');
// //     localStorage.removeItem('userName');
// //     localStorage.removeItem('userEmail');
// //     setUserRole(null);
// //     setCurrentView('home');
// //     setShowUserMenu(false);
// //   };

// //   return (
// //     <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 shadow-professional border-b border-gray-700">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between items-center h-20">
// //           {/* ===== Logo ===== */}
// //           <div
// //             className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
// //             onClick={() => setCurrentView('home')}
// //           >
// //             <span className="text-2xl font-bold text-gradient">Eventure</span>
// //           </div>

// //           {/* ===== Desktop Menu ===== */}
// //           <div className="hidden lg:flex items-center gap-8">
// //             {userRole !== 'admin' && (
// //               <>
// //                 <button
// //                   onClick={() => setCurrentView('home')}
// //                   className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// //                     currentView === 'home'
// //                       ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// //                       : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// //                   }`}
// //                 >
// //                   Home
// //                 </button>

// //                 <button
// //                   onClick={() => setCurrentView('events')}
// //                   className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// //                     currentView === 'events'
// //                       ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// //                       : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// //                   }`}
// //                 >
// //                   Events
// //                 </button>

// //                 <button
// //                   onClick={() => setCurrentView('about')}
// //                   className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// //                     currentView === 'about'
// //                       ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// //                       : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// //                   }`}
// //                 >
// //                   About
// //                 </button>

// //                 {userRole === 'user' && (
// //                   <button
// //                     onClick={() => setCurrentView('dashboard')}
// //                     className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// //                       currentView === 'dashboard'
// //                         ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// //                         : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// //                     }`}
// //                   >
// //                     My Bookings
// //                   </button>
// //                 )}
// //               </>
// //             )}

// //             {userRole === 'admin' && (
// //               <button
// //                 onClick={() => setCurrentView('admin')}
// //                 className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
// //                   currentView === 'admin'
// //                     ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-xl'
// //                     : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
// //                 }`}
// //               >
// //                 Admin
// //               </button>
// //             )}

// //             {/* ===== Login / User Menu ===== */}
// //             {!userRole ? (
// //               <button
// //                 onClick={() => setCurrentView('login')}
// //                 className="btn-primary text-sm font-semibold shadow-lg hover:shadow-xl"
// //               >
// //                 Login
// //               </button>
// //             ) : (
// //               // ✅ User icon with dropdown (Full Name + Email + Logout)
// //               <div className="relative">
// //                 <button
// //                   onClick={() => setShowUserMenu(!showUserMenu)}
// //                   className="flex items-center gap-2 text-gray-300 hover:text-white"
// //                 >
// //                   <User size={22} />
// //                 </button>

// //                 {showUserMenu && (
// //                   <div className="absolute right-0 mt-3 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-4 w-56 z-50">
// //                     <p className="text-gray-100 font-semibold text-base">{userName || 'User'}</p>
// //                     <p className="text-gray-400 text-sm mb-3">{userEmail || ''}</p>
// //                     <button
// //                       onClick={handleLogout}
// //                       className="flex items-center gap-2 w-full text-left text-red-400 hover:text-red-500 font-medium mt-3"
// //                     >
// //                       <LogOut size={18} /> Logout
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* ===== Mobile Menu Button ===== */}
// //           <button
// //             className="lg:hidden p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 transition-colors"
// //             onClick={() => setShowMobileMenu(!showMobileMenu)}
// //           >
// //             {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
// //           </button>
// //         </div>

// //         {/* ===== Mobile Dropdown Menu (unchanged) ===== */}
// //         {showMobileMenu && (
// //           <div className="lg:hidden py-6 border-t border-gray-700 space-y-4 bg-gradient-to-r from-gray-800 to-gray-900">
// //             {!userRole ? (
// //               <button
// //                 onClick={() => {
// //                   setCurrentView('login');
// //                   setShowMobileMenu(false);
// //                 }}
// //                 className="block w-full text-left btn-primary rounded-xl font-semibold transition-colors"
// //               >
// //                 Login
// //               </button>
// //             ) : (
// //               <button
// //                 onClick={handleLogout}
// //                 className="block w-full text-left btn-secondary rounded-xl font-semibold transition-colors"
// //               >
// //                 Logout
// //               </button>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navigation;
// /////////////////////////////////////////
// import React, { useState } from 'react';
// import {
//   User, Menu, X, Settings, LogOut
// } from 'lucide-react';

// const Navigation = ({ currentView, setCurrentView, userRole, setUserRole, showMobileMenu, setShowMobileMenu }) => {
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [showChangePassword, setShowChangePassword] = useState(false);

//   const userName = localStorage.getItem('userName');
//   const userEmail = localStorage.getItem('userEmail');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userName');
//     localStorage.removeItem('userEmail');
//     setUserRole(null);
//     setCurrentView('home');
//     setShowUserMenu(false);
//   };

//   return (
//     <>
//       <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 shadow-professional border-b border-gray-700">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* ===== Logo ===== */}
//             <div
//               className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
//               onClick={() => setCurrentView('home')}
//             >
//               <span className="text-2xl font-bold text-gradient">Eventure</span>
//             </div>

//             {/* ===== Desktop Menu ===== */}
//             <div className="hidden lg:flex items-center gap-8">
//               {userRole !== 'admin' && (
//                 <>
//                   <button
//                     onClick={() => setCurrentView('home')}
//                     className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
//                       currentView === 'home'
//                         ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
//                         : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
//                     }`}
//                   >
//                     Home
//                   </button>

//                   <button
//                     onClick={() => setCurrentView('events')}
//                     className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
//                       currentView === 'events'
//                         ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
//                         : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
//                     }`}
//                   >
//                     Events
//                   </button>

//                   <button
//                     onClick={() => setCurrentView('about')}
//                     className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
//                       currentView === 'about'
//                         ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
//                         : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
//                     }`}
//                   >
//                     About
//                   </button>

//                   {userRole === 'user' && (
//                     <button
//                       onClick={() => setCurrentView('dashboard')}
//                       className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
//                         currentView === 'dashboard'
//                           ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
//                           : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
//                       }`}
//                     >
//                       My Bookings
//                     </button>
//                   )}
//                 </>
//               )}

//               {userRole === 'admin' && (
//                 <button
//                   onClick={() => setCurrentView('admin')}
//                   className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
//                     currentView === 'admin'
//                       ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
//                       : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
//                   }`}
//                 >
//                   Admin
//                 </button>
//               )}

//               {/* ===== Login / User Menu ===== */}
//               {!userRole ? (
//                 <button
//                   onClick={() => setCurrentView('login')}
//                   className="btn-primary text-sm font-semibold shadow-lg hover:shadow-xl"
//                 >
//                   Login
//                 </button>
//               ) : (
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowUserMenu(!showUserMenu)}
//                     className="flex items-center gap-2 text-gray-300 hover:text-white"
//                   >
//                     <User size={22} />
//                   </button>

//                   {showUserMenu && (
//                     <div className="absolute right-0 mt-3 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-4 w-56 z-50">
//                       <p className="text-gray-100 font-semibold text-base">{userName || 'User'}</p>
//                       <p className="text-gray-400 text-sm mb-3">{userEmail || ''}</p>

//                       {/* ⚙️ Settings Option */}
//                       <button
//                         onClick={() => {
//                           setShowSettings(true);
//                           setShowUserMenu(false);
//                         }}
//                         className="flex items-center gap-2 w-full text-left text-gray-300 hover:text-blue-400 font-medium mb-2"
//                       >
//                         <Settings size={18} /> Settings
//                       </button>

//                       {/* 🚪 Logout Option */}
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-2 w-full text-left text-red-400 hover:text-red-500 font-medium mt-2"
//                       >
//                         <LogOut size={18} /> Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* ===== Mobile Menu Button ===== */}
//             <button
//               className="lg:hidden p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 transition-colors"
//               onClick={() => setShowMobileMenu(!showMobileMenu)}
//             >
//               {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* ===== ⚙️ Settings Modal ===== */}
//       {showSettings && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[999]">
//           <div className="bg-gray-900 text-gray-100 p-8 rounded-2xl shadow-2xl w-96 relative border border-gray-700">
//             <h2 className="text-xl font-bold mb-4 text-center text-blue-400">User Settings</h2>

//             {!showChangePassword ? (
//               <>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm mb-1 text-gray-400">Name</label>
//                     <input
//                       type="text"
//                       defaultValue={userName || ''}
//                       className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm mb-1 text-gray-400">Email</label>
//                     <input
//                       type="email"
//                       defaultValue={userEmail || ''}
//                       className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-6 flex flex-col gap-3">
//                   <button
//                     onClick={() => setShowChangePassword(true)}
//                     className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl hover:from-blue-600 hover:to-blue-800 transition-all shadow-md"
//                   >
//                     Change Password
//                   </button>

//                   <button
//                     onClick={() => setShowSettings(false)}
//                     className="px-5 py-2 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition-all"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h3 className="text-lg font-semibold mb-4 text-center text-blue-300">Change Password</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm mb-1 text-gray-400">Current Password</label>
//                     <input
//                       type="password"
//                       placeholder="Enter current password"
//                       className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm mb-1 text-gray-400">New Password</label>
//                     <input
//                       type="password"
//                       placeholder="Enter new password"
//                       className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-6 flex flex-col gap-3">
//                   <button
//                     onClick={() => setShowChangePassword(false)}
//                     className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl hover:from-green-600 hover:to-green-800 transition-all shadow-md"
//                   >
//                     Update
//                   </button>

//                   <button
//                     onClick={() => setShowChangePassword(false)}
//                     className="px-5 py-2 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition-all"
//                   >
//                     Back
//                   </button>
//                 </div>
//               </>
//             )}

//             <button
//               onClick={() => setShowSettings(false)}
//               className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
//             >
//               <X size={22} />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navigation;



// import React, { useState } from 'react';
// import {
//   MapPin, Clock, Search, User, Menu, X, ChevronRight, Star,
//   TrendingUp, Download, CreditCard, Check, Filter, LogOut, Settings
// } from 'lucide-react';

// const Navigation = ({ currentView, setCurrentView, userRole, setUserRole, showMobileMenu, setShowMobileMenu }) => {
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [showPasswordFields, setShowPasswordFields] = useState(false);
//   const [name, setName] = useState(localStorage.getItem('userName') || '');
//   const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const userName = localStorage.getItem('userName');
//   const userEmail = localStorage.getItem('userEmail');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userName');
//     localStorage.removeItem('userEmail');
//     setUserRole(null);
//     setCurrentView('home');
//     setShowUserMenu(false);
//   };

//   // ✅ Update profile (name/email)
//   const handleUpdateProfile = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/auth/update-profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ name, email }),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         alert('Profile updated successfully!');
//         localStorage.setItem('userName', data.user.name);
//         localStorage.setItem('userEmail', data.user.email);
//         setShowSettings(false);
//       } else {
//         alert(data.message || 'Failed to update profile');
//       }
//     } catch (err) {
//       alert('Error updating profile');
//     }
//   };

//   // ✅ Change password
//   const handleChangePassword = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/auth/change-password', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ currentPassword, newPassword }),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         alert('Password updated successfully!');
//         setShowPasswordFields(false);
//         setCurrentPassword('');
//         setNewPassword('');
//       } else {
//         alert(data.message || 'Password update failed');
//       }
//     } catch (err) {
//       alert('Error updating password');
//     }
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 shadow-professional border-b border-gray-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* ===== Logo ===== */}
//           <div
//             className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
//             onClick={() => setCurrentView('home')}
//           >
//             <span className="text-2xl font-bold text-gradient">Eventure</span>
//           </div>

//           {/* ===== Desktop Menu ===== */}
//           <div className="hidden lg:flex items-center gap-8">
//             {userRole !== 'admin' && (
//               <>
//                 <button
//                   onClick={() => setCurrentView('home')}
//                   className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
//                     currentView === 'home'
//                       ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
//                       : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
//                   }`}
//                 >
//                   Home
//                 </button>

//                 <button
//                   onClick={() => setCurrentView('events')}
//                   className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
//                     currentView === 'events'
//                       ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
//                       : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
//                   }`}
//                 >
//                   Events
//                 </button>

//                 <button
//                   onClick={() => setCurrentView('about')}
//                   className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
//                     currentView === 'about'
//                       ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
//                       : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
//                   }`}
//                 >
//                   About
//                 </button>

//                 {userRole === 'user' && (
//                   <button
//                     onClick={() => setCurrentView('dashboard')}
//                     className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
//                       currentView === 'dashboard'
//                         ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
//                         : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
//                     }`}
//                   >
//                     My Bookings
//                   </button>
//                 )}
//               </>
//             )}

//             {userRole === 'admin' && (
//               <button
//                 onClick={() => setCurrentView('admin')}
//                 className={`px-4 py-2 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
//                   currentView === 'admin'
//                     ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md'
//                     : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700'
//                 }`}
//               >
//                 Admin
//               </button>
//             )}

//             {/* ===== Login / User Menu ===== */}
//             {!userRole ? (
//               <button
//                 onClick={() => setCurrentView('login')}
//                 className="btn-primary text-sm font-semibold shadow-lg hover:shadow-xl"
//               >
//                 Login
//               </button>
//             ) : (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowUserMenu(!showUserMenu)}
//                   className="flex items-center gap-2 text-gray-300 hover:text-white"
//                 >
//                   <User size={22} />
//                 </button>

//                 {showUserMenu && (
//                   <div className="absolute right-0 mt-3 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-4 w-56 z-50">
//                     <p className="text-gray-100 font-semibold text-base">{userName || 'User'}</p>
//                     <p className="text-gray-400 text-sm mb-3">{userEmail || ''}</p>

//                     {/* ✅ New Settings Button */}
//                     <button
//                       onClick={() => {
//                         setShowSettings(true);
//                         setShowUserMenu(false);
//                       }}
//                       className="flex items-center gap-2 w-full text-left text-gray-300 hover:text-white font-medium"
//                     >
//                       <Settings size={18} /> Settings
//                     </button>

//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center gap-2 w-full text-left text-red-400 hover:text-red-500 font-medium mt-3"
//                     >
//                       <LogOut size={18} /> Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* ===== Mobile Menu Button ===== */}
//           <button
//             className="lg:hidden p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 transition-colors"
//             onClick={() => setShowMobileMenu(!showMobileMenu)}
//           >
//             {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* ===== Mobile Dropdown ===== */}
//         {showMobileMenu && (
//           <div className="lg:hidden py-6 border-t border-gray-700 space-y-4 bg-gradient-to-r from-gray-800 to-gray-900">
//             {!userRole ? (
//               <button
//                 onClick={() => {
//                   setCurrentView('login');
//                   setShowMobileMenu(false);
//                 }}
//                 className="block w-full text-left btn-primary rounded-xl font-semibold transition-colors"
//               >
//                 Login
//               </button>
//             ) : (
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left btn-secondary rounded-xl font-semibold transition-colors"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* ✅ SETTINGS DIALOG */}
//       {showSettings && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
//           <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 w-full max-w-md shadow-2xl">
//             <h2 className="text-xl font-semibold text-white mb-4">User Settings</h2>

//             <label className="text-gray-300 text-sm">Name</label>
//             <input
//               type="text"
//               className="w-full mb-3 p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />

//             <label className="text-gray-300 text-sm">Email</label>
//             <input
//               type="email"
//               className="w-full mb-3 p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             {/* Change password toggle */}
//             {showPasswordFields ? (
//               <>
//                 <label className="text-gray-300 text-sm">Current Password</label>
//                 <input
//                   type="password"
//                   className="w-full mb-3 p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
//                   value={currentPassword}
//                   onChange={(e) => setCurrentPassword(e.target.value)}
//                 />

//                 <label className="text-gray-300 text-sm">New Password</label>
//                 <input
//                   type="password"
//                   className="w-full mb-3 p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                 />

//                 <button
//                   onClick={handleChangePassword}
//                   className="w-full mb-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//                 >
//                   Update Password
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => setShowPasswordFields(true)}
//                 className="w-full mb-3 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600"
//               >
//                 Change Password
//               </button>
//             )}

//             {/* ✅ Update button for name/email */}
//             <button
//               onClick={handleUpdateProfile}
//               className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mb-3"
//             >
//               Update Profile
//             </button>

//             <button
//               onClick={() => {
//                 setShowSettings(false);
//                 setShowPasswordFields(false);
//               }}
//               className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navigation;


import React, { useState, useEffect } from 'react';
import {
  MapPin, Clock, Search, User, Menu, X, ChevronRight, Star,
  TrendingUp, Download, CreditCard, Check, Filter, LogOut, Settings
} from 'lucide-react';

const Navigation = ({ currentView, setCurrentView, userRole, setUserRole, showMobileMenu, setShowMobileMenu }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // ✅ Sync user info when userRole or token changes
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setName(data.user.name);
          setEmail(data.user.email);
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
        } else {
          console.error('Failed to fetch user profile');
        }
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
      const res = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();

      if (res.ok) {
        alert('Profile updated successfully!');
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        setShowSettings(false);
      } else {
        alert(data.message || 'Failed to update profile');
      }
    } catch (err) {
      alert('Error updating profile');
    }
  };

  // ✅ Change password
  const handleChangePassword = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        alert('Password updated successfully!');
        setShowPasswordFields(false);
        setCurrentPassword('');
        setNewPassword('');
      } else {
        alert(data.message || 'Password update failed');
      }
    } catch (err) {
      alert('Error updating password');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 shadow-professional border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* ===== Logo ===== */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setCurrentView('home')}
          >
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
                  <User size={22} />
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

      {/* ✅ SETTINGS DIALOG */}
      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-semibold text-white mb-4">User Settings</h2>

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
    </nav>
  );
};

export default Navigation;
