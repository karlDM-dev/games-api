import React from 'react';
//Styling
import styled from 'styled-components';
//Animation
import {motion} from 'framer-motion';
import {popup} from '../animations';
//Redux
import {useDispatch} from 'react-redux';
import {loadDetail} from '../actions/detailAction';
//Link
import {Link} from 'react-router-dom';
//Image Resize
import {smallImage} from '../util';

const Game = ({name, released, image, id}) => {
    const stringPathId = id.toString();
    //Load Detail Handler
    const dispatch = useDispatch();
    const loadDetailHandler = () => {
        document.body.style.overflow = 'hidden';
        dispatch(loadDetail(id));
    };
    return(
        <Link to={`/game/${id}`}>
            <StyledGame variants={popup} initial="hidden" animate="show" style={{backgroundImage: `url(${smallImage(image, 640)})`}} layoutId={`image ${stringPathId}`} onClick={loadDetailHandler}>
                <motion.div className="detailContainer">
                    <motion.div layoutId={`title ${stringPathId}`} className="title-container">
                        <motion.h3>{name}</motion.h3>
                    </motion.div>
                    <motion.div className="released-container">
                        <p>{released}</p>
                    </motion.div>
                    {/* <motion.img layoutId={`image ${stringPathId}`} src={smallImage(image, 640)} alt={name}/> */}
                </motion.div>
            </StyledGame>
        </Link>
    );
};

const StyledGame = styled(motion.div)`
    position: relative;
    min-height: 30vh;
    height: 100%;
    box-shadow: 0px 5px 20px rgba(0,0,0,0.2);
    text-align: center;
    border-radius: 1rem;
    background-size: cover;
    background-position: center top;
    cursor: pointer;
    overflow: hidden;

    .detailContainer {
        display: flex;
        justify-content: center;

        .title-container {
            width: 100%;
            background: rgba(0,0,0,0.1);

            h3 {
                color: white;
            }
        }

        img {
            width: 100%;
            height: 40vh;
            object-fit: cover;
        }

        .released-container {  
            width: 100%;
            background: rgba(0,0,0,0.1);
            position: absolute;
            bottom: 0;
            p {
                color: white;
            }
        }
    }
`;

export default Game;