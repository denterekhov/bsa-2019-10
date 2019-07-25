import React from 'react';
import { Mutation } from 'react-apollo';
import { Card, Label, Icon } from 'semantic-ui-react';
import RepliesList from '../Reply/RepliesList';
import { POST_QUERY, LIKE_MUTATION } from '../../queries';

const PostItem = props => {
  const { id, createdAt, text, likeCount, dislikeCount, replies } = props;

  const _updateStoreAfterAddingLike = (store, likes) => {
    const orderBy = 'createdAt_DESC';
    const data = store.readQuery({
      query: POST_QUERY,
      variables: {
        orderBy
      }
    });
    const likedPost = data.posts.postList.find(
      item => item.id === id
    );
    likedPost.likeCount = likes;

    store.writeQuery({
      query: POST_QUERY,
      data,
    });
  };

  return (
    <Card style={{width: '100%'}}>
      <Card.Content>
        <Card.Meta>
          <span>{id.slice(-4)}</span>
          {' - '}
          <span>{new Date(createdAt).toLocaleString()}</span>
        </Card.Meta>
        <Card.Description>
          {text}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Mutation
          mutation={LIKE_MUTATION}
          variables={{ id, likeCount: likeCount + 1 }}
          update={(store, { data: { postLike } }) => {
            _updateStoreAfterAddingLike(store, postLike)
          }}
        >
          {postMutation =>
            <Label 
              basic as="a" 
              style={{border: 'none'}}
              onClick={postMutation}
            >
              <Icon name="thumbs up">{likeCount}</Icon>
            </Label>
          }
        </Mutation>
        <Label basic as="a" style={{border: 'none'}}>
          <Icon name="thumbs down">{dislikeCount}</Icon>
        </Label>
      </Card.Content>
      <RepliesList postId={id} replies={replies} />
    </Card>
  );
};

export default PostItem;