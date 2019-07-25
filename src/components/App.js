import React, { useState }  from 'react';
import { Query } from 'react-apollo';
import { Container, Input } from 'semantic-ui-react';

import PostForm from './Post/PostForm';
import PostItem from './Post/PostItem';
import { POST_QUERY, SEARCH_QUERY, NEW_POSTS_SUBSCRIPTION } from '../queries';

const App = props => {
  const [search, setSearch] = useState('');
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

  return (
    <Container text>
      <Input placeholder="Enter text to filter" value={search} onChange={(e) => setSearch(e.target.value)} fluid/>

      {!search
        ? <Query query={POST_QUERY} variables={{ orderBy }}>
            {({ loading, error, data, subscribeToMore }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Fetch error</div>;
              _subscribeToNewPosts(subscribeToMore);
              const { posts: { postList } } = data;            
              return (
                <div>
                  {postList.map(item => {
                    return <PostItem key={item.id} {...item} />
                  })}
                </div>
              );
            }}
          </Query>
        : <Query query={SEARCH_QUERY} variables={{ filter: search }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Fetch error</div>;
              const { posts: { postList } } = data;
            
              return (
                <div>
                  {postList.map(item => {
                    return <PostItem key={item.id} {...item} />
                  })}
                </div>
              );
            }}
          </Query>
      }
      <PostForm />
    </Container>
  );
};

export default App;
