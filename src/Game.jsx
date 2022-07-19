import React from 'react';

interface props {
    rows: number,
    columns: number
}

function Game({rows, columns} : props) {
    const nbBoxes = rows * columns + 1;

    return (
        <div>welcome to the rice fields</div>
    );
}

export default Game;