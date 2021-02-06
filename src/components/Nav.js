import React, {useState} from 'react';
//Animation
import {motion} from 'framer-motion';
import {fadeIn} from '../animations';
//Styling
import styled from 'styled-components';
import logo from '../img/logo.svg';
//Redux and Routes
import {fetchSearch} from '../actions/gamesAction';
import {useDispatch} from 'react-redux';

const Nav = () => {
    const dispatch = useDispatch();
    const [textInput, setTextInput] = useState("");

    const inputHandler = (e) => {
        setTextInput(e.target.value);
    }

    const submitSearch = (e) => {
        e.preventDefault();
        dispatch(fetchSearch(textInput));
        setTextInput("");
    }
    
    

    const clearSearched = () => {
        dispatch({
            type: 'CLEAR_SEARCHED',
        })
    }
    return (
        <StyledNav variants={fadeIn} initial="hidden" animate="show">
            <Logo onClick={clearSearched}>
                <img src={logo} alt=""/>
                <h1>Ignite</h1>
            </Logo>
            <form className="search">
                <input value={textInput} onChange={inputHandler} type="text"/>
                <button onClick={submitSearch} type="submit">
                    <p>Search</p>
                </button>
            </form>
        </StyledNav>
    );
};

const StyledNav = styled(motion.nav)`
    padding: 3rem 5rem;
    text-align: center;

    form {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    input {
        width: 30%;
        height: 2.5rem;
        font-size: 1.5rem;
        padding: 0.5rem;
        border: none;
        box-shadow: 0px 0px 30px rgba(0,0,0,0.2);
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2.5rem;
        border: none;
        padding: 0.5rem 2rem;
        cursor: pointer;
        background: #FF5722;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;

        p {
            color: white;
            font-size: 1.5rem;
            font-weight: lighter;
            line-height: 1.5rem;
        }
    }

    @media screen and (max-width: 550px) {
        form {
            display: flex;
            flex-direction: column;
            align-items: center;

            input {
                width: 80%;
                margin-bottom: 1rem;
                border-radius: 0.5rem;
            }

            button {
                width: 50%;
                border-radius: 0.5rem;
            }
        }
    }
`;
const Logo = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    cursor: pointer;

    h1 {
        color: white;
    }

    img {
        height: 2rem;
        width: 2rem;
    }
`;

export default Nav;