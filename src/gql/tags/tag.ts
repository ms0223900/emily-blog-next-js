import { gql } from "@apollo/client";

const TAG_ENTITY = gql`
    fragment TAG_ENTITY on CurlyChuArticleTagEntity {
        id
        attributes {
            title
        }
    }
`;

export default TAG_ENTITY;
