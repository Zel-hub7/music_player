import { useState } from "react";
import styled from "@emotion/styled";
import {
  Modal,
  Box,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PersonIcon from "@mui/icons-material/Person";
import AlbumIcon from "@mui/icons-material/Album";
import CategoryIcon from "@mui/icons-material/Category";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
} from "../redux/songsSlice";
import { updateSongAPI } from "../services/ApiHandler";
import { RootState } from "../redux/store";
import { Song } from "../Types/SongTypes";

const PopupContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  background-color: #222;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0px 12px 35px rgba(0, 0, 0, 0.6);
  color: #f0f0f0;
`;

const FormField = styled(TextField)`
  margin-bottom: 1.2rem;
  width: 100%;

  & label {
    color: #b8a1d3;
  }

  & .MuiInputBase-input {
    color: #d4d4d4;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #b8a1d3;
  }
`;

const ActionButton = styled(Button)`
  margin-top: 1.5rem;
  color: #ffffff;
  background-color: #6a3e98;

  &:hover {
    background-color: #54317a;
  }
`;

const GenreSelect = styled(FormControl)`
  margin-bottom: 1.2rem;
  width: 100%;

  & label {
    color: #b8a1d3;
  }

  & .MuiInputBase-root {
    color: #d4d4d4;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #b8a1d3;
  }

  & .MuiSvgIcon-root {
    color: #b8a1d3;
  }
`;

interface UpdateSongProps {
  song: Song;
  onClose: () => void;
  onSave: () => void;
}

const UpdateSong: React.FC<UpdateSongProps> = ({ song, onClose, onSave }) => {
  const [title, setTitle] = useState(song.title || "");
  const [artist, setArtist] = useState(song.artist || "");
  const [album, setAlbum] = useState(song.album || "");
  const [genre, setGenre] = useState(song.genre || "");
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.songs.loading);

  const handleUpdate = async () => {
    if (!title || !artist) {
      alert("Title and Artist are required");
      return;
    }
    const updatedSong = { ...song, title, artist, album, genre };

    dispatch(updateSongStart({ id: song._id, updatedSong: updatedSong }));

    try {
      const response = await updateSongAPI(song._id, updatedSong);
      dispatch(updateSongSuccess(response.data));
      onClose();
      onSave();
    } catch (error) {
      console.log(error);
      dispatch(updateSongFailure((error as Error).message));
    }
  };

  return (
    <Modal open onClose={onClose}>
      <PopupContainer>
        <h2>Update Song</h2>
        <FormField
          label="Song Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MusicNoteIcon style={{ color: "#b8a1d3" }} />
              </InputAdornment>
            ),
          }}
          required
        />
        <FormField
          label="Artist"
          variant="outlined"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon style={{ color: "#b8a1d3" }} />
              </InputAdornment>
            ),
          }}
          required
        />
        <FormField
          label="Album"
          variant="outlined"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlbumIcon style={{ color: "#b8a1d3" }} />
              </InputAdornment>
            ),
          }}
        />
        <GenreSelect variant="outlined">
          <InputLabel>Genre</InputLabel>
          <Select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            label="Genre"
            startAdornment={
              <InputAdornment position="start">
                <CategoryIcon style={{ color: "#b8a1d3" }} />
              </InputAdornment>
            }
          >
            <MenuItem value={"Rock"}>Rock</MenuItem>
            <MenuItem value={"Pop"}>Pop</MenuItem>
            <MenuItem value={"Jazz"}>Jazz</MenuItem>
            <MenuItem value={"Classical"}>Classical</MenuItem>
            <MenuItem value={"Hip-hop"}>Hip-hop</MenuItem>
            <MenuItem value={"Country"}>Country</MenuItem>
            <MenuItem value={"Electronic"}>Electronic</MenuItem>
            <MenuItem value={"Reggae"}>Reggae</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </GenreSelect>
        {loading ? (
          <CircularProgress style={{ marginTop: "1.5rem", color: "#b8a1d3" }} />
        ) : (
          <ActionButton onClick={handleUpdate}>Update</ActionButton>
        )}
      </PopupContainer>
    </Modal>
  );
};

export default UpdateSong;
