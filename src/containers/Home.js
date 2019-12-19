import React, { useState, useEffect } from 'react';
import './Home.css';
import { PageHeader, ListGroup } from 'react-bootstrap';

export default function Home(props) {
	const [notes, setNotes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	function renderNotesList(notes) {
		return null;
	}

	function renderLander() {
		return (
			<div className='lander'>
				<h1>Scratch</h1>
				<p>Make notes and stuff</p>
			</div>
		)
	}

	function renderNotes() {
		return (
			<div className='notes'>
				<PageHeader>Your Notes</PageHeader>
				<ListGroup>
					{!isLoading && renderNotesList(notes)}
				</ListGroup>

			</div>)
	}

	return (
		<div className='Home'>
			{props.isAuthenticated ? renderNotes() : renderLander()}
		</div>
	)

}
