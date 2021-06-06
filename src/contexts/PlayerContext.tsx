import { createContext, ReactNode, useState } from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    Play: (episode: Episode) => void;
    PlayList: (list: Episode[], index: number) => void;
    hasNext: boolean;
    playNext: () => void;
    hasPrevious: boolean;
    playPrevious: () => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
}

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)
  
    function Play(episode: Episode) {
      setEpisodeList([episode])
      setCurrentEpisodeIndex(0)
      setIsPlaying(true)
    }

    function PlayList(list: Episode[], index: number) {
      setEpisodeList(list)
      setCurrentEpisodeIndex(index)
      setIsPlaying(true)
    }
  
    function togglePlay() {
      setIsPlaying(!isPlaying)
    }
    
    function toggleLoop() {
      setIsLooping(!isLooping)
    }

    function toggleShuffle() {
      setIsShuffling(!isShuffling)
    }

    function clearPlayerState() {
      setEpisodeList([])
      setCurrentEpisodeIndex(0)
    }

    const hasNext = isShuffling || (currentEpisodeIndex + 1) >= episodeList.length
    const hasPrevious = currentEpisodeIndex > 0

    function playNext() {

      if (isShuffling) {
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
        setCurrentEpisodeIndex(nextRandomEpisodeIndex)
      }else if (hasNext) {
        return
      }
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
    
    function playPrevious() {
      if (hasPrevious) {
        setCurrentEpisodeIndex(currentEpisodeIndex - 1)
      }
    }
  
    function setPlayingState(state: boolean) {
      setIsPlaying(state)
    }
  
    return (
        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            Play,
            PlayList,
            hasNext,
            playNext,
            hasPrevious,
            playPrevious,
            isPlaying,
            togglePlay,
            isLooping,
            toggleLoop,
            isShuffling,
            toggleShuffle,
            setPlayingState,
            clearPlayerState }}
        >
            { children }
        </PlayerContext.Provider>
)}