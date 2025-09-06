import React, { useState } from 'react';
import { Container, Header, Segment, Grid } from 'semantic-ui-react';
import PostTypeSelector from '../components/PostTypeSelector';
import QuestionForm from '../components/QuestionForm';
import ArticleForm from '../components/ArticleForm';
import '../App.css';

const PostPage = () => {
  const [selectedType, setSelectedType] = useState('question');

  return (
    <Container className="container">
      {/* Background Segment to add visual interest */}
      <Segment className="background-segment">
        <Header as="h2">Share Your Knowledge</Header>
        <p>Help others by asking questions or sharing articles.</p>
      </Segment>

      <Header as="h2" className="form-header">
        New Post
      </Header>
      <Segment className="segment-container">
        <PostTypeSelector selectedType={selectedType} setSelectedType={setSelectedType} />
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={10}>
              {selectedType === 'question' ? <QuestionForm /> : <ArticleForm />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

export default PostPage;
