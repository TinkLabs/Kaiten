import axios from 'axios';

const axiosGitHubGraphQL = axios.create({
	baseURL: 'http://ecs-nora-dev-alb-1099166829.ap-southeast-1.elb.amazonaws.com/graphql',
	headers: { 'Accept-Language': 'ja_JP' },
});

export default axiosGitHubGraphQL;