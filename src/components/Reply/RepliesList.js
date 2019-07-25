import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

import ReplyItem from './ReplyItem';
import ReplyForm from './ReplyForm';

const ReviewList = props => {
  const [replyFormState, toggleReplyFormState] = useState(false);
  const { postId, replies } = props;
    
  return (
    <div>
      <Button basic color='orange' floated='right' onClick={() => toggleReplyFormState(!replyFormState)}>
        {replyFormState ? 'Close' : 'Reply'}
      </Button>
      {replyFormState && <ReplyForm
        postId={postId}
        toggleReplyFormState={toggleReplyFormState}
      />}
      {replies.length ? <h5>Replies</h5> : null}
      {replies.map(item => {
        return <ReplyItem key={item.id} {...item} />
      })}
    </div>
  );
}

export default ReviewList;