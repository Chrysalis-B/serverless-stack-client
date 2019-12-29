import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from './components/AsyncComponent';
import AppliedRoute from './components/AppliedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

const AsyncHome = asyncComponent(() => import('./containers/Home'));
const AsyncLogin = asyncComponent(() => import('./containers/Login'));
const AsyncNotes = asyncComponent(() => import('./containers/Notes'));
const AsyncSignup = asyncComponent(() => import('./containers/Signup'));
const AsyncSettings = asyncComponent(() => import('./containers/Settings'));
const AsyncNewNote = asyncComponent(() => import('./containers/NewNote'));
const AsyncNotFound = asyncComponent(() => import('./containers/NotFound'));

export default function Routes({ appProps }) {
	return (
		<Switch>
			<AppliedRoute
				path='/'
				exact
				component={AsyncHome}
				appProps={appProps}
			/>
			<UnauthenticatedRoute
				path='/login'
				exact
				component={AsyncLogin}
				appProps={appProps}
			/>
			<UnauthenticatedRoute
				path='/signup'
				exact
				component={AsyncSignup}
				appProps={appProps}
			/>
			<AuthenticatedRoute
				path='/settings'
				exact
				component={AsyncSettings}
				appProps={appProps}
			/>
			<AuthenticatedRoute
				path='/notes/new'
				exact
				component={AsyncNewNote}
				appProps={appProps}
			/>
			<AuthenticatedRoute
				path='/notes/:id'
				exact
				component={AsyncNotes}
				appProps={appProps}
			/>
			<Route component={AsyncNotFound} />
		</Switch>
	);
}
