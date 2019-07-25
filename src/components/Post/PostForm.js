import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import { Button, Form } from 'semantic-ui-react';

import { POST_QUERY, POST_POST_MUTATION } from '../../queries';

const PostForm = props => {
  console.log('props: ', props);
  const [text, setText] = useState('');

  const _updateStoreAfterAddingPost = (store, newPost) => {
    const orderBy = 'createdAt_DESC';
    const data = store.readQuery({
      query: POST_QUERY,
      variables: {
        orderBy
      }
    });
    data.posts.postList.unshift(newPost);
    store.writeQuery({
      query: POST_QUERY,
      data,
    });
  };

  const postNewPost = (mutatePost) => {
    if(text.trim()) {
      mutatePost();
      setText('');
    }
  }

  return (
    <Form>
      <Form.Field>
        <label>Create message</label>
        <input 
          onChange={e => setText(e.target.value)}
          value={text}
          placeholder='Enter your message here...' 
        />
      </Form.Field>

      <Mutation
        mutation={POST_POST_MUTATION}
        variables={{ text }}
        update={(store, { data: { postPost } }) => {
          _updateStoreAfterAddingPost(store, postPost)
        }}
      >
        {postMutation =>
          <Button 
            fluid
            type='submit'
            onClick={() => postNewPost(postMutation)}
          >
            Send message
          </Button>
        }

      </Mutation>
    </Form>
  );
};

export default PostForm;