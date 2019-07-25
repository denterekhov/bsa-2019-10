import gql from 'graphql-tag';

export const POST_QUERY = gql`
  query postQuery($orderBy: PostOrderByInput) {
    posts(orderBy: $orderBy) {
      postList {
        id
        createdAt
        text
        postLikeCount 
        postDislikeCount 
        replies {
          id
          createdAt
          text
          replyLikeCount 
          replyDislikeCount 
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
      postLikeCount 
      postDislikeCount 
      replies {
        id
        createdAt
        text
        replyLikeCount 
        replyDislikeCount 
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
      replyLikeCount 
      replyDislikeCount 
    }
  }
`;

// export const POST_LIKE_INCREMENT_MUTATION = gql`
//   mutation PostMutation($postId: ID!, $text: String!) {
//     postReply(postId: $postId, text: $text) {
//       id
//       createdAt
//       text
//       replyLikeCount 
//       replyDislikeCount 
//     }
//   }
// `;

export const NEW_POSTS_SUBSCRIPTION = gql`
  subscription {
    newPost {
      id
      createdAt
      text
      postLikeCount 
      postDislikeCount 
      replies {
        id
        createdAt
        text
        replyLikeCount 
        replyDislikeCount 
      }
    }
  }
`;
