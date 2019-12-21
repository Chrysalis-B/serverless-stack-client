import React, { useRef, useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import config from '../config';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import './Notes.css';
import { s3Upload, s3Removal } from '../libs/awsLib';

export default function Notes(props) {
    const file = useRef(null);
    const [note, setNote] = useState(null);
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        function loadNote() {
            return API.get('notes', `/notes/${props.match.params.id}`);
        }

        async function onLoad() {
            try {
                const note = await loadNote();
                const { content, attachment } = note;

                if (attachment) {
                    note.attachmentURL = await Storage.vault.get(attachment);
                }

                setContent(content);
                setNote(note);
            }
            catch (err) {
                alert(err);
            }
        }

        onLoad();
    }, [props.match.params.id]);

    function validateForm() {
        return content.length > 0;
    }

    function formatFileName(str) {
        return str.replace(/^\w+-/, '');
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    function saveNote(note) {
        return API.put('notes', `/notes/${props.match.params.id}`, {
            body: note
        });
    }

    async function handleSubmit(event) {
        const oldAttachment = note.attachment;
        let newAttachment;

        event.preventDefault();

        if (file.current && file.current.suze > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
            return;
        }

        setIsSubmitting(true);

        try {
            if(file.current) {
                newAttachment = await s3Upload(file.current);
            }

            await saveNote({
                content,
                attachment: newAttachment || oldAttachment
            });

            if(newAttachment && oldAttachment) {
                s3Removal(oldAttachment);
            }

            props.history.push('/');
        }
        catch(err) {
            alert(err);
            setIsSubmitting(false);
        }
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm('Are you sure you want to delete this note?');

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);
    }

    return (
        <div className="Notes">
            {note && (
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId='content'>
                        <FormControl
                            value={content}
                            componentClass='textarea'
                            onChange={e => setContent(e.target.value)}
                        />
                    </FormGroup>
                    {note.attachment && (
                        <FormGroup>
                            <ControlLabel>Attachment</ControlLabel>
                            <FormControl.Static>
                                <a target='_blank' rel='noopener noreferrer' href={note.attachmentURL}>
                                    {formatFileName(note.attachment)}
                                </a>
                            </FormControl.Static>
                        </FormGroup>
                    )}
                    <FormGroup controlId='file'>
                        {!note.attachment && <ControlLabel>Attachment</ControlLabel>}
                        <FormControl onChange={handleFileChange} type='file' />
                    </FormGroup>
                    <LoaderButton
                        block
                        type='submit'
                        bsSize='large'
                        bsStyle='primary'
                        isLoading={isSubmitting}
                        disabled={!validateForm()}
                    >
                        Save
                    </LoaderButton>
                    <LoaderButton
                        block
                        type='submit'
                        bsSize='large'
                        bsStyle='danger'
                        onClick={handleDelete}
                        isLoading={isDeleting}
                    >
                        Delete
                    </LoaderButton>
                </form>
            )}
        </div>
    );
}