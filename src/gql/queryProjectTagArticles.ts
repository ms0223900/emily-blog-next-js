import queryArticlesByTagId from './queryArticleByTag';

const queryProjectTagArticles = () => queryArticlesByTagId('projects', {});

export default queryProjectTagArticles;
