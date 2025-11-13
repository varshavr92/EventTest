import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Download, Check, ArrowRight, Ticket, Hash, Sparkles } from 'lucide-react';
import QRCode from 'qrcode';
import { bookingsAPI, eventsAPI } from '../services/api';

const BookingConfirmation = ({ bookingData }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [currentBookingData, setCurrentBookingData] = useState(bookingData);

  useEffect(() => {
    // First try to get booking data from props
    if (bookingData) {
      setCurrentBookingData(bookingData);
    } else {
      // If no bookingData prop, try to get from sessionStorage
      const storedBookingData = sessionStorage.getItem('bookingData');
      if (storedBookingData) {
        try {
          const parsedData = JSON.parse(storedBookingData);
          setCurrentBookingData(parsedData);
          // Clear sessionStorage after using it
          sessionStorage.removeItem('bookingData');
        } catch (error) {
          console.error('Error parsing stored booking data:', error);
        }
      }
    }
  }, [bookingData]);

  useEffect(() => {
    if (currentBookingData) {
      const eventForQr = currentBookingData.eventId || {};
      const safeDate = (() => {
        try {
          const d = new Date(eventForQr.date);
          return isNaN(d.getTime()) ? (eventForQr.date || 'Date not available') : d.toLocaleDateString();
        } catch (e) {
          return eventForQr.date || 'Date not available';
        }
      })();
      const safeVenue = eventForQr.venue || eventForQr.location || eventForQr.venueName || 'Venue not available';

      const qrData = `Booking ID: ${currentBookingData._id}\nEvent: ${eventForQr.title}\nDate: ${safeDate}\nVenue: ${safeVenue}`;
      QRCode.toDataURL(qrData, { width: 200, margin: 1 })
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error('QR Code generation failed:', err));
    }
  }, [currentBookingData]);

  // If event details are not populated (eventId is an ID string), fetch the event
  useEffect(() => {
    const loadEventIfNeeded = async () => {
      if (!currentBookingData) return;
      const evt = currentBookingData.eventId;
      // If eventId is a string (ObjectId) or missing key fields, fetch the event
      const needsFetch = typeof evt === 'string' || !evt || (!evt.title && !evt.name && !evt.eventName);
      if (needsFetch) {
        try {
          const id = typeof evt === 'string' ? evt : (evt && evt._id) || evt;
          if (!id) return;
          const fetched = await eventsAPI.getById(id);
          // eventsAPI returns whole event object
          setCurrentBookingData(prev => ({ ...prev, eventId: fetched }));
        } catch (err) {
          console.error('Failed to fetch event details for booking confirmation:', err);
        }
      }
    };

    loadEventIfNeeded();
  }, [currentBookingData]);

  const handleDownloadTicket = async () => {
    if (!currentBookingData) return;
    try {
      setDownloading(true);
      const blob = await bookingsAPI.downloadTicket(currentBookingData._id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `e-ticket-${currentBookingData._id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to download ticket:', err);
      alert('Failed to download ticket. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (!currentBookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'}}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-600 rounded-full mb-6 shadow-2xl">
            <Ticket size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Loading Booking Details...</h1>
          <p className="text-gray-300">Please wait while we load your booking confirmation.</p>
        </div>
      </div>
    );
  }

  const event = currentBookingData.eventId;
  const bookingRef = currentBookingData._id.slice(-8).toUpperCase();
  // Normalize event fields with common fallbacks
  const eventTitle = event?.title || event?.name || event?.eventName || 'Event';
  const rawDate = event?.date || event?.startDate || event?.eventDate || event?.schedule?.date || event?.when;
  const safeDate = (() => {
    if (!rawDate) return 'Date not available';
    try {
      const d = new Date(rawDate);
      if (isNaN(d.getTime())) return String(rawDate);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return String(rawDate);
    }
  })();
  const eventVenue = event?.venue || event?.location || event?.place || event?.venueName || event?.address || 'Venue not available';

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'}}>
      <div className="w-full max-w-4xl">
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6 shadow-2xl">
              <Check size={40} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Your tickets have been booked successfully. Check your email for confirmation details.
            </p>
          </div>

          {/* Booking Details */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                <Ticket size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Booking Details</h2>
            </div>

            {/* Booking Reference */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-4 mb-6 border border-purple-500/30">
              <div className="flex items-center gap-3">
                <Hash size={20} className="text-purple-400" />
                <span className="text-sm text-purple-300 uppercase tracking-wide">Booking Reference</span>
              </div>
              <p className="text-2xl font-mono font-bold text-white mt-1">{bookingRef}</p>
            </div>

            {/* Event Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                          {eventTitle}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl">
                    <Calendar size={20} className="text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Date</p>
                      <p className="text-white font-medium">
                        {safeDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl">
                    <MapPin size={20} className="text-red-400" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Venue</p>
                      <p className="text-white font-medium">{eventVenue}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticket Summary */}
              <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-2xl p-6 border border-gray-600/50">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-yellow-400" />
                  Ticket Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Number of Tickets</span>
                    <span className="font-bold text-white text-lg">{currentBookingData.tickets}</span>
                  </div>
                  <div className="border-t border-gray-600 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Amount</span>
                      <span className="font-bold text-3xl bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        ${currentBookingData.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="mb-8">
            <div className="text-center max-w-sm mx-auto">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-center gap-2">
                <div className="p-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                  <Ticket size={20} className="text-white" />
                </div>
                Your QR Code
              </h3>

              <div className="p-3 rounded-2xl">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="Booking QR Code"
                    className="w-32 h-32 rounded-lg shadow-lg mx-auto block"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-1"></div>
                      <p className="text-gray-600 text-xs">Generating QR Code...</p>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-400 mt-6 leading-relaxed">
                Show this QR code at the event entrance for quick check-in
              </p>

              {/* Decorative elements */}
              <div className="flex justify-center gap-2 mt-4">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownloadTicket}
              disabled={downloading}
              className="btn-primary flex items-center gap-3 px-6 py-3 rounded-xl font-bold"
            >
              <Download size={20} />
              {downloading ? 'Downloading...' : 'Download E-Ticket'}
            </button>

            <button
              onClick={() => window.location.href = '/dashboard'}
              className="btn-secondary flex items-center gap-3 px-6 py-3 rounded-xl font-bold"
            >
              Go to My Bookings
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;