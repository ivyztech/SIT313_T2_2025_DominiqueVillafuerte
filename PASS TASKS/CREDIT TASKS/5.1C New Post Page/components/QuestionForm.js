import React, { useState } from 'react';
import { Form, TextArea, Input, Button, Message } from 'semantic-ui-react';
import './UnifiedForm.css'; // Importing the unified CSS file

const QuestionForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Problem description is required';
    if (!tags) newErrors.tags = 'At least one tag is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log({ title, description, tags });
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Question</h2>
      <Form>
        <Form.Field>
          <label className="form-label">Title</label>
          <Input
            className="custom-input"
            placeholder="Start your question with how, what, why, etc."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title ? { content: errors.title } : null}
          />
        </Form.Field>
        <Form.Field>
          <label className="form-label">Describe your problem</label>
          <TextArea
            className="custom-textarea"
            placeholder="Describe your problem"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description ? { content: errors.description } : null}
          />
        </Form.Field>
        <Form.Field>
          <label className="form-label">Tags</label>
          <Input
            className="custom-input"
            placeholder="Please add up to 3 tags to describe what your question is about e.g., Java"
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

export default QuestionForm;
