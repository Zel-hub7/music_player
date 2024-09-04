import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSongsAPI, deleteSongAPI } from "../services/ApiHandler";
import {
  CircularProgress,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CreateSong from "./CreateSong";
import UpdateSong from "./UpdateSong";
import {
  getSongsStart,
  getSongsSuccess,
  getSongsFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
} from "../redux/songsSlice";
import { RootState } from "../redux/store";
import { Song } from "../Types/SongTypes";

const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  background-color: #1e1e1e;
  width: 90%;
  max-width: 1200px;
  margin: auto;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled(TextField)`
  background-color: #333;
  border-radius: 5px;
  input {
    color: #efcfa9;
  }
  label {
    color: #bbb;
  }
`;

const GenreFilter = styled(FormControl)`
  min-width: 150px;
  margin-left: 1rem;
  .MuiInputBase-root {
    color: #efcfa9;
  }
  .MuiInputLabel-root {
    color: #bbb;
  }
  .MuiSelect-icon {
    color: #efcfa9;
  }
`;

const CreateGenreButton = styled(Button)`
  color: #000;
  background-color: #4CAF50;
  &:hover {
    background-color: #45A049;
  }
`;


const SongItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  margin: 0.75rem 0;
  background: #2a2a2a;
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: #fff;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.4);
  }
`;

const SongIcon = styled(MusicNoteIcon)`
  color: #b8a1d3;
  margin-right: 1.5rem;
  font-size: 2rem;
`;

const SongTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #b8a1d3;
  font-weight: 600;
`;

const SongArtist = styled.p`
  margin: 0.25rem 0;
  font-size: 1rem;
  color: #b8a1d3;
  font-weight: 400;
`;

const SongDetails = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: white;
`;

const SongInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SongActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
`;

const PaginationButton = styled(IconButton)`
  color: #efcfa9;
`;

const PageInfo = styled.span`
  font-size: 1rem;
  color: #efcfa9;
  margin: 0 1rem;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SongList: React.FC<{ onSongChange: () => void }> = ({ onSongChange }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const songsPerPage = 5;

  const songs = useSelector((state: RootState) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSongs = async () => {
      dispatch(getSongsStart());
      try {
        const response = await getSongsAPI();
        dispatch(getSongsSuccess(response.data));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(getSongsFailure(error.message));
        } else {
          dispatch(getSongsFailure("An unknown error occurred"));
        }
      }
    };

    fetchSongs();
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    dispatch(deleteSongStart());
    try {
      await deleteSongAPI(id);
      dispatch(deleteSongSuccess(id));
      onSongChange();
      console.log(`Song with ID ${id} has been deleted.`);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        dispatch(deleteSongFailure(error.message));
      } else {
        dispatch(deleteSongFailure("An unknown error occurred"));
      }
    }
  };

  const handleUpdateClick = (song: Song) => {
    setSelectedSong(song);
  };

  const handlePageChange = (direction: "next" | "prev") => {
    if (
      direction === "next" &&
      currentPage < Math.ceil(filteredSongs.length / songsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handleGenreFilterChange = (event: SelectChangeEvent<string>) => {
    setGenreFilter(event.target.value as string);
    setCurrentPage(1); 
  };

  const filteredSongs = songs.songs.filter((song: Song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = genreFilter ? song.genre === genreFilter : true;
    return matchesSearch && matchesGenre;
  });

  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);

  if (!Array.isArray(songs.songs)) {
    return (
      <LoaderContainer>
        <CircularProgress size={60} />
      </LoaderContainer>
    );
  }

  return (
    <>
      <SongContainer>
        <ControlsContainer>
          <div style={{ display: "flex", alignItems: "center" }}>
            <SearchInput
              variant="outlined"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <GenreFilter variant="outlined">
              <InputLabel>Genre</InputLabel>
              <Select
                value={genreFilter}
                onChange={handleGenreFilterChange}
                label="Genre"
              >
                <MenuItem value="">All Genres</MenuItem>
                <MenuItem value="Rock">Rock</MenuItem>
                <MenuItem value="Pop">Pop</MenuItem>
                <MenuItem value="Jazz">Jazz</MenuItem>
                <MenuItem value="Classical">Classical</MenuItem>
                <MenuItem value="Hip-hop">Hip-hop</MenuItem>
                <MenuItem value="Country">Country</MenuItem>
                <MenuItem value="Electronic">Electronic</MenuItem>
                <MenuItem value="Reggae">Reggae</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </GenreFilter>
          </div>
          <CreateGenreButton onClick={() => setIsPopupOpen(true)}>
            Create Song
          </CreateGenreButton>
        </ControlsContainer>
        {currentSongs.reverse().map((song, index) => (
          <SongItem key={index}>
            <SongIcon />
            <SongInfoContainer>
              <SongTitle>{song.title || "Unknown Title"}</SongTitle>
              <SongArtist>{song.artist || "Unknown Artist"}</SongArtist>
              <SongDetails>
                Genre: {song.genre || "Unknown Genre"} | Album:{" "}
                {song.album || "Unknown Album"}
              </SongDetails>
            </SongInfoContainer>
            <SongActions>
              <IconButton
                onClick={() => handleUpdateClick(song)}
                aria-label="edit"
                style={{ color: "white" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(song._id)}
                aria-label="delete"
                style={{ color: "red" }}
              >
                <DeleteIcon />
              </IconButton>
            </SongActions>
          </SongItem>
        ))}
        <PaginationContainer>
          <PaginationButton
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            <ArrowBackIcon />
          </PaginationButton>
          <PageInfo>
            Page {currentPage} of{" "}
            {Math.ceil(filteredSongs.length / songsPerPage)}
          </PageInfo>
          <PaginationButton
            onClick={() => handlePageChange("next")}
            disabled={
              currentPage === Math.ceil(filteredSongs.length / songsPerPage)
            }
          >
            <ArrowForwardIcon />
          </PaginationButton>
        </PaginationContainer>
      </SongContainer>
      {isPopupOpen && (
        <CreateSong
          onClose={() => setIsPopupOpen(false)}
          onSave={onSongChange}
        />
      )}
      {selectedSong && (
        <UpdateSong
          song={selectedSong}
          onClose={() => setSelectedSong(null)}
          onSave={onSongChange}
        />
      )}
    </>
  );
};

export default SongList;
