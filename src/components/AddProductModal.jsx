import React, { useState, useEffect, useRef } from 'react';
import axios from '../config/axiosConfig';
import {
    Input,
    Button,
    Dialog,
    IconButton,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from '@heroicons/react/16/solid';

const AddProductModal = ({ open, handleOpen }) => {

    const errRef = useRef();

    const [transId, setTransId] = useState('');
    const [validTransId, setValidTransId] = useState(false);

    const [transTms, setTransTms] = useState('');
    const [validTransTms, setValidTransTms] = useState(false);

    const [rcNum, setRcNum] = useState('');
    const [validRcNum, setValidRcNum] = useState(false);

    const [clientId, setClientId] = useState('');
    const [validClientId, setValidClientId] = useState(false);
    
    const [eventCnt, setEventCnt] = useState('');
    const [validEventCnt, setValidEventCnt] = useState(false);

    const [locationCd, setLocationCd] = useState('');    
    const [validLocationCd, setValidLocationCd] = useState(false);

    const [locationId1, setLocationId1] = useState('');
    const [validLocationId1, setValidLocationId1] = useState(false);

    const [locationId2, setLocationId2] = useState('');
    const [validLocationId2, setValidLocationId2] = useState(false);
    
    const [addrNbr, setAddrNbr] = useState('');
    const [validAddrNbr, setValidAddrNbr] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // simple validation and sanitization for the form
    useEffect(() => {
        setValidTransId(transId.length > 0);
    }, [transId]);
    
    useEffect(() => {
        setValidTransTms(transTms.length > 0);
    }, [transTms]);
    
    useEffect(() => {
        setValidRcNum(rcNum.length > 0);
    }, [rcNum]);
    
    useEffect(() => {
        setValidClientId(clientId.length > 0);
    }, [clientId]);
    
    useEffect(() => {
        const isValid = !isNaN(eventCnt) && Number(eventCnt) > 0;
        setValidEventCnt(isValid);
    }, [eventCnt]);
    
    useEffect(() => {
        setValidLocationCd(locationCd.length > 0);
    }, [locationCd]);
    
    useEffect(() => {
        setValidLocationId1(locationId1.length > 0);
    }, [locationId1]);
    
    useEffect(() => {
        setValidAddrNbr(addrNbr.length > 0);
    }, [addrNbr]);

    // clear error message when the user changes the input
    useEffect(() => {
        setErrMsg('');
    }, [transId, transTms, rcNum, clientId, eventCnt, locationCd, locationId1, locationId2, addrNbr]);


    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validTransId || !validTransTms || !validRcNum || !validClientId || !validEventCnt || !validLocationCd || !validLocationId1 || !validAddrNbr) {
            setErrMsg('Please fill out the required fields');
            errRef.current.scrollIntoView();
            return;
        }

        try {
            const payload = {
                transId,
                transTms,
                rcNum,
                clientId,
                eventCnt,
                locationCd,
                locationId1,
                locationId2,
                addrNbr
            }

            const response = await axios.post('/api/events', payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response.data);
            setSuccess(true);

            // reset the form
            setTransId('');
            setTransTms('');
            setRcNum('');
            setClientId('');
            setEventCnt('');
            setLocationCd('');
            setLocationId1('');
            setLocationId2('');
            setAddrNbr('');

            handleOpen();
        } catch (error) {
            console.error(error);
            setErrMsg('An error occurred. Please try again later.');
            errRef.current.scrollIntoView();
        }
    }


    return (
        <>
            <Dialog size="sm" open={open} handler={handleOpen} className="p-4 overflow-scroll">
                <DialogHeader className="relative m-0 block">
                <Typography variant="h4" color="blue-gray">
                    Add Event Item
                </Typography>
                <Typography className="mt-1 font-normal text-gray-600">
                    Keep your events up-to-date and organized.
                </Typography>
                <IconButton
                    size="sm"
                    variant="text"
                    className="!absolute right-3.5 top-3.5"
                    onClick={handleOpen}
                >
                    <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
                </DialogHeader>
                <DialogBody className="space-y-4 pb-6">
                <p ref={errRef} className={errMsg ? "flex text-red-500 mt-4" : "hidden"}>{errMsg}</p>
                <div>
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                    >
                    Trans Id
                    </Typography>
                    <Input
                    value={transId}
                    onChange={(e) => setTransId(e.target.value)}
                    color="gray"
                    size="lg"
                    placeholder="eg. 0000abf8-d1f5-4536-8fb0-36fe934b1f28"
                    name="transId"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                    />
                </div>
                <div>
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                    >
                    Trans Tms
                    </Typography>
                    <Input
                    value={transTms}
                    onChange={(e) => setTransTms(e.target.value)}
                    color="gray"
                    size="lg"
                    placeholder="eg. 20151022102011927EDT"
                    name="transTms"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                    />
                </div>
                <div>
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                    >
                    rc Num
                    </Typography>
                    <Input
                    value={rcNum}
                    onChange={(e) => setRcNum(e.target.value)}
                    color="gray"
                    size="lg"
                    placeholder="eg. 10002"
                    name="rcNum"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                    />
                </div>
                <div>
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                    >
                    Client Id
                    </Typography>
                    <Input
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    color="gray"
                    size="lg"
                    placeholder="eg. RPS-00001"
                    name="clientId"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                    />
                </div>
                <div>
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                    >
                    Event Cnt
                    </Typography>
                    <Input
                    value={eventCnt}
                    onChange={(e) => setEventCnt(e.target.value)}
                    color="gray"
                    size="lg"
                    placeholder="eg. 1"
                    name="eventCnt"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    type='number'
                    step={1}
                    min={1}
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                    />
                </div>
                <div>
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                    >
                    Location Cd
                    </Typography>
                    <Input
                    value={locationCd}
                    onChange={(e) => setLocationCd(e.target.value)}
                    color="gray"
                    size="lg"
                    placeholder="eg. DESTINATION"
                    name="locationCd"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                    />
                </div>
                <div className="flex gap-4">
                    <div className="w-full">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 text-left font-medium"
                    >
                        Location Id 1
                    </Typography>
                    <Input
                        value={locationId1}
                        onChange={(e) => setLocationId1(e.target.value)}
                        color="gray"
                        size="lg"
                        placeholder="eg. T8C"
                        name="locationId1"
                        className="placeholder:opacity-100 focus:!border-t-gray-900"
                        containerProps={{
                        className: "!min-w-full",
                        }}
                        labelProps={{
                        className: "hidden",
                        }}
                    />
                    </div>
                    <div className="w-full">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 text-left font-medium"
                    >
                        Location Id 2 (Optional)
                    </Typography>
                    <Input
                        value={locationId2}
                        onChange={(e) => setLocationId2(e.target.value)}
                        color="gray"
                        size="lg"
                        placeholder="eg. 1J7"
                        name="locationId2"
                        className="placeholder:opacity-100 focus:!border-t-gray-900"
                        containerProps={{
                        className: "!min-w-full",
                        }}
                        labelProps={{
                        className: "hidden",
                        }}
                    />
                    </div>
                </div>
                <div>
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                    >
                    addr Nbr
                    </Typography>
                    <Input
                    value={addrNbr}
                    onChange={(e) => setAddrNbr(e.target.value)}
                    color="gray"
                    size="lg"
                    placeholder="eg. 0000000001"
                    name="addrNbr"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                    />
                </div>
                </DialogBody>
                <DialogFooter>
                <Button className="ml-auto" onClick={handleSubmit}>
                    Add Product
                </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default AddProductModal;