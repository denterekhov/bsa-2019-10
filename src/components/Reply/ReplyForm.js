import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { Button } from 'semantic-ui-react';

import { POST_QUERY, POST_REPLY_MUTATION } from '../../queries';

const ReplyForm = props => {
  const { postId, toggleReplyFormState } = props;
  const [text, setText] = useState('');

  const _updateStoreAfterAddingReply = (store, newReply, postId) => {
    const orderBy = 'createdAt_DESC';
    const data = store.readQuery({
      query: POST_QUERY,
      variables: {
        orderBy
      }
    });
    const repliedPost = data.posts.postList.find(
      item => item.id === postId
    );
    repliedPost.replies.push(newReply);
    store.writeQuery({
      query: POST_QUERY, 
      data 
    });
    toggleReplyFormState(false);
  };


  const postNewReply = (mutateReply) => {
    if(text.trim()) {
      mutateReply();
      setText('');
    }
  }

  return (
    <div>
      <div>
        <textarea
          onChange={e => setText(e.target.value)}
          placeholder="Enter your message here..."
          autoFocus
          value={text}
          cols="25"
        />
      </div>
      <Mutation
        mutation={POST_REPLY_MUTATION}
        variables={{ postId, text }}
        update={(store, { data: { postReply } }) => {
          _updateStoreAfterAddingReply(store, postReply, postId)
        }}
      >
        {postMutation =>
          <Button basic color='olive' floated='right' onClick={() => postNewReply(postMutation)}>Post</Button>
        }
      </Mutation>
    </div>
  );
};

export default ReplyForm;