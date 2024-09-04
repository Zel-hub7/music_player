const router = require("express").Router();
const {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  getStats,
} = require("../Controllers/SongController");

// Get all songs
router.get("/", getAllSongs);

// Create a song
router.post("/create", createSong);

// Overall statistics
router.get("/stats", getStats);

// Get a song by ID
router.get("/:id", getSongById);

// Update a song
router.put("/:id", updateSong);

// Delete a song
router.delete("/:id", deleteSong);

module.exports = router;
