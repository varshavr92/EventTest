// const express = require('express');
// const path = require('path');
// const multer = require('multer');
// const fs = require('fs');
// const Event = require('../models/Event');
// const { authenticateToken, requireAdmin } = require('../middleware/auth');

// const router = express.Router();

// // Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Multer config - store files locally in backend/uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadsDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//   }
// });

// const upload = multer({ storage });

// // Get all events (public - only active)
// router.get('/', async (req, res) => {
//   try {
//     const { category } = req.query;
//     let query = { isActive: true };

//     if (category && category !== 'All') {
//       query.category = category;
//     }

//     const events = await Event.find(query).populate('createdBy', 'name email');
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get all events for admin (including inactive)
// router.get('/admin/all', authenticateToken, requireAdmin, async (req, res) => {
//   try {
//     const events = await Event.find({}).populate('createdBy', 'name email');
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get event by ID (public)
// router.get('/:id', async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Create event (admin only)
// // Accept optional image file under field name 'image'
// router.post('/', authenticateToken, requireAdmin, upload.single('image'), async (req, res) => {
//   try {
//     const { title, description, category, venue, date, ticketPrice } = req.body;
//     const imageUrl = req.file ? `/api/uploads/${req.file.filename}` : null;
//     const event = await Event.create({
//       title,
//       description,
//       category,
//       venue,
//       date,
//       ticketPrice,
//       imageUrl,
//       createdBy: req.user.id
//     });
//     res.status(201).json(event);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Update event (admin only)
// router.put('/:id', authenticateToken, requireAdmin, upload.single('image'), async (req, res) => {
//   try {
//     const update = { ...req.body };
//     if (req.file) {
//       update.imageUrl = `/api/uploads/${req.file.filename}`;
//     }
//     const event = await Event.findByIdAndUpdate(req.params.id, update, { new: true });
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Delete event (admin only) - Hard delete
// router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
//   try {
//     const event = await Event.findByIdAndDelete(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.json({ message: 'Event deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Toggle active status (admin only)
// router.put('/:id/toggle-active', authenticateToken, requireAdmin, async (req, res) => {
//   try {
//     const { isActive } = req.body;
//     const event = await Event.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const Event = require('../models/Event');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const cloudinary = require('../config/cloudinary');
const { pipeline } = require("@xenova/transformers");

// Load MiniLM model once
let embedder;
(async () => {
  console.log("🔄 Loading local embedding model for events...");
  embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  console.log("✅ MiniLM model loaded for events");
})();

// Get embedding
async function getEmbedding(text) {
  const output = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

const router = express.Router();

// Ensure uploads directory exists (for temporary storage)
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer config - store files temporarily before uploading to Cloudinary
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// Get all events (public - only active)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = { isActive: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    const events = await Event.find(query).populate('createdBy', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all events for admin (including inactive)
router.get('/admin/all', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const events = await Event.find({}).populate('createdBy', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get event by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create event (admin only)
// Accept optional image file under field name 'image'
router.post('/', authenticateToken, requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, venue, date, ticketPrice } = req.body;
    let imageUrl = null;

    if (req.file) {
      // Upload to Cloudinary (no transformations since images are already compressed on frontend)
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'event-management/events',
        public_id: `event-${Date.now()}`
      });
      imageUrl = result.secure_url;

      // Clean up temporary file
      fs.unlinkSync(req.file.path);
    }

    // Generate embedding for the event
    const eventText = `${title} ${description}`;
    const embedding = await getEmbedding(eventText);

    const event = await Event.create({
      title,
      description,
      category,
      venue,
      date,
      ticketPrice,
      imageUrl,
      createdBy: req.user.id,
      embedding
    });
    res.status(201).json(event);
  } catch (error) {
    // Clean up temporary file if upload failed
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update event (admin only)
router.put('/:id', authenticateToken, requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const update = { ...req.body };

    if (req.file) {
      // Upload to Cloudinary (no transformations since images are already compressed on frontend)
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'event-management/events',
        public_id: `event-${Date.now()}`
      });
      update.imageUrl = result.secure_url;

      // Clean up temporary file
      fs.unlinkSync(req.file.path);
    }

    const event = await Event.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    // Clean up temporary file if upload failed
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete event (admin only) - Hard delete
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle active status (admin only)
router.put('/:id/toggle-active', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { isActive } = req.body;
    const event = await Event.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get similar events by category (public)
router.get('/similar/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const similarEvents = await Event.find({
      category: event.category,
      _id: { $ne: event._id },
      isActive: true
    }).limit(3);

    res.json(similarEvents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;