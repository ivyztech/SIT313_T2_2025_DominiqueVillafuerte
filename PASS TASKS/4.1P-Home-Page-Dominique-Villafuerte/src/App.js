import React from 'react';
import {
  Container,
  Menu,
  Input,
  Button,
  Grid,
  Card,
  Image,
  Icon,
  Segment,
  Form,
  Divider
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css'; 

function App() {
  const colors = {
    primary: '#0052cc',   // Dark blue
    secondary: '#f0f0f0', // Very light grey
    accent: '#ff4500',    // Orange for buttons and icons
  };

  return (
    <div>
      <Menu borderless fixed='top' style={{ background: colors.secondary, padding: '0.5em 0' }}>
        <Container>
          <Menu.Item header style={{ fontWeight: 'bold', color: colors.primary }}>
            Dev @ Deakin
          </Menu.Item>
          <Menu.Item position='right' style={{ flexGrow: 1, marginRight: '1em' }}>
            <Input fluid icon='search' placeholder='Search...' style={{ maxWidth: '800px' }} />
          </Menu.Item>
          <Menu.Item>
            <Button className="custom-button" style={{ backgroundColor: colors.accent, color: 'white' }}>Post</Button>
          </Menu.Item>
          <Menu.Item>
            <Button className="custom-button" style={{ backgroundColor: colors.primary, color: 'white' }}>Login</Button>
          </Menu.Item>
        </Container>
      </Menu>

      <Segment style={{ padding: '8em 0', backgroundImage: 'url(https://picsum.photos/1200/300)', backgroundSize: 'cover', marginTop: '4em' }}>
        {/* Main banner segment */}
      </Segment>

      <Container style={{ margin: '3em 0' }}>
        <h1 style={{ color: colors.primary }}>Featured Articles</h1>
        <Card.Group itemsPerRow={3} stackable>
          {['How to Code', 'How to Swim', 'How to Drive'].map((article, index) => (
            <Card key={index} raised>
              <Image src={`https://picsum.photos/seed/${article}/400/300`} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{article}</Card.Header>
                <Card.Meta>Description of the article</Card.Meta>
                <Card.Description>
                  <Icon name='star' color='yellow' /> 4.0 Nikki Villafuerte
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
        <Button className="stretched" style={{ backgroundColor: colors.accent, color: 'white' }}>See all articles</Button>
      </Container>

      <Container style={{ margin: '3em 0' }}>
        <h1 style={{ color: colors.primary }}>Featured Tutorials</h1>
        <Card.Group itemsPerRow={3} stackable>
          {['The Olympics', 'Paris', 'Swimming'].map((tutorial, index) => (
            <Card key={index} raised>
              <Image src={`https://picsum.photos/seed/${tutorial}/400/300`} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{tutorial}</Card.Header>
                <Card.Meta>Description of the tutorial</Card.Meta>
                <Card.Description>
                  <Icon name='star' color='yellow' /> 4.9 Craig Hornido
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
        <Button className="stretched" style={{ backgroundColor: colors.primary, color: 'white' }}>See all tutorials</Button>
      </Container>

      <Segment style={{ padding: '5em 0em', background: colors.secondary }}>
        <Container>
          <Form>
            <Form.Field>
              <label style={{ color: colors.primary }}>Email for our Daily Insider</label>
              <Input placeholder='Enter your email' />
            </Form.Field>
            <Button className="custom-button" type='submit' style={{ backgroundColor: colors.accent, color: 'white' }}>Subscribe</Button>
          </Form>
        </Container>
      </Segment>

      <Segment inverted style={{ padding: '5em 0em', background: colors.primary }}>
        <Container textAlign='center'>
          <Grid divided inverted stackable>
            <Grid.Column width={3}>
              <h4 style={{ color: colors.secondary }}>Explore</h4>
              <Divider />
              <p>Home</p>
              <p>Questions</p>
              <p>Articles</p>
              <p>Tutorials</p>
            </Grid.Column>
            <Grid.Column width={3}>
              <h4 style={{ color: colors.secondary }}>Support</h4>
              <Divider />
              <p>FAQs</p>
              <p>Help</p>
              <p>Contact Us</p>
            </Grid.Column>
            <Grid.Column width={3}>
              <h4 style={{ color: colors.secondary }}>Stay Connected</h4>
              <Divider />
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Twitter</p>
            </Grid.Column>
          </Grid>
          <p>DEV@Deakin 2022</p>
          <p>Privacy Policy | Terms | Code of Conduct</p>
        </Container>
      </Segment>
    </div>
  );
}

export default App;