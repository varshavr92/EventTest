// // import React, { useState, useEffect } from 'react';
// // import { Calendar, MapPin, Clock, Search, User, Menu, X, ChevronRight, Star, TrendingUp, Download, CreditCard, Check, Filter } from 'lucide-react';
// // import QRCode from 'qrcode';
// // import EventCard from "./EventCard";
// // // ...existing code...
// // import { bookingsAPI, eventsAPI } from '../services/api';

// // const UserDashboard = ({ bookings, setCurrentView, setSelectedEvent, setBookings }) => {
// //   const [userBookings, setUserBookings] = useState([]);
// //   const [recommendedEvents, setRecommendedEvents] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       try {
// //         setLoading(true);
// //         // Fetch user bookings from backend
// //         const fetchedBookings = await bookingsAPI.getUserBookings();
// //         setUserBookings(fetchedBookings);
// //         setBookings(fetchedBookings); // Update parent state with fetched bookings

// //         // Fetch recommendations
// //         const recommendations = await bookingsAPI.getRecommendations();
// //         setRecommendedEvents(recommendations.slice(0, 3));
// //       } catch (err) {
// //         console.error('Error fetching user data:', err);
// //         setError('Failed to load dashboard data');
// //         setRecommendedEvents([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchUserData();
// //   }, []);

// //   const displayBookings = userBookings.length > 0 ? userBookings : bookings;
// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-12">
// //       <div className="text-center mb-12">
// //         <h1 className="heading-1 mb-4 text-white">My Bookings</h1>
// //         <p className="body-text max-w-2xl mx-auto text-gray-300">Manage your event bookings and download your tickets</p>
// //       </div>

// //       {bookings.length === 0 ? (
// //         <div className="text-center py-20 bg-gray-800 rounded-2xl border border-gray-700">
// //           <div className="text-gray-500 mb-6">
// //             <Calendar size={80} className="mx-auto" />
// //           </div>
// //           <h3 className="text-2xl font-bold text-gray-400 mb-4">No bookings yet</h3>
// //           <p className="text-gray-300 mb-8 max-w-md mx-auto">Start exploring events and book your first ticket to see your bookings here!</p>
// //           <button
// //             onClick={() => setCurrentView('events')}
// //             className="btn-primary text-lg px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl"
// //           >
// //             Browse Events
// //           </button>
// //         </div>
// //       ) : (
// //         <div className="space-y-8">
// //           {bookings.map(booking => {
// //             const event = booking.eventId;
// //             return (
// //               <div key={booking._id} className="card card-hover p-8">
// //                 <div className="flex flex-col lg:flex-row gap-8">
// //                   {event && event.image && (
// //                     <img
// //                       src={event.image}
// //                       alt={event.title}
// //                       className="w-full lg:w-64 h-48 object-cover rounded-2xl shadow-md"
// //                     />
// //                   )}
// //                   <div className="flex-1">
// //                     <div className="flex items-start justify-between mb-6">
// //                       <div>
// //                         <h3 className="text-2xl font-bold mb-4 text-white">{event ? event.title : 'Event'}</h3>
// //                         <div className="space-y-3 text-gray-300">
// //                           <div className="flex items-center gap-3">
// //                             <Calendar size={18} className="text-blue-600" />
// //                             <span className="font-medium">{event && new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
// //                           </div>
// //                           <div className="flex items-center gap-3">
// //                             <Clock size={18} className="text-blue-600" />
// //                             <span className="font-medium">{event && event.time}</span>
// //                           </div>
// //                           <div className="flex items-center gap-3">
// //                             <MapPin size={18} className="text-blue-600" />
// //                             <span className="font-medium">{event && event.venue}</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center gap-3 px-4 py-2 bg-green-700 text-green-300 rounded-full font-bold text-sm">
// //                         <Check size={18} />
// //                         {booking.status}
// //                       </div>
// //                     </div>

// //                     <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between pt-6 border-t border-gray-700">
// //                       <div className="flex flex-col sm:flex-row gap-4">
// //                         <div>
// //                           <span className="text-gray-300 font-medium">Tickets: </span>
// //                           <span className="font-bold text-lg text-white">{booking.tickets}</span>
// //                         </div>
// //                         <div>
// //                           <span className="text-gray-300 font-medium">Total: </span>
// //                           <span className="font-bold text-2xl text-blue-400">${booking.totalAmount}</span>
// //                         </div>
// //                       </div>
// //                       <button
// //                         onClick={async () => {
// //                           try {
// //                             const blob = await bookingsAPI.downloadTicket(booking._id);
// //                             const url = window.URL.createObjectURL(blob);
// //                             const a = document.createElement('a');
// //                             a.href = url;
// //                             a.download = `e-ticket-${booking._id}.pdf`;
// //                             document.body.appendChild(a);
// //                             a.click();
// //                             window.URL.revokeObjectURL(url);
// //                             document.body.removeChild(a);
// //                           } catch (err) {
// //                             console.error('Failed to download ticket:', err);
// //                             alert('Failed to download ticket. Please try again.');
// //                           }
// //                         }}
// //                         className="btn-secondary flex items-center gap-3 px-6 py-3 rounded-xl font-bold"
// //                       >
// //                         <Download size={20} />
// //                         Download E-Ticket
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}

// //       {bookings.length > 0 && (
// //         <div className="mt-16">
// //           <div className="text-center mb-10">
// //             <h2 className="heading-2 mb-4 text-white">Recommended for You</h2>
// //             <p className="text-gray-300">Based on your booking history</p>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {recommendedEvents.length === 0 ? (
// //               <div className="col-span-full text-center py-12 bg-gray-800 rounded-2xl">
// //                 <p className="text-gray-300 font-medium">No recommendations yet. Book more events to get personalized suggestions!</p>
// //               </div>
// //             ) : (
// //               recommendedEvents.map(event => (
// //                 <EventCard
// //                   key={event._id}
// //                   event={event}
// //                   onClick={() => {
// //                     setSelectedEvent && setSelectedEvent(event);
// //                     setCurrentView && setCurrentView('details');
// //                   }}
// //                 />
// //               ))
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };


// // export default UserDashboard;


// ////////////////////////////////////////////////////////////////////////////////////////
// // UserDashboard.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Calendar,
//   MapPin,
//   Clock,
//   Download,
//   Check,
// } from "lucide-react";
// import EventCard from "./EventCard";
// import { bookingsAPI } from "../services/api";
// import axios from "axios";

// const UserDashboard = ({ bookings, setCurrentView, setSelectedEvent, setBookings }) => {
//   const [userBookings, setUserBookings] = useState([]);
//   const [recommendedEvents, setRecommendedEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showInterestInput, setShowInterestInput] = useState(false);
//   const [interests, setInterests] = useState("");
//   const [aiLoading, setAiLoading] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true);
//         const fetchedBookings = await bookingsAPI.getUserBookings();
//         setUserBookings(fetchedBookings);
//         setBookings(fetchedBookings);
//         const recommendations = await bookingsAPI.getRecommendations();
//         setRecommendedEvents(recommendations.slice(0, 3));
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         setError("Failed to load dashboard data");
//         setRecommendedEvents([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   // const handleAIRecommendation = async () => {
//   //   if (!interests.trim()) {
//   //     alert("Please enter your interests first!");
//   //     return;
//   //   }

//   //   try {
//   //     setAiLoading(true);
//   //     const { data } = await axios.post("http://localhost:5000/api/recommendations", { interests });
//   //     setRecommendedEvents(data.recommendations || []);
//   //   } catch (error) {
//   //     console.error("Error fetching AI recommendations:", error);
//   //     alert("Failed to get AI recommendations");
//   //   } finally {
//   //     setAiLoading(false);
//   //   }
//   // };


//   const handleAIRecommendation = async () => {
//   if (!interests.trim()) {
//     alert("Please enter your interests first!");
//     return;
//   }

//   try {
//     setAiLoading(true);

//      console.log("🔍 Sending interests:", interests);
//     const { data } = await axios.post("http://localhost:5000/api/recommendations", { interests });
    
//      console.log("🤖 AI Response:", data);
//     // ✅ Safely handle both text and array responses
//     if (Array.isArray(data.recommendations)) {
//       setRecommendedEvents(data.recommendations);
//     } else if (typeof data.message === "string") {
//       setRecommendedEvents([{ title: "AI Suggestion", description: data.message }]);
//     } else if (typeof data === "string") {
//       setRecommendedEvents([{ title: "AI Suggestion", description: data }]);
//     } else {
//       setRecommendedEvents([]);
//     }

//   } catch (error) {
//     console.error("Error fetching AI recommendations:", error);
//     alert("Failed to get AI recommendations");
//   } finally {
//     setAiLoading(false);
//   }
// };


//   const displayBookings = userBookings.length > 0 ? userBookings : bookings;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       <div className="text-center mb-12">
//         <h1 className="heading-1 mb-4 text-white">My Bookings</h1>
//         <p className="body-text max-w-2xl mx-auto text-gray-300">
//           Manage your event bookings and download your tickets
//         </p>
//       </div>

//       {/* If no bookings */}
//       {bookings.length === 0 ? (
//         <div className="text-center py-20 bg-gray-800 rounded-2xl border border-gray-700">
//           <div className="text-gray-500 mb-6">
//             <Calendar size={80} className="mx-auto" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-400 mb-4">No bookings yet</h3>
//           <p className="text-gray-300 mb-8 max-w-md mx-auto">
//             Start exploring events and book your first ticket to see your bookings here!
//           </p>

//           {/* AI Recommendation Section */}
//           <button
//             onClick={() => setShowInterestInput(!showInterestInput)}
//             className="btn-primary text-lg px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl"
//           >
//             Need Recommendation
//           </button>

//           {showInterestInput && (
//             <div className="mt-8 space-y-4 max-w-md mx-auto">
//               <input
//                 type="text"
//                 value={interests}
//                 onChange={(e) => setInterests(e.target.value)}
//                 placeholder="Type your interests (e.g., Music, Technology, Sports)"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring focus:ring-blue-500"
//               />
//               <button
//                 onClick={handleAIRecommendation}
//                 disabled={aiLoading}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
//               >
//                 {aiLoading ? "Getting Recommendations..." : "Get Recommendations"}
//               </button>
//             </div>
//           )}

//           {/* Display Recommended Events */}
//           {recommendedEvents.length > 0 && (
//             <div className="mt-10">
//               <h2 className="text-2xl font-bold text-white mb-4">Recommended for You</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {recommendedEvents.map((event) => (
//                   <EventCard
//                     key={event._id}
//                     event={event}
//                     onClick={() => {
//                       setSelectedEvent(event);
//                       setCurrentView("details");
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         /* If user has bookings */
//         <div className="space-y-8">
//           {displayBookings.map((booking) => {
//             const event = booking.eventId;
//             return (
//               <div key={booking._id} className="card card-hover p-8">
//                 <div className="flex flex-col lg:flex-row gap-8">
//                   {event && event.imageUrl && (
//                     <img
//                       src={event.imageUrl}
//                       alt={event.title}
//                       className="w-full lg:w-64 h-48 object-cover rounded-2xl shadow-md"
//                     />
//                   )}
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between mb-6">
//                       <div>
//                         <h3 className="text-2xl font-bold mb-4 text-white">
//                           {event ? event.title : "Event"}
//                         </h3>
//                         <div className="space-y-3 text-gray-300">
//                           <div className="flex items-center gap-3">
//                             <Calendar size={18} className="text-blue-600" />
//                             <span className="font-medium">
//                               {event &&
//                                 new Date(event.date).toLocaleDateString("en-US", {
//                                   weekday: "long",
//                                   month: "long",
//                                   day: "numeric",
//                                   year: "numeric",
//                                 })}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-3">
//                             <Clock size={18} className="text-blue-600" />
//                             <span className="font-medium">
//                               {event && event.time}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-3">
//                             <MapPin size={18} className="text-blue-600" />
//                             <span className="font-medium">
//                               {event && event.venue}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3 px-4 py-2 bg-green-700 text-green-300 rounded-full font-bold text-sm">
//                         <Check size={18} />
//                         {booking.status}
//                       </div>
//                     </div>

//                     <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between pt-6 border-t border-gray-700">
//                       <div className="flex flex-col sm:flex-row gap-4">
//                         <div>
//                           <span className="text-gray-300 font-medium">Tickets: </span>
//                           <span className="font-bold text-lg text-white">{booking.tickets}</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-300 font-medium">Total: </span>
//                           <span className="font-bold text-2xl text-blue-400">${booking.totalAmount}</span>
//                         </div>
//                       </div>
//                       <button
//                         onClick={async () => {
//                           try {
//                             const blob = await bookingsAPI.downloadTicket(booking._id);
//                             const url = window.URL.createObjectURL(blob);
//                             const a = document.createElement("a");
//                             a.href = url;
//                             a.download = `e-ticket-${booking._id}.pdf`;
//                             document.body.appendChild(a);
//                             a.click();
//                             window.URL.revokeObjectURL(url);
//                             document.body.removeChild(a);
//                           } catch (err) {
//                             console.error("Failed to download ticket:", err);
//                             alert("Failed to download ticket. Please try again.");
//                           }
//                         }}
//                         className="btn-secondary flex items-center gap-3 px-6 py-3 rounded-xl font-bold"
//                       >
//                         <Download size={20} />
//                         Download E-Ticket
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;
// /////////////////////////////////////////////////////////////////////////////////


//////////////last modified/////////////////////////
// // UserDashboard.jsx
// import React, { useState, useEffect } from "react";
// import { Calendar, MapPin, Clock, Download, Check } from "lucide-react";
// import EventCard from "./EventCard";
// import { bookingsAPI } from "../services/api";
// import axios from "axios";

// const UserDashboard = ({ bookings, setCurrentView, setSelectedEvent, setBookings }) => {
//   const [userBookings, setUserBookings] = useState([]);
//   const [recommendedEvents, setRecommendedEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showInterestInput, setShowInterestInput] = useState(false);
//   const [interests, setInterests] = useState("");
//   const [aiLoading, setAiLoading] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true);
//         const fetchedBookings = await bookingsAPI.getUserBookings();
//         setUserBookings(fetchedBookings);
//         setBookings(fetchedBookings);
//         const recommendations = await bookingsAPI.getRecommendations();
//         console.log('Recommendations from backend:', recommendations);
//         setRecommendedEvents(recommendations.slice(0, 3));
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         setError("Failed to load dashboard data");
//         setRecommendedEvents([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   // ✅ UPDATED FUNCTION
//   const handleAIRecommendation = async () => {
//     if (!interests.trim()) {
//       alert("Please enter your interests first!");
//       return;
//     }

//     console.log("Sending interests:", interests);
//     try {
//       setAiLoading(true);
//       const res = await axios.post("http://localhost:5000/api/recommendations", { interests,userId });
//       const data = res.data;
//       console.log("🤖 AI Response:", data);

//       // 🧠 FIX STARTS HERE
//       if (Array.isArray(data.recommendations)) {
//         setRecommendedEvents(data.recommendations);
//       } else if (typeof data.recommendations === "string") {
//         // When backend sends a single string instead of an array
//         setRecommendedEvents([
//           {
//             _id: "ai-1",
//             title: "AI Recommended Events",
//             description: data.recommendations,
//           },
//         ]);
//       } else {
//         setRecommendedEvents([]);
//       }
//       // 🧠 FIX ENDS HERE
//     } catch (error) {
//       console.error("Error fetching AI recommendations:", error);
//       alert("Failed to get AI recommendations.");
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const displayBookings = userBookings.length > 0 ? userBookings : bookings;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       <div className="text-center mb-12">
//         <h1 className="heading-1 mb-4 text-white">My Bookings</h1>
//         <p className="body-text max-w-2xl mx-auto text-gray-300">
//           Manage your event bookings and download your tickets
//         </p>
//       </div>

//       {/* If no bookings */}
//       {bookings.length === 0 ? (
//         <div className="text-center py-20 bg-gray-800 rounded-2xl border border-gray-700">
//           <div className="text-gray-500 mb-6">
//             <Calendar size={80} className="mx-auto" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-400 mb-4">No bookings yet</h3>
//           <p className="text-gray-300 mb-8 max-w-md mx-auto">
//             Start exploring events and book your first ticket to see your bookings here!
//           </p>

//           {/* AI Recommendation Section */}
//           <button
//             onClick={() => setShowInterestInput(!showInterestInput)}
//             className="btn-primary text-lg px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl"
//           >
//             Need Recommendation
//           </button>

//           {showInterestInput && (
//             <div className="mt-8 space-y-4 max-w-md mx-auto">
//               <input
//                 type="text"
//                 value={interests}
//                 onChange={(e) => setInterests(e.target.value)}
//                 placeholder="Type your interests (e.g., Music, Technology, Sports)"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring focus:ring-blue-500"
//               />
//               <button
//                 onClick={handleAIRecommendation}
//                 disabled={aiLoading}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
//               >
//                 {aiLoading ? "Getting Recommendations..." : "Get Recommendations"}
//               </button>
//             </div>
//           )}

//           {/* ✨ STYLED RECOMMENDED EVENTS SECTION */}
// {recommendedEvents.length > 0 && (
//   <div className="mt-16">
//     <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 text-center mb-10">
//       🌟 Recommended For You
//     </h2>

//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//       {recommendedEvents.map((event) =>
//   event.title && event.description ? (
//     <div
//       key={event._id || event.title}
//       className="group relative p-6 rounded-2xl shadow-xl border border-gray-700 bg-gray-900 hover:shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
//     >
//       {/* ✅ Event image */}
//       {event.imageUrl && (
//         <img
//           src={event.imageUrl}
//           alt={event.title}
//           className="w-full h-56 object-cover rounded-xl mb-4"
//           onError={(e) => (e.target.src = "https://via.placeholder.com/600x400.png?text=Event+Image")}
//         />
//       )}

//       <div className="relative z-10">
//         <h3 className="text-2xl font-bold text-white mb-3">{event.title}</h3>
//         <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-4">{event.description}</p>
//         <button
//           onClick={() => {
//             setSelectedEvent(event);
//             setCurrentView("details");
//           }}
//           className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition"
//         >
//           View Details
//         </button>
//       </div>
//     </div>
//   ) : (

//           <div className="relative z-10">
//             <EventCard
//               key={event._id}
//               event={event}
//               onClick={() => {
//                 setSelectedEvent(event);
//                 setCurrentView("details");
//               }}
//             />
//           </div>
//         )
//       )}
//     </div>
//   </div>
// )}

//         </div>
//       ) : (
//         /* If user has bookings */
//         <div className="space-y-8">
//           {displayBookings.map((booking) => {
//             const event = booking.eventId;
//             return (
//               <div key={booking._id} className="card card-hover p-8">
//                 <div className="flex flex-col lg:flex-row gap-8">
//                   {event && event.imageUrl && (
//                     <img
//                       src={event.imageUrl}
//                       alt={event.title}
//                       className="w-full lg:w-64 h-48 object-cover rounded-2xl shadow-md"
//                     />
//                   )}
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between mb-6">
//                       <div>
//                         <h3 className="text-2xl font-bold mb-4 text-white">
//                           {event ? event.title : "Event"}
//                         </h3>
//                         <div className="space-y-3 text-gray-300">
//                           <div className="flex items-center gap-3">
//                             <Calendar size={18} className="text-blue-600" />
//                             <span className="font-medium">
//                               {event &&
//                                 new Date(event.date).toLocaleDateString("en-US", {
//                                   weekday: "long",
//                                   month: "long",
//                                   day: "numeric",
//                                   year: "numeric",
//                                 })}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-3">
//                             <Clock size={18} className="text-blue-600" />
//                             <span className="font-medium">{event && event.time}</span>
//                           </div>
//                           <div className="flex items-center gap-3">
//                             <MapPin size={18} className="text-blue-600" />
//                             <span className="font-medium">{event && event.venue}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3 px-4 py-2 bg-green-700 text-green-300 rounded-full font-bold text-sm">
//                         <Check size={18} />
//                         {booking.status}
//                       </div>
//                     </div>

//                     <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between pt-6 border-t border-gray-700">
//                       <div className="flex flex-col sm:flex-row gap-4">
//                         <div>
//                           <span className="text-gray-300 font-medium">Tickets: </span>
//                           <span className="font-bold text-lg text-white">
//                             {booking.tickets}
//                           </span>
//                         </div>
//                         <div>
//                           <span className="text-gray-300 font-medium">Total: </span>
//                           <span className="font-bold text-2xl text-blue-400">
//                             ${booking.totalAmount}
//                           </span>
//                         </div>
//                       </div>
//                       <button
//                         onClick={async () => {
//                           try {
//                             const blob = await bookingsAPI.downloadTicket(booking._id);
//                             const url = window.URL.createObjectURL(blob);
//                             const a = document.createElement("a");
//                             a.href = url;
//                             a.download = `e-ticket-${booking._id}.pdf`;
//                             document.body.appendChild(a);
//                             a.click();
//                             window.URL.revokeObjectURL(url);
//                             document.body.removeChild(a);
//                           } catch (err) {
//                             console.error("Failed to download ticket:", err);
//                             alert("Failed to download ticket. Please try again.");
//                           }
//                         }}
//                         className="btn-secondary flex items-center gap-3 px-6 py-3 rounded-xl font-bold"
//                       >
//                         <Download size={20} />
//                         Download E-Ticket
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {/* Recommended Events Section for users with bookings */}
//           {recommendedEvents.length > 0 && (
//             <div className="mt-16">
//               <div className="text-center mb-10">
//                 <h2 className="heading-2 mb-4 text-white">Recommended for You</h2>
//                 <p className="text-gray-300">Based on your booking history</p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {recommendedEvents.map(event => (
//                   <EventCard
//                     key={event._id}
//                     event={event}
//                     onClick={() => {
//                       setSelectedEvent && setSelectedEvent(event);
//                       setCurrentView && setCurrentView('details');
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Download, Check } from "lucide-react";
import EventCard from "./EventCard";
import { bookingsAPI, recommendationsAPI } from "../services/api";
import axios from "axios";

const UserDashboard = ({
  bookings,
  setCurrentView,
  setSelectedEvent,
  setBookings,
}) => {
  const [userBookings, setUserBookings] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInterestInput, setShowInterestInput] = useState(false);
  const [interests, setInterests] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // ✅ Get userId from localStorage (make sure user is saved after login)
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || user?.id;
  // const user = JSON.parse(localStorage.getItem("user"));
  // const userId = user?._id || user?.id;


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const fetchedBookings = await bookingsAPI.getUserBookings();
        setUserBookings(fetchedBookings);
        setBookings(fetchedBookings);
        // Fetch recommendations for users with bookings
        try {
          const recRes = await recommendationsAPI.getRecommendations(userId);
          console.log('Recommendations API response:', recRes);
          const recs = recRes && recRes.recommendations ? recRes.recommendations : [];
          setRecommendedEvents(recs.slice(0, 3));
        } catch (recErr) {
          console.error('Failed to fetch recommendations:', recErr);
          setRecommendedEvents([]);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load dashboard data");
        setRecommendedEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setBookings]);

  // ✅ AI Recommendation Handler for new users
  // const handleAIRecommendation = async () => {
  //   const userId = localStorage.getItem("userId");
  //   if (!userId) {
  //     alert("User not found. Please login again.");
  //     return;
  //   }
  const handleAIRecommendation = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || user?.id;

  if (!userId) {
    alert("User not found. Please login again.");
    return;
  }


if (!interests.trim()) {
      alert("Please enter your interests first!");
      return;
    }

    console.log("Sending search query:", interests);

    try {
      setAiLoading(true);
      
      // First, save the search query with embedding
      await axios.post("http://localhost:5000/api/recommendations/search", {
        userId,
        query: interests,
      });
      
      // Then fetch personalized recommendations
      const res = await axios.get(`http://localhost:5000/api/recommendations/${userId}?limit=5`);

      const data = res.data;
      console.log("🤖 AI Response:", data);

      if (Array.isArray(data.recommendations)) {
        setRecommendedEvents(data.recommendations);
      } else if (typeof data.recommendations === "string") {
        setRecommendedEvents([
          {
            _id: "ai-1",
            title: "AI Recommended Events",
            description: data.recommendations,
          },
        ]);
      } else {
        setRecommendedEvents([]);
      }
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
      alert("Failed to get AI recommendations.");
    } finally {
      setAiLoading(false);
    }
  };

  const displayBookings = userBookings.length > 0 ? userBookings : bookings;
  const hasBookings = bookings && bookings.length > 0;
  const shouldShowRecommendationInput = recommendedEvents.length === 0 || showInterestInput;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="heading-1 mb-4 text-white">My Bookings</h1>
        <p className="body-text max-w-2xl mx-auto text-gray-300">
          Manage your event bookings and download your tickets
        </p>
      </div>

      {/* If no bookings */}
      {!hasBookings ? (
        <div className="text-center py-20 bg-gray-800 rounded-2xl border border-gray-700">
          <div className="text-gray-500 mb-6">
            <Calendar size={80} className="mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-gray-400 mb-4">
            No bookings yet
          </h3>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Start exploring events and book your first ticket to see your
            bookings here!
          </p>

          {/* AI Recommendation Section */}
          <button
            onClick={() => setShowInterestInput(!showInterestInput)}
            className="btn-primary text-lg px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl"
          >
            Need Recommendation?
          </button>

          {showInterestInput && (
            <div className="mt-8 space-y-4 max-w-md mx-auto">
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Type your interests (e.g., Music, Technology, Sports)"
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring focus:ring-blue-500"
              />
              <button
                onClick={handleAIRecommendation}
                disabled={aiLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                {aiLoading
                  ? "Getting Recommendations..."
                  : "Get Recommendations"}
              </button>
            </div>
          )}

          {/* Recommended Events Section */}
          {recommendedEvents.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 text-center mb-10">
                🌟 Recommended For You
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedEvents.map((event) =>
                  event.title && event.description ? (
                    <div
                      key={event._id || event.title}
                      className="group relative p-6 rounded-2xl shadow-xl border border-gray-700 bg-gray-900 hover:shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
                    >
                      {event.imageUrl && (
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-56 object-cover rounded-xl mb-4"
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/600x400.png?text=Event+Image")
                          }
                        />
                      )}

                      <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {event.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-4">
                          {event.description}
                        </p>
                        <button
                          onClick={() => {
                            setSelectedEvent(event);
                            setCurrentView("details");
                          }}
                          className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* If user has bookings */
        <div className="space-y-8">
          {displayBookings.map((booking) => {
            const event = booking.eventId;
            return (
              <div key={booking._id} className="card card-hover p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {event && event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full lg:w-64 h-48 object-cover rounded-2xl shadow-md"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-white">
                          {event ? event.title : "Event"}
                        </h3>
                        <div className="space-y-3 text-gray-300">
                          <div className="flex items-center gap-3">
                            <Calendar size={18} className="text-blue-600" />
                            <span className="font-medium">
                              {event &&
                                new Date(event.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock size={18} className="text-blue-600" />
                            <span className="font-medium">
                              {event && event.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin size={18} className="text-blue-600" />
                            <span className="font-medium">
                              {event && event.venue}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 px-4 py-2 bg-green-700 text-green-300 rounded-full font-bold text-sm">
                        <Check size={18} />
                        {booking.status}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between pt-6 border-t border-gray-700">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div>
                          <span className="text-gray-300 font-medium">
                            Tickets:{" "}
                          </span>
                          <span className="font-bold text-lg text-white">
                            {booking.tickets}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-300 font-medium">
                            Total:{" "}
                          </span>
                          <span className="font-bold text-2xl text-blue-400">
                            ${booking.totalAmount}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={async () => {
                          try {
                            const blob = await bookingsAPI.downloadTicket(
                              booking._id
                            );
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `e-ticket-${booking._id}.pdf`;
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                            document.body.removeChild(a);
                          } catch (err) {
                            console.error("Failed to download ticket:", err);
                            alert("Failed to download ticket. Please try again.");
                          }
                        }}
                        className="btn-secondary flex items-center gap-3 px-6 py-3 rounded-xl font-bold"
                      >
                        <Download size={20} />
                        Download E-Ticket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Recommended Events Section for users with bookings or when showing recommendations */}
          <div className="mt-16">
            {recommendedEvents.length > 0 ? (
              <>
                <div className="text-center mb-10">
                  <h2 className="heading-2 mb-4 text-white">
                    Recommended for You
                  </h2>
                  <p className="text-gray-300">Based on your booking history</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recommendedEvents.map((event) => (
                    <EventCard
                      key={event._id}
                      event={event}
                      onClick={() => {
                        setSelectedEvent && setSelectedEvent(event);
                        setCurrentView && setCurrentView("details");
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              // Show input for new interests when no recommendations
              <div className="text-center py-12 bg-gray-800/50 rounded-2xl border border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Get Personalized Recommendations
                </h2>
                <p className="text-gray-300 mb-6">
                  Tell us your interests to get event suggestions
                </p>
                <div className="space-y-4 max-w-md mx-auto">
                  <input
                    type="text"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="Type your interests (e.g., Music, Technology, Sports)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAIRecommendation}
                    disabled={aiLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
                  >
                    {aiLoading ? "Getting Recommendations..." : "Get Recommendations"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
