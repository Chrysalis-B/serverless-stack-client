import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import config from "../config";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import './Notes.css';

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
        console.log(str);
        return str.replace(/^\w+-/, '');
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    async function handleSubmit(event) {
        let attachment;

        event.preventDefault();

        if (file.current && file.current.suze > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
            return;
        }

        setIsSubmitting(true);
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