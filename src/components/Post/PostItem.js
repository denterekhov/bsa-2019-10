import React from 'react';
import { Card, Label, Icon } from 'semantic-ui-react';
import RepliesList from '../Reply/RepliesList';

const PostItem = props => {
  const { id, createdAt, text, postLikeCount, postDislikeCount, replies } = props;
  
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
        <Label basic as="a" style={{border: 'none'}}>
          <Icon name="thumbs up">{postLikeCount}</Icon>
        </Label>
        <Label basic as="a" style={{border: 'none'}}>
          <Icon name="thumbs down">{postDislikeCount}</Icon>
        </Label>
      </Card.Content>
      <RepliesList postId={id} replies={replies} />
    </Card>
  );
};

export default PostItem;