import { Button, Dialog, Group, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';

/**
 * Show a dialog to accept or refuse a cookie :)
 * If the user accepts, a cookie will be created.
 * 
 * @returns the component
 */
function FreeCookie({visible}) {

    const [opened, setOpened] = useState(visible);
    useEffect(() => {
        setOpened(visible);
    }, [visible]);

    const acceptCookie = () => {
        document.cookie = "success=you did it, you son of bitch, here a cookie!";
        setOpened(false);
    }

    return (
        <>
        <Dialog
            size="lg"
            position={{ top: 20, left:20}}
            opened={opened}
            onClose={() => setOpened(false)}
        >
            <Text>Congratulations, here's a cookie</Text>
            <Group>
                <Button onClick={acceptCookie}>Thank you so much</Button>
                <Button color="pink" onClick={() => setOpened(false)}>No Cookie for me!</Button>
            </Group>
        </Dialog>
        </>
    );
}

export default FreeCookie;