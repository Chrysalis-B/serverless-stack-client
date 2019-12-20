import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";

export default function Notes(props) {
    const file = useRef(null);
    const [note, setNote] = useState(null);
    const [content, setContent] = useState('');

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

    return (
        <div className="Notes"></div>
    );
}