import React, { useState, useEffect } from 'react';
import axios from '../config/axiosConfig';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import ConfirmationDialog from './ConfirmationDialog';

import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

const Home = () => {

	const [openAddEvent, setOpenAddEvent] = useState(false);
	const [openEditEvent, setOpenEditEvent] = useState(false);
	const [openDeleteEvent, setOpenDeleteEvent] = useState(false);

	const [events, setEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [selectedEventId, setSelectedEventId] = useState(null);

	const handleAddEvent = () => setOpenAddEvent(!openAddEvent);

	const handleEditEvent = (event) => {
		setSelectedEvent(event);
		setOpenEditEvent(!openEditEvent);
	};

	const handleDeleteEvent = async (eventId) => {
		setSelectedEventId(eventId);
		setOpenDeleteEvent(!openDeleteEvent);
	};

	useEffect(() => {
		const fetchEvents = async () => {
			const response = await axios.get('/api/events');
			setEvents(response.data);
		}
		fetchEvents();
	}, []);

	return (
		<>
			<div className='container justify-center mx-auto'>
				<div className="col pt-8">
					<div className="add-button">
						<Button onClick={handleAddEvent}>Add Event</Button>
					</div>
					<div className="container px-4 py-8 w-5/6 mx-auto flex flex-row flex-wrap justify-center gap-x-4">
						{
							events.map(event => (
								<Card className='mt-6 w-96' key={event.eventId}>
									<CardBody>
										<Typography variant="h5" color="blue-gray" className="mb-2">
											Event Details
										</Typography>
										<Typography>
											<span className="font-semibold">Event Id:</span>{event.eventId}<br />
											<span className="font-semibold">Trans Id:</span>{event.transId}<br />
											<span className="font-semibold">Trans Tms:</span>{event.transTms}<br />
											<span className="font-semibold">rc Num:</span>{event.rcNum}<br />
											<span className="font-semibold">Client Id:</span>{event.clientId}<br />
											<span className="font-semibold">Event Cnt:</span>{event.eventCnt}<br />
											<span className="font-semibold">Location Cd:</span>{event.locationCd}<br />
											<span className="font-semibold">Location Id 1:</span>{event.locationId1}<br />
											<span className="font-semibold">Location Id 2:</span>{event.locationId2}<br />
											<span className="font-semibold">Addr Nbr:</span>{event.addrNbr}<br />
										</Typography>
									</CardBody>
									<CardFooter className="pt-0 gap-x-2 flex">
									<IconButton
										size="md"
										variant="text"
										className="right-3.5 top-3.5"
										color='blue-gray'
										onClick={() => handleEditEvent(event)}
									>
										<PencilIcon className="h-6 w-6 stroke-2" />
									</IconButton>
									<IconButton
										size="md"
										variant="text"
										className="right-3.5 top-3.5"
										color='red'
										onClick={() => handleDeleteEvent(event.eventId)}
									>
										<TrashIcon className="h-6 w-6 stroke-2" />
									</IconButton>
									</CardFooter>
								</Card>
							))
						}
					</div>
				</div>
			</div>
			<AddProductModal open={openAddEvent} handleOpen={handleAddEvent} />
			<EditProductModal open={openEditEvent} handleOpen={handleEditEvent} data={selectedEvent} />
			<ConfirmationDialog open={openDeleteEvent} handleOpen={handleDeleteEvent} eventId={selectedEventId} />
		</>
	);
}

export default Home;