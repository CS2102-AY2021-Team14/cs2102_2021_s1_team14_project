import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, TextField } from '@material-ui/core';
import { FaSave } from 'react-icons/fa'
import { Form, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import styles from "./styles/Popup.module.css"
import { toast } from 'react-toastify'

const Popup = ({ openPopup, setOpenPopup, infoToEdit }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [addr, setAddr] = useState('');
    const [username, setUsername] = useState('');

    // TODO: Modularise handleInputChange
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleAddrChange = (e) => {
        setAddr(e.target.value);
    }

    const handleSubmit = async (e) => {
        const body = {
            name,
            email,
            addr,
            username
        }

        axios.put("/api/admin/updateEmployee", body)
            .then(response => {
                toast.success(response.data.message);
                console.log(response);
            })
            .catch(error=> {
                toast.error(error.response.data);
            })

        setOpenPopup(false);
    }

    const formDetails = () => {
        return (
            <>
                <Form onSubmit={e => handleSubmit(e)}>
                    <FormGroup>
                        <TextField
                            className={styles.text_field}
                            variant="outlined"
                            label="Employee Name"
                            name={name}
                            value={name}
                            onChange={(e) => handleNameChange(e)} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                            className={styles.text_field}
                            variant="outlined"
                            label="Address"
                            name={addr}
                            value={addr}
                            onChange={(e) => handleAddrChange(e)} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField 
                            className={styles.text_field}
                            variant="outlined"
                            label="Email"
                            name={email}
                            value={email}
                            onChange={(e) => handleEmailChange(e)} 
                        />
                    </FormGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<FaSave />}
                        type="submit"
                    >
                        Save
                    </Button>
                </Form>
            </>
        )
    }

    useEffect(() => {
        if (infoToEdit != null) {
            setName(infoToEdit.name)
            setEmail(infoToEdit.user_email)
            setAddr(infoToEdit.user_address)
            setUsername(infoToEdit.user_name)
        }
    }, [infoToEdit])

    return (
        <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
            <DialogContent>
                <div>
                    {formDetails()}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Popup;