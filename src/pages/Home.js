import React, {useEffect} from 'react';
//Redux
import {useDispatch, useSelector} from 'react-redux';
import {loadGames} from '../actions/gamesAction';
//Components
import Game from '../components/Game';
import GameDetail from '../components/GameDetail';
//Styling
import styled from 'styled-components';
//Animation
import {motion, AnimatePresence, AnimateSharedLayout} from 'framer-motion';
import {fadeIn} from '../animations';
//Use location
import {useLocation} from 'react-router-dom';

const Home = () => {
    //Get the current location
    const location = useLocation();
    const pathId = location.pathname.split('/')[2];

    //Fetch games
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(loadGames());
    }, [dispatch]);
    //Get that data back
    const {popularGames, newGames, upcomingGames, searchedGames} = useSelector(state => state.games);
    
    return(
        <GameList variants={fadeIn} initial="hidden" animate="show">
            <AnimateSharedLayout type="crossfade">
                <AnimatePresence>
                    {pathId && 
                        <GameDetail pathId={pathId} />
                    }
                </AnimatePresence>
                {searchedGames.length ? (
                    <motion.div className="searched-games">
                        <h2>Searched Games</h2>
                        <Games>
                            {searchedGames.map((game) => (
                                <Game name={game.name} released={game.released} id={game.id} image={game.background_image} key={game.id} />
                            ))}
                        </Games>
                    </motion.div>
                ) : ''}
                <motion.div className="upcoming-games">
                    <h2>Upcoming Games</h2>
                    <Games>
                        {upcomingGames.map((game) => (
                            <Game name={game.name} released={game.released} id={game.id} image={game.background_image} key={game.id} />
                        ))}
                    </Games>
                </motion.div>
                <motion.div className="popular-games">
                    <h2>Popular Games</h2>
                    <Games>
                        {popularGames.map((game) => (
                            <Game name={game.name} released={game.released} id={game.id} image={game.background_image} key={game.id} />
                        ))}
                    </Games>
                </motion.div>
                <motion.div className="new-games">
                    <h2>New Games</h2>
                    <Games>
                        {newGames.map((game) => (
                            <Game name={game.name} released={game.released} id={game.id} image={game.background_image} key={game.id} />
                        ))}
                    </Games>
                </motion.div>
            </AnimateSharedLayout>
        </GameList>
    );
};

const GameList = styled(motion.div)`
    padding: 0rem 5rem 5rem 5rem;

    h2 {
        padding: 5rem 0rem;
    }
`;

const Games = styled(motion.div)`
    min-height: 80vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 1.5rem;

    @media screen and (max-width: 800px) {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;
        gap: 1rem;
    }
`;

export default Home;