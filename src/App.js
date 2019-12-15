import React from 'react';
import { Link } from 'react-router-dom';
import Routes from "./Routes";
import { Navbar } from 'react-bootstrap';
import './App.css';

export default function App(props) {
  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
      <Routes />
    </div>
  )
}

