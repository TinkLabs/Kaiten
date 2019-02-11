import axios from 'axios';

const axiosGitHubGraphQL = axios.create({
	baseURL: process.env.REACT_APP_API_HOST,
	headers: { 'Accept-Language': 'ja_JP' },
});

export default axiosGitHubGraphQL;