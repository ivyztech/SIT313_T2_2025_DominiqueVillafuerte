import React, { useState } from 'react';
import { Form, TextArea, Input, Button, Message } from 'semantic-ui-react';
import './UnifiedForm.css'; // Importing the unified CSS file

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!abstract) newErrors.abstract = 'Abstract is required';
    if (!articleText) newErrors.articleText = 'Article text is required';
    if (!tags) newErrors.tags = 'At least one tag is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log({ title, abstract, articleText, tags });
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Article</h2>
      <Form>
        <Form.Field>
          <label className="form-label">Title</label>
          <Input
            className="custom-input"
            placeholder="Enter a descriptive title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title ? { content: errors.title } : null}
          />
        </Form.Field>
        <Form.Field>
          <label className="form-label">Abstract</label>
          <TextArea
            className="custom-textarea"
            placeholder="Enter a 1-paragraph abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            error={errors.abstract ? { content: errors.abstract } : null}
          />
        </Form.Field>
        <Form.Field>
          <label className="form-label">Article Text</label>
          <TextArea
            className="custom-textarea"
            placeholder="Enter the main content of your article"
            value={articleText}
            onChange={(e) => setArticleText(e.target.value)}
            error={errors.articleText ? { content: errors.articleText } : null}
          />
        </Form.Field>
        <Form.Field>
          <label className="form-label">Tags</label>
          <Input
            className="custom-input"
            placeholder="Please add up to 3 tags to describe what your article is about e.g., Java"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            error={errors.tags ? { content: errors.tags } : null}
          />
        </Form.Field>
        <Button type="button" className="submit-button" onClick={handleSubmit}>
          Post
        </Button>
        {Object.keys(errors).length > 0 && (
          <Message
            error
            header="Please fix the errors below before submitting"
            list={Object.values(errors)}
          />
        )}
      </Form>
    </div>
  );
};

export default ArticleForm;
