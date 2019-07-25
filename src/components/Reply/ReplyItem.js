import React from 'react';
import { Card, Label, Icon } from 'semantic-ui-react';

const ReplyItem = props => {
  const { text, replyLikeCount, replyDislikeCount } = props;
  return (
    <Card style={{width: '100%'}}>
      <Card.Content style={{padding: 0}}>
        {text}
      </Card.Content>
      <Card.Content extra style={{padding: 0}}>
        <Label basic as="a" style={{border: 'none'}}>
          <Icon name="thumbs up">{replyLikeCount}</Icon>
        </Label>
        <Label basic as="a" style={{border: 'none'}}>
          <Icon name="thumbs down">{replyDislikeCount}</Icon>
        </Label>
      </Card.Content>
    </Card>
  );
};

export default ReplyItem;