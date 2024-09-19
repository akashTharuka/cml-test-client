import React from 'react';
import axios from '../config/axiosConfig';
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Typography,
  } from "@material-tailwind/react";

import { ExclamationTriangleIcon } from '@heroicons/react/16/solid';

const ConfirmationDialog = ({ open, handleOpen, eventId }) => {

    const deleteEvent = async () => {
        const response = await axios.delete(`/api/events/${eventId}`);
        console.log(response.data);
    }

    const handleDelete = () => {
        deleteEvent();
        handleOpen();
        window.location.reload();
    }

    return (
        <Dialog open={open} handler={handleOpen} className='text-center'>
            <DialogBody className="grid gap-4 place-content-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mx-auto"  />
                <Typography color="red" variant="h4">
                    Confirm!
                </Typography>
                <Typography className="text-center font-normal">
                    Confirm to delete this icon.
                </Typography>
            </DialogBody>
            <DialogFooter className="space-x-2 flex flex-row justify-center">
                <Button variant="text" color="blue-gray" onClick={handleOpen}>
                    close
                </Button>
                <Button variant="gradient" onClick={handleDelete}>
                    Confirm
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default ConfirmationDialog;