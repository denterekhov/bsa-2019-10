import gql from 'graphql-tag';

export const POST_QUERY = gql`
  query postQuery($orderBy: PostOrderByInput) {
    posts(orderBy: $orderBy) {
      postList {
        id
        createdAt
        text
        likeCount 
        dislikeCount 
        replies {
          id
          createdAt
          text
          likeCount 
          dislikeCount 
        }
      }
    }
  }
`;

export const SEARCH_QUERY = gql`
  query findPost($filter: String!, $orderBy: PostOrderByInput) {
    posts(filter: $filter, orderBy: $orderBy) {
      postList {
        id
        createdAt
        text
        likeCount 
        dislikeCount 
        replies {
          id
          createdAt
          text
          likeCount 
          dislikeCount 
        }
      }
    }
  }
`;

export const POST_POST_MUTATION = gql`
  mutation PostMutation($text: String!) {
    postPost(text: $text) {
      id
      createdAt
      text
      likeCount 
      dislikeCount 
      replies {
        id
        createdAt
        text
        likeCount 
        dislikeCount 
      }
    }
  }
`;

export const POST_REPLY_MUTATION = gql`
  mutation PostMutation($postId: ID!, $text: String!) {
    postReply(postId: $postId, text: $text) {
      id
      createdAt
      text
      likeCount 
      dislikeCount 
    }
  }
`;

export const LIKE_MUTATION = gql`
  mutation LikeMutation($id: ID!, $likeCount: Int!) {
    postLike(id: $id, likeCount: $likeCount)
  }
`;

export const NEW_POSTS_SUBSCRIPTION = gql`
  subscription {
    newPost {
      id
      createdAt
      text
      likeCount 
      dislikeCount 
      replies {
        id
        createdAt
        text
        likeCount 
        dislikeCount 
      }
    }
  }
`;
