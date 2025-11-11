// // // // // routes/recommendation.js
// // // // const express = require("express");
// // // // const dotenv = require("dotenv");
// // // // const { GoogleGenerativeAI } = require("@google/generative-ai");
// // // // const Event = require("../models/Event");

// // // // dotenv.config();
// // // // const router = express.Router();

// // // // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // // // // POST /api/recommendations
// // // // router.post("/", async (req, res) => {
// // // //   try {
// // // //     const { interests } = req.body;

// // // //     if (!interests || interests.trim() === "") {
// // // //       return res.status(400).json({ message: "Please provide interests" });
// // // //     }

// // // //     // Fetch active upcoming events
// // // //     const events = await Event.find({
// // // //       isActive: true,
// // // //       date: { $gte: new Date() },
// // // //     });

// // // //     if (events.length === 0) {
// // // //       return res.json({ recommendations: [] });
// // // //     }

// // // //     const eventList = events
// // // //       .map(
// // // //         (e) =>
// // // //           `Title: ${e.title}, Category: ${e.category}, Description: ${e.description}`
// // // //       )
// // // //       .join("\n");

// // // //     const prompt = `
// // // //       The user is interested in: "${interests}".
// // // //       From this event list, recommend 3-5 that best match and give short reasons.

// // // //       Events:
// // // //       ${eventList}

// // // //       Respond in strict JSON like this:
// // // //       [{"title":"Event Name","reason":"Short reason"}]
// // // //     `;

// // // //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
// // // //     const result = await model.generateContent(prompt);
// // // //     const responseText = result.response.text();

// // // //     console.log("Gemini raw response:", responseText); // 🔍 debug output

// // // //     // Safely extract JSON (in case Gemini adds text before/after)
// // // //     const jsonMatch = responseText.match(/\[.*\]/s);
// // // //     let recommendations = [];

// // // //     if (jsonMatch) {
// // // //       try {
// // // //         recommendations = JSON.parse(jsonMatch[0]);
// // // //       } catch (err) {
// // // //         console.error("JSON parse failed:", err);
// // // //       }
// // // //     }

// // // //     // Match with DB events
// // // //     const recommendedEvents = events.filter((event) =>
// // // //       recommendations.some(
// // // //         (rec) => event.title.toLowerCase() === rec.title.toLowerCase()
// // // //       )
// // // //     );

// // // //     res.json({ recommendations: recommendedEvents });
// // // //   } catch (error) {
// // // //     console.error("Error generating recommendations:", error);
// // // //     res.status(500).json({ message: "Error generating recommendations", error: error.message });
// // // //   }
// // // // });

// // // // module.exports = router;


// // // // // routes/recommendation.js
// // // // const express = require("express");
// // // // const dotenv = require("dotenv");
// // // // const { GoogleGenerativeAI } = require("@google/generative-ai");
// // // // const Event = require("../models/Event");

// // // // dotenv.config();
// // // // const router = express.Router();

// // // // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // // // router.post("/", async (req, res) => {
// // // //   try {
// // // //     const { interests } = req.body;

// // // //     if (!interests || interests.trim() === "") {
// // // //       return res.status(400).json({ message: "Please provide interests" });
// // // //     }

// // // //     const events = await Event.find({
// // // //       isActive: true,
// // // //       date: { $gte: new Date() },
// // // //     });

// // // //     if (events.length === 0) {
// // // //       return res.json({ recommendations: [] });
// // // //     }

// // // //     const eventList = events
// // // //       .map((e) => `Title: ${e.title}, Category: ${e.category}, Description: ${e.description}`)
// // // //       .join("\n");

// // // //     const prompt = `
// // // //       The user is interested in: "${interests}".
// // // //       From this event list, recommend 3-5 that best match and give short reasons.
// // // //       Respond in JSON like this: [{"title":"Event Name","reason":"Short reason"}]

// // // //       Events:
// // // //       ${eventList}
// // // //     `;

// // // //     // ✅ Updated model name
// // // //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// // // //     const result = await model.generateContent({
// // // //       contents: [{ role: "user", parts: [{ text: prompt }] }],
// // // //     });

// // // //     const responseText = result.response.text();
// // // //     console.log("Gemini raw response:", responseText);

// // // //     // Extract JSON safely
// // // //     const jsonMatch = responseText.match(/\[.*\]/s);
// // // //     let recommendations = [];

// // // //     if (jsonMatch) {
// // // //       try {
// // // //         recommendations = JSON.parse(jsonMatch[0]);
// // // //       } catch (err) {
// // // //         console.error("JSON parse failed:", err);
// // // //       }
// // // //     }

// // // //     const recommendedEvents = events.filter((event) =>
// // // //       recommendations.some(
// // // //         (rec) => event.title.toLowerCase() === rec.title.toLowerCase()
// // // //       )
// // // //     );

// // // //     res.json({ recommendations: recommendedEvents });
// // // //   } catch (error) {
// // // //     console.error("Error generating recommendations:", error);
// // // //     res.status(500).json({
// // // //       message: "Error generating recommendations",
// // // //       error: error.message,
// // // //     });
// // // //   }
// // // // });

// // // // module.exports = router;
// // /////////////////////////////////////////////////////////////////////////////////////

// // // // routes/recommendation.js
// // // const express = require("express");
// // // const dotenv = require("dotenv");
// // // const { GoogleGenerativeAI } = require("@google/generative-ai");
// // // const Event = require("../models/Event");

// // // dotenv.config();
// // // const router = express.Router();

// // // // Initialize Gemini API
// // // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // // router.post("/", async (req, res) => {
// // //   try {
// // //     const { interests } = req.body;

// // //     if (!interests || interests.trim() === "") {
// // //       return res.status(400).json({ message: "Please provide interests" });
// // //     }

// // //     // Fetch active upcoming events
// // //     const events = await Event.find({
// // //       isActive: true,
// // //       date: { $gte: new Date() },
// // //     });

// // //     if (events.length === 0) {
// // //       return res.json({ recommendations: [] });
// // //     }

// // //     const eventList = events
// // //       .map(
// // //         (e) =>
// // //           `Title: ${e.title}, Category: ${e.category}, Description: ${e.description}`
// // //       )
// // //       .join("\n");

// // //     const prompt = `
// // //       The user is interested in: "${interests}".
// // //       From this event list, recommend 3-5 that best match and give short reasons.
// // //       Respond strictly in JSON format like this:
// // //       [{"title":"Event Name","reason":"Short reason"}]

// // //       Events:
// // //       ${eventList}
// // //     `;

// // //     // === Gemini API Call with Error Handling ===
// // //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
// // //     let responseText = "";

// // //     try {
// // //       const result = await model.generateContent(prompt);
// // //       responseText = result.response.text();
// // //       console.log("✅ Gemini raw response:", responseText);
// // //     } catch (apiError) {
// // //       console.error("❌ Gemini API call failed:", apiError.message);
// // //       return res.status(500).json({
// // //         message: "Gemini API call failed",
// // //         error: apiError.message,
// // //       });
// // //     }

// // //     // === Parse AI JSON Response Safely ===
// // //     const jsonMatch = responseText.match(/\[.*\]/s);
// // //     let recommendations = [];

// // //     if (jsonMatch) {
// // //       try {
// // //         recommendations = JSON.parse(jsonMatch[0]);
// // //       } catch (parseErr) {
// // //         console.error("❌ JSON parse failed:", parseErr.message);
// // //       }
// // //     }

// // //     // === Match Events by Title ===
// // //     let recommendedEvents = events.filter((event) =>
// // //       recommendations.some(
// // //         (rec) =>
// // //           event.title.toLowerCase().trim() === rec.title.toLowerCase().trim()
// // //       )
// // //     );

// // //     // Fallback if Gemini didn’t return valid results
// // //     if (recommendedEvents.length === 0) {
// // //       console.warn("⚠️ No matching events from Gemini. Using fallback.");
// // //       recommendedEvents = events.slice(0, 3);
// // //     }

// // //     res.json({ recommendations: recommendedEvents });
// // //   } catch (error) {
// // //     console.error("🔥 Error generating recommendations:", error);
// // //     res.status(500).json({
// // //       message: "Error generating recommendations",
// // //       error: error.message,
// // //     });
// // //   }
// // // });

// // // module.exports = router;
// // /////////////////////////////////////////////////////////////////////////////////

// // // const express = require("express");
// // // const OpenAI = require("openai");
// // // const router = express.Router();

// // // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // // router.post("/", async (req, res) => {
// // //   try {
// // //     const { interests } = req.body;
// // //     const prompt = `Based on the user's interests: ${interests}, suggest 3 event recommendations.`;

// // //     const completion = await openai.chat.completions.create({
// // //       model: "gpt-4o-mini",
// // //       messages: [{ role: "user", content: prompt }],
// // //     });

// // //     res.json({ recommendations: completion.choices[0].message.content });
// // //   } catch (error) {
// // //     console.error("❌ OpenAI API call failed:", error);
// // //     res.status(500).json({ message: "OpenAI API call failed", error });
// // //   }
// // // });

// // // module.exports = router;
// // ///////////////////////////////////////

// // const express = require("express");
// // const Event = require("../models/Event");
// // const router = express.Router();

// // router.post("/", async (req, res) => {
// //   try {
// //     const { interests } = req.body;
// //     console.log("User interests:", interests);

// //     // Find events that match interests
// //     const query = {
// //       $or: [
// //         { title: { $regex: interests, $options: "i" } },
// //         { description: { $regex: interests, $options: "i" } },
// //         { category: { $regex: interests, $options: "i" } },
// //       ],
// //     };

// //     let foundEvents = await Event.find(query).limit(3);

// //     // If none found, create AI-style events and store in DB
// //     if (foundEvents.length === 0) {
// //       const aiEvents = [
// //         {
// //           title: `${interests} Festival 2025`,
// //           description: `Celebrate ${interests} with live shows, workshops, and more.`,
// //           venue: "Downtown Convention Center",
// //           date: new Date(Date.now() + 7 * 86400000),
// //           time: "6:00 PM",
// //           price: 500,
// //           category: interests,
// //           imageUrl:
// //             "https://images.unsplash.com/photo-1504805572947-34fad45aed93",
// //           isAI: true,
// //         },
// //         {
// //           title: `${interests} Workshop`,
// //           description: `Hands-on sessions and networking opportunities for ${interests} lovers.`,
// //           venue: "Tech Park Hall 2",
// //           date: new Date(Date.now() + 14 * 86400000),
// //           time: "10:00 AM",
// //           price: 350,
// //           category: interests,
// //           imageUrl:
// //             "https://images.unsplash.com/photo-1515162305280-7a3d008e8f7f",
// //           isAI: true,
// //         },
// //         {
// //           title: `${interests} Meetup`,
// //           description: `Join enthusiasts of ${interests} for networking, talks, and fun!`,
// //           venue: "City Arena",
// //           date: new Date(Date.now() + 21 * 86400000),
// //           time: "4:00 PM",
// //           price: 250,
// //           category: interests,
// //           imageUrl:
// //             "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
// //           isAI: true,
// //         },
// //       ];

// //       // Insert into DB
// //       foundEvents = await Event.insertMany(aiEvents);
// //     }

// //     res.json({ recommendations: foundEvents });
// //   } catch (error) {
// //     console.error("Recommendation Error:", error);
// //     res.status(500).json({ message: "Failed to get recommendations" });
// //   }
// // });

// // module.exports = router;
// /////////////////////////////////////

// // const express = require("express");
// // const Event = require("../models/Event");
// // const OpenAI = require("openai");

// // const router = express.Router();
// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // router.post("/", async (req, res) => {
// //   try {
// //     const { interests, userId } = req.body;
// //     console.log("User interests:", interests);

// //     // Step 1: Fetch existing events
// //     const allEvents = await Event.find();
// //     const eventText = allEvents.map(e => `${e.title}: ${e.description}`).join("\n");

// //     // Step 2: Ask OpenAI to recommend the best ones
// //     const prompt = `
// //     The user is interested in "${interests}".
// //     From this list of events:
// //     ${eventText}

// //     Recommend 3 events that best match their interest. Return as JSON with 
// //     fields: title, description, venue, date, time, price, category, imageUrl.
// //     `;

// //     const response = await openai.chat.completions.create({
// //       model: "gpt-4o-mini",
// //       messages: [{ role: "user", content: prompt }],
// //       temperature: 0.7,
// //     });

// //     const aiText = response.choices[0].message.content;
// //     console.log("AI Response:", aiText);

// //     const recommendations = JSON.parse(aiText);
// //     res.json({ recommendations });
// //   } catch (error) {
// //     console.error("AI Recommendation Error:", error.message);
// //     res.status(500).json({ message: "Failed to generate AI recommendations" });
// //   }
// // });

// // module.exports = router;


// // const express = require("express");
// // const Event = require("../models/Event");
// // const OpenAI = require("openai");

// // const router = express.Router();

// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // router.post("/", async (req, res) => {
// //   try {
// //     const { interests, userId } = req.body;
// //     console.log("User interests:", interests);

// //     // Step 1: Fetch existing events from database
// //     const allEvents = await Event.find();
// //     const eventText = allEvents.map(e => `${e.title}: ${e.description}`).join("\n");

// //     // Step 2: AI prompt
// //     const prompt = `
// //     The user is interested in "${interests}".
// //     From this list of events:
// //     ${eventText}

// //     Recommend 3 events that best match their interest.
// //     Return ONLY a valid JSON array with the following fields for each event:
// //     title, description, venue, date, time, price, category, imageUrl.
// //     Do NOT include markdown, explanations, or code fences.
// //     `;

// //     // Step 3: Get AI response
// //     const response = await openai.chat.completions.create({
// //       model: "gpt-4o-mini",
// //       messages: [{ role: "user", content: prompt }],
// //       temperature: 0.7,
// //     });

// //     // Step 4: Extract and sanitize AI output
// //     let aiText = response.choices[0].message.content || "";
// //     console.log("AI Response (raw):", aiText);

// //     // Remove markdown code fences like ```json or ```
// //     aiText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();

// //     let recommendations;
// //     try {
// //       recommendations = JSON.parse(aiText);
// //     } catch (parseError) {
// //       console.error("AI Recommendation Parsing Error:", parseError.message);
// //       console.error("Sanitized AI Response:", aiText);
// //       return res.status(500).json({
// //         message: "Invalid AI response format. Could not parse JSON.",
// //         rawResponse: aiText,
// //       });
// //     }

// //     // Step 5: Send to frontend
// //     res.json({ recommendations });
// //   } catch (error) {
// //     console.error("AI Recommendation Error:", error.message);
// //     res.status(500).json({ message: "Failed to generate AI recommendations" });
// //   }
// // });

// // module.exports = router;
// const express = require("express");
// const Event = require("../models/Event");
//  const OpenAI = require("openai");

//  const router = express.Router();
//  const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });


// router.post("/", async (req, res) => {
//   try {
//     const { interests, userId } = req.body;
//     console.log("User interests:", interests);

//     const allEvents = await Event.find();
//     const eventText = allEvents.map(e => `${e.title}: ${e.description}`).join("\n");

//     const prompt = `
//     The user is interested in "${interests}".
//     From this list of events:
//     ${eventText}

//     Recommend 3 new or existing events matching their interests.
//     For new ones, create realistic details (venue, date, time, price, category, imageUrl).
//     Return a pure JSON array:
//     [ { title, description, venue, date, time, price, category, imageUrl } ]
//     `;

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.8,
//     });

//     let aiText = response.choices[0].message.content || "";
//     aiText = aiText.replace(/```json|```/g, "").trim();

//     let recommendations;
//     try {
//       recommendations = JSON.parse(aiText);
//     } catch (err) {
//       console.error("Invalid AI JSON:", aiText);
//       return res.status(500).json({ message: "Invalid AI response" });
//     }

//     // ✅ Save new AI events into database
//     const savedEvents = [];
//     for (const rec of recommendations) {
//       const exists = await Event.findOne({ title: rec.title });
//       if (!exists) {
//         const newEvent = new Event({
//           title: rec.title,
//           description: rec.description,
//           venue: rec.venue,
//           date: new Date(rec.date) || new Date(),
//           time: rec.time || "10:00 AM",
//           ticketPrice: rec.price || 100,
//           category: rec.category || "General",
//           imageUrl: rec.imageUrl || "https://via.placeholder.com/600x400.png?text=AI+Event",
//           // createdByAI: true,
//         });
//         const saved = await newEvent.save();
//         savedEvents.push(saved);
//       } else {
//         savedEvents.push(exists);
//       }
//     }

//     res.json({ recommendations: savedEvents });
//   } catch (error) {
//     console.error("AI Recommendation Error:", error.message);
//     res.status(500).json({ message: "Failed to generate AI recommendations" });
//   }
// });

// module.exports = router;


const express = require("express");
const Event = require("../models/Event");
const OpenAI = require("openai");

const router = express.Router();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { interests, userId } = req.body;
    console.log("User interests:", interests);

    // Step 1️⃣: Get all existing events from database
    const allEvents = await Event.find();
    const eventText = allEvents.map(e => `${e.title}: ${e.description}`).join("\n");

    // Step 2️⃣: Prepare AI prompt
    const prompt = `
    The user is interested in "${interests}".
    From this list of existing events:
    ${eventText}

    Recommend 3 new or existing events that match the interest.
    For new ones, generate realistic details (venue, date, time, price, category, imageUrl).
    Return ONLY a valid JSON array like:
    [
      {
        "title": "Event Title",
        "description": "Short event description",
        "venue": "Venue Name",
        "date": "2025-06-10",
        "time": "6:00 PM",
        "price": 300,
        "category": "Music",
        "imageUrl": "https://example.com/sample.jpg"
      }
    ]
    `;

    // Step 3️⃣: Request OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    // Step 4️⃣: Clean the AI output
    let aiText = response.choices[0].message.content || "";
    aiText = aiText.replace(/```json|```/g, "").trim();

    let recommendations;
    try {
      recommendations = JSON.parse(aiText);
    } catch (err) {
      console.error("Invalid AI JSON:", aiText);
      return res.status(500).json({ message: "Invalid AI response" });
    }

    // Step 5️⃣: Save new AI-generated events safely
    const savedEvents = [];
    for (const rec of recommendations) {
      const exists = await Event.findOne({ title: rec.title });
      if (!exists) {
        const newEvent = new Event({
          title: rec.title,
          description: rec.description,
          venue: rec.venue,
          date: new Date(rec.date) || new Date(),
          time: rec.time || "10:00 AM",
          ticketPrice: rec.price || 100,
          category: rec.category || "General",
          imageUrl:
  rec.imageUrl && rec.imageUrl.startsWith("http")
    ? rec.imageUrl
    : `https://source.unsplash.com/600x400/?${encodeURIComponent(rec.category || rec.title || "event")}`,
          createdBy: userId || null, // ✅ Avoid validation error
          createdByAI: true,         // ✅ Mark as AI event
        });
        const saved = await newEvent.save();
        savedEvents.push(saved);
      } else {
        savedEvents.push(exists);
      }
    }

    // Step 6️⃣: Send back recommendations
    res.json({ recommendations: savedEvents });

  } catch (error) {
    console.error("AI Recommendation Error:", error.message);
    res.status(500).json({ message: "Failed to generate AI recommendations" });
  }
});

module.exports = router;

// const express = require("express");
// const Event = require("../models/Event");
// const Booking = require("../models/Booking"); // ✅ Import booking model
// const OpenAI = require("openai");

// const router = express.Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// router.post("/", async (req, res) => {
//   try {
//     const { interests, userId } = req.body;
//     console.log("User interests:", interests);

//     // Step 1️⃣: Get all existing events
//     const allEvents = await Event.find();
//     const eventText = allEvents.map(e => `${e.title}: ${e.description}`).join("\n");

//     // Step 2️⃣: Check if user has any bookings
//     let userContext = interests;
//     if (userId) {
//       const userBookings = await Booking.find({ userId }).populate("eventId");
//       if (userBookings.length > 0) {
//         const bookedEvents = userBookings.map(b => `${b.eventId.title}: ${b.eventId.description}`).join("\n");
//         userContext = `This user has previously booked these events:\n${bookedEvents}`;
//         console.log("Using booking history for recommendations.");
//       } else {
//         console.log("No previous bookings, using manual interests.");
//       }
//     }

//     // Step 3️⃣: Prepare AI prompt
//     const prompt = `
//     ${userContext}

//     From this list of existing events:
//     ${eventText}

//     Recommend 3 events that best match the user's taste.
//     Return ONLY a valid JSON array like:
//     [
//       {
//         "title": "Event Title",
//         "description": "Short event description",
//         "venue": "Venue Name",
//         "date": "2025-06-10",
//         "time": "6:00 PM",
//         "price": 300,
//         "category": "Music",
//         "imageUrl": "https://source.unsplash.com/600x400/?music,concert"
//       }
//     ]
//     `;

//     // Step 4️⃣: Call OpenAI
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.8,
//     });

//     // Step 5️⃣: Parse AI output safely
//     let aiText = response.choices[0].message.content || "";
//     aiText = aiText.replace(/```json|```/g, "").trim();

//     let recommendations;
//     try {
//       recommendations = JSON.parse(aiText);
//     } catch (err) {
//       console.error("Invalid AI JSON:", aiText);
//       return res.status(500).json({ message: "Invalid AI response" });
//     }

//     // Step 6️⃣: Save AI-generated events if new
//     const savedEvents = [];
//     for (const rec of recommendations) {
//       const exists = await Event.findOne({ title: rec.title });
//       if (!exists) {
//         const newEvent = new Event({
//           title: rec.title,
//           description: rec.description,
//           venue: rec.venue,
//           date: new Date(rec.date) || new Date(),
//           time: rec.time || "10:00 AM",
//           ticketPrice: rec.price || 100,
//           category: rec.category || "General",
//           imageUrl:
//             rec.imageUrl ||
//             `https://source.unsplash.com/600x400/?${rec.category || "event"}`,
//           createdBy: userId || null,
//           createdByAI: true,
//         });
//         const saved = await newEvent.save();
//         savedEvents.push(saved);
//       } else {
//         savedEvents.push(exists);
//       }
//     }

//     res.json({ recommendations: savedEvents });

//   } catch (error) {
//     console.error("AI Recommendation Error:", error.message);
//     res.status(500).json({ message: "Failed to generate AI recommendations" });
//   }
// });

// module.exports = router;




