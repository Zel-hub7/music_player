export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface NewSong {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface UpdatedSong {
  _id: string;
  title?: string;
  artist?: string;
  album?: string;
  genre?: string;
}

export interface Statistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsByGenre: { [genre: string]: number };
  songsByArtist: { [artist: string]: number };
  albumsByArtist: { [artist: string]: number };
  songsByAlbum: { [album: string]: number };
}

export const GET_SONGS = "GET_SONGS";
export const GET_SONG_BY_ID = "GET_SONG_BYid";
export const CREATE_SONG = "CREATE_SONG";
export const UPDATE_SONG_BY_ID = "UPDATE_SONG_BYid";
export const DELETE_SONG_BY_ID = "DELETE_SONG_BYid";
