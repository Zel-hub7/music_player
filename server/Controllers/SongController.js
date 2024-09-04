const Song = require("../Models/SongModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");


//@desc all songs
//@route GET /api/songs
//@access public
const getAllSongs = asyncHandler(async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

//@desc one song by id
//@route GET /api/songs/:id
//@access public
const getSongById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const song = await Song.findById(id);
  if (!song) {
    const error = new Error("Song Not Found");
    error.statusCode = 404;
    throw error;
  }
  res.json(song);
});

//@desc create song
//@route POST /api/songs/create
//@access public
const createSong = asyncHandler(async (req, res) => {
  const data = req.body;
  if (!data) {
    const error = new Error("Please include all fields");
    error.statusCode = 400;
    throw error;
  }
  const song = await Song.create(data);
  res.status(201).json(song);
});

//@desc update song
//@route PUT /api/songs/:id
//@access public
const updateSong = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (!data) {
    const error = new Error("Please include all fields");
    error.statusCode = 400;
    throw error;
  }
  const song = await Song.findByIdAndUpdate(id, data, { new: true });
  res.json(song);
});

//@desc delete song
//@route DELETE /api/songs/:id
//@access public
const deleteSong = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the id is a valid ObjectId
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid ID");
  }

  const song = await Song.findByIdAndDelete(id);

  if (!song) {
    res.status(404);
    throw new Error("Song not found");
  }

  res.json({ message: "Song Deleted Successfully" });
});

//@desc Overall statistics
//@route GET /api/songs/stats
//@access public
const getStats = asyncHandler(async (req, res) => {
  const totalSongs = await Song.countDocuments();
  const totalArtists = await Song.distinct("artist").countDocuments();
  const totalAlbums = await Song.distinct("album").countDocuments();
  const totalGenres = await Song.distinct("genre").countDocuments();

  const songsByGenre = await Song.aggregate([
    { $group: { _id: "$genre", count: { $sum: 1 } } },
  ]);

  const songsByArtist = await Song.aggregate([
    { $group: { _id: "$artist", count: { $sum: 1 } } },
  ]);

  const albumsByArtist = await Song.aggregate([
    { $group: { _id: "$artist", albums: { $addToSet: "$album" } } },
    { $addFields: { totalAlbums: { $size: "$albums" } } },
  ]);

  const songsByAlbum = await Song.aggregate([
    { $group: { _id: "$album", count: { $sum: 1 } } },
  ]);

  res.json({
    totalSongs,
    totalArtists,
    totalAlbums,
    totalGenres,
    songsByGenre,
    songsByArtist,
    albumsByArtist,
    songsByAlbum,
  });
});

module.exports = {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  getStats,
};
