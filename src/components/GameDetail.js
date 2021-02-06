import React from 'react';
//Styling
import styled from 'styled-components';
//Animation
import {motion} from 'framer-motion';
//Redux
import {useSelector} from 'react-redux';
//Use History
import {useHistory} from 'react-router-dom';
//Resize Image
import {smallImage} from '../util';
//Platform Icons
import playstation from '../img/playstation.svg';
import steam from '../img/steam.svg';
import xbox from '../img/xbox.svg';
import nintendo from '../img/nintendo.svg';
import apple from '../img/apple.svg';
import gamepad from '../img/gamepad.svg';
//Star Images
import starEmpty from '../img/star-empty.png';
import starFull from '../img/star-full.png';

const GameDetail = ({pathId}) => {
    //Get data from reducres/index.js coming from reducers/detailReducer.js
    const {screenshots, game, isLoading} = useSelector(state => state.detail);
    const history = useHistory();
    //Exit Detail
    const exitDetailHandler = (e) => {
        const element = e.target;

        if(element.classList.contains('card-shadow') || element.classList.contains('close')) {
            document.body.style.overflow = 'auto';
            history.push('/games-api');
        }
    };
    //Get Plaform Images
    const getPlatform = (platform) => {
        switch(platform) {
            case 'PlayStation 4':
                return playstation;
            case 'Xbox One':
                return xbox;
            case 'PC':
                return steam;
            case 'Nintendo Switch':
                return nintendo;
            case 'iOS':
                return apple;
            default:
                return gamepad;
        }
    }
    //Get Stars Rating
    const getRating = () => {
        const stars = [];
        const rating = Math.floor(game.rating);
        for(let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<img className="stars" key={i} src={starFull}/>);
            }
            else {
                stars.push(<img className="stars" key={i} src={starEmpty}/>);
            }
        }
        return stars;
    }
    //Get Clip
    const getClip = () => {
        const clip = game.clip;
        if (clip !== null) {
            return <video src={game.clip.clip} controls autoPlay="autoplay" loop></video>;
        }
    }
    

    return(
        <>
            {!isLoading && (
                <CardShadow onClick={exitDetailHandler} className="card-shadow">
                    <Detail layoutId={`image ${pathId}`} className="detail">
                        <Wrapper>
                            <StatsContainer style={{backgroundImage: `url(${smallImage(game.background_image, 1280)})`}}>
                                <Stats className="stats">
                                    <button onClick={exitDetailHandler} className="close">
                                        <div className="line1"></div>
                                        <div className="line2"></div>
                                    </button>
                                    <div className="rating">
                                        <motion.h3 className="title" layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                                        <p>Rating: {game.rating}</p>
                                        {getRating()}
                                        <Genre>
                                            {game.genres.map(genre => (
                                                <h4 key={genre.id}>{genre.name}</h4>
                                            ))}
                                        </Genre>
                                    </div>
                                    <Info className="info">
                                        <h3>Platforms</h3>
                                        <Platforms>
                                            {game.platforms.map(platform => (
                                                <img className="platforms" key={platform.platform.id} src={getPlatform(platform.platform.name)} alt={platform.platform.name}/>
                                            ))}
                                        </Platforms>
                                    </Info>
                                </Stats>
                            </StatsContainer>
                            <div className="videoContainer">
                                {getClip()}
                            </div>
                        </Wrapper>
                        
                        <Description className="description">
                            <p>{game.description_raw}</p>
                        </Description>
                        <Gallery className="gallery">
                            {screenshots.results.map(screenshot => (
                                <img src={smallImage(screenshot.image, 1280)} key={screenshot.id} alt=""/>
                            ))}
                        </Gallery>
                    </Detail>
                </CardShadow>
            )}
        </>
    );
};

const CardShadow = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    overflow-y: scroll;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left: 0;
    z-index: 10;

    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #FF5722;
    }

    &::-webkit-scrollbar-track {
        background: black;
    }
`;

const Detail = styled(motion.div)`
    margin: 2rem 0;
    width: 80%;
    /* border-radius: 1rem; */
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    background: white;
    position: absolute;
    left: 10%;
    color: black;
    overflow: hidden;
`;

const StatsContainer = styled(motion.div)`
    width: 100%;
    height: 80vh;
    background-size: cover;
    background-position: center top;

    @media screen and (max-width: 450px) {
        height: fit-content;
        min-height: 0;
    }
`;

const Stats = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: fit-content;
    padding: 0rem 2rem 2rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0,0,0,0.25);
    z-index: 5;

    .close {
        position: absolute;
        height: 2rem;
        width: 2rem;
        top: 1rem;
        right: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        opacity: 0.8;

        .line1 {
            width: 5px;
            height: 2rem;
            background: white;
            transform: rotate(45deg) translateX(50%);
        }
        .line2 {
            width: 5px;
            height: 2rem;
            background: white;
            transform: rotate(-45deg) translateX(-50%);
        }
    }

    h3, p {
        color: white;
    }

    .title {
        font-size: 1.75rem;
    }

    img {
        width: 2rem;
        height: 2rem;
        display: inline;
    }

    .stars {
        width: 1.5rem;
        height: 1.5rem;
    }

    @media screen and (max-width: 680px) {
        display: block;
    }
`;

const Info = styled(motion.div)`
    text-align: center;

    @media screen and (max-width: 680px) {
        text-align: left;
    }
`;

const Platforms = styled(motion.div)`
    display: flex;
    justify-content: space-evenly;
    background: rgba(255,255,255,0.5);
    border-radius: 0.5rem;
    padding: 1rem;

    img {
        margin: 0 1rem;
        cursor: pointer;
    }

    @media screen and (max-width: 680px) {
        width: fit-content;
        padding: 0.5rem;

        img {
            margin: 0.5rem;
        }
    }

    @media screen and (max-width: 305px) {
        transform: scale(0.7);
    }
`;

const Description = styled(motion.div)`
    margin: 5rem 0rem;
    padding: 0 5rem;

    @media screen and (max-width: 1018px) {
        padding: 0 2rem;
        margin: 4rem 0rem 2rem 0rem;
    }
`;

const Wrapper = styled(motion.div)`
    position: relative;

    .videoContainer {
        position: absolute;
        bottom: -2rem;
        right: 0;
        z-index: 4;

        video {
            height: 100%;
            width: 100%;
            min-width: 200px;
        }
    }

    @media screen and (max-width: 1200px) {
        .videoContainer {
            position: relative;
            display: flex;
            justify-content: center;
            transform: translateY(-2rem);
        }
    }
`;

const Gallery = styled(motion.div)`
    min-height: 80vh;
    padding: 0 5rem;
    margin-bottom: 5rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 1rem;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media screen and (max-width: 1018px) {
        padding: 0 2rem;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 0;
        margin-bottom: 2rem;
    }

    @media screen and (max-width: 450px) {
        display: flex;
        flex-direction: column;
        padding: 0;
    }
`;

const Genre = styled.div`
    display: flex;
    margin-top: 1rem;
    
    h4 {
        background: #ffffff;
        color: #2c2c2c;
        margin-right: 1rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
`;
export default GameDetail;