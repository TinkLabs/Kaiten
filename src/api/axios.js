import axios from 'axios';

const axiosGitHubGraphQL = axios.create({
	baseURL: 'https://nora-staging.handytravel.tech/graphql',
	headers: { 'Accept-Language': 'ja_JP' },
});

export default axiosGitHubGraphQL;