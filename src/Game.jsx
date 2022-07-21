import { Container, Checkbox, Text } from '@mantine/core';
import React, { useReducer } from 'react';
import FreeCookie from './FreeCookie';

/**
 * The four stages of mental illness.
 */
const GAME_STAGES = {
    FIRST: "clueless",
    SECOND: "a little bit of trolling",
    THIRD: "all visible checked",
    FOUR: "living in the fourth dimension, so technically living in 1D", 
};

/**
 * Create the reducer fonction managing all states changes. It uses a closures
 * to be able to remember the number of boxes.
 * 
 * @param {number} nbBoxes The number of boxes shown
 * @returns a function to use as a reducer in useReducer
 */
function getReducer(nbBoxes) {

    return function reduce(state, action) {

        // just some simple verification on the state format
        if ( state === null || typeof state !== 'object') {
            throw new Error("Invalid state format, you dumb fuck, be ashamed :) love you <3");
        }

        const stage = state.stage;
        const checkedBoxes = state.checkedBoxes;
        const newState = {...state};

        if (stage === GAME_STAGES.FIRST && checkedBoxes === nbBoxes-1) {
            // ok this is ugly, and bad because it's considered a side effect,
            // but because the event triggers only when we dispatch a PointerEvent("click")
            // it works, without fucking everything up and I don't want to waste
            // more time on this, don't be a code complainer, nobody likes code
            // complainers <3
            // My code is shit :handshake: I know
            document.getElementById("apoiefjazenkljhzapeoaepoif")
            .querySelectorAll("input[type=checkbox]:checked")
            .forEach( elem => {
                elem.click();
            });
            newState.message = "Oh no, something went wrong, try again";
            newState.stage = GAME_STAGES.SECOND;
            newState.checkedBoxes = 0;
            return newState;
        } else if (stage === GAME_STAGES.SECOND && checkedBoxes === nbBoxes-1) {
            newState.message = "Hum weird, are you sure you checked all of them?";
            newState.stage = GAME_STAGES.THIRD;
        } else if (stage === GAME_STAGES.THIRD && checkedBoxes !== nbBoxes + 1 && action.type === "decrement") {
            newState.message = "You are supposed to check the boxes, not uncheck them";
        } else if ( stage === GAME_STAGES.THIRD && checkedBoxes === nbBoxes && action.type === "increment") {
            newState.message = "Good job, here's a cookie";
            newState.stage = GAME_STAGES.FOUR;
        }

        switch (action.type) {
            case 'increment':
                newState.checkedBoxes++;
            break;
            case 'decrement':
                newState.checkedBoxes--;
            break;
        }
        console.log(newState);
        return newState;
    };
}

/**
 * 
 * let's try something simple at first
 * 
 */
function Game({rows, columns}) {
    const nbBoxes = rows * columns;

    const [state, dispatch] = useReducer(
        getReducer(nbBoxes),
        {
            checkedBoxes: 0,
            stage: GAME_STAGES.FIRST,
        }
    );

    const checked = (e) => {
        if (e.target.checked) {
            dispatch({type: 'increment'});
        } else {
            dispatch({type: 'decrement'});
        }
    };

    let checkboxes = [];
    for (let i = 0; i < rows; i++) {
        checkboxes.push([]);
        for (let j = 0; j < columns; j++ ) {
            checkboxes[i].push(<Checkbox onChange={checked} size="lg" />);
        }
    }

    return (
        <Container>
            <Text>
                Check the boxes
            </Text>
            {state.message}
            <FreeCookie visible={(state.stage === GAME_STAGES.FOUR) ? true : false} />
            <table id="apoiefjazenkljhzapeoaepoif">
                <tbody>
                {checkboxes.map(col => (<tr>
                    {col.map(checkbox => (<td>{checkbox}</td>))}
                </tr>))}
                </tbody>
            </table>
            <input type="checkbox" id="u mad?" value="did you try making it visible ?" hidden="true" onChange={checked}/>
        </Container>
    );
}

export default Game;