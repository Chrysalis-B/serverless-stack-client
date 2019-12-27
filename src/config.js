const dev = {
	STRIPE_KEY: 'pk_test_kmqJ799MhnQ5jPEqj0BvB99i00GQcNd68e',
	s3: {
		REGION: 'us-east-1',
		BUCKET: 'notes-app-2-api-dev-attachmentsbucket-fao0urrfezrt'
	},
	apiGateway: {
		REGION: 'us-east-1',
		URL: 'https://qoqxm8722d.execute-api.us-east-1.amazonaws.com/dev'
	},
	cognito: {
		REGION: 'us-east-1',
		USER_POOL_ID: 'us-east-1_irHNl9nbS',
		APP_CLIENT_ID: '3tn1qi91fmsjtq8r5ftl400406',
		IDENTITY_POOL_ID: 'us-east-1:25b760cb-6cc0-4bad-ae9f-12d9222071ab'
	}
};

const prod = {
	STRIPE_KEY: 'pk_test_kmqJ799MhnQ5jPEqj0BvB99i00GQcNd68e',
	s3: {
		REGION: 'us-east-1',
		BUCKET: 'notes-app-2-api-prod-attachmentsbucket-1lpxssj1w2s2s'
	},
	apiGateway: {
		REGION: 'us-east-1',
		URL: 'https://skve7l7kh9.execute-api.us-east-1.amazonaws.com/prod'
	},
	cognito: {
		REGION: 'us-east-1',
		USER_POOL_ID: 'us-east-1_qvpzjsysI',
		APP_CLIENT_ID: '4r6oivtsfmtkr5dp362t16hg5u',
		IDENTITY_POOL_ID: 'us-east-1:c61a1b07-63b2-4a14-9e53-5e9bd16a04fb'
	}
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
	MAX_ATTACHMENT_SIZE: 5000000,
	...config
}
