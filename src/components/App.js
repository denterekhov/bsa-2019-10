import React, { useState }  from 'react';
import { Query } from 'react-apollo';
import { Container, Input } from 'semantic-ui-react';

import PostForm from './Post/PostForm';
import PostItem from './Post/PostItem';
import { POST_QUERY, NEW_POSTS_SUBSCRIPTION } from '../queries';

const App = props => {
  const [text, setText] = useState('');
  const orderBy = 'createdAt_DESC';

  const _subscribeToNewPosts = subscribeToMore => {
    subscribeToMore({
      document: NEW_POSTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { newPost } = subscriptionData.data;
        const exists = prev.posts.postList.find(({ id }) => id === newPost.id);
        if (exists) return prev;

        return {...prev, posts: {
          postList: [newPost, ...prev.posts.postList],
          __typename: prev.posts.__typename
        }};
      }
    });
  };

  const filterPosts = data => data.filter(post => {
    return post.text.toLocaleLowerCase().includes(text.toLocaleLowerCase());
  })

  return (
    <Container text>
      <Input value={text} onChange={(e) => setText(e.target.value)} fluid/>
      <Query query={POST_QUERY} variables={{ orderBy }}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Fetch error</div>;
          _subscribeToNewPosts(subscribeToMore);
          const { posts: { postList } } = data;
        
          const filteredPosts = text ? filterPosts(postList) : postList;

          return (
            <div>
              {filteredPosts.map(item => {
                return <PostItem key={item.id} {...item} />
              })}
              <PostForm />
            </div>
          );
        }}
      </Query>
    </Container>
  );
};

export default App;
