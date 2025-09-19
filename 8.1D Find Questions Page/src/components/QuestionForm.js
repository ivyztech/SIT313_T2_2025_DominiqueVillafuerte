import React, { useState } from "react";
import { Form, TextArea, Input, Button, Message } from "semantic-ui-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth/AuthContext";
import "./UnifiedForm.css";

export default function QuestionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  const validateForm = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!description.trim()) e.description = "Problem description is required";
    if (!tags.trim()) e.tags = "At least one tag is required";
    return e;
  };

  const handleSubmit = async (evt) => {
    evt?.preventDefault?.(); // allow Enter/submit
    const e = validateForm();
    if (Object.keys(e).length) return setErrors(e);
    if (!user) return setErrors({ auth: "You must be logged in." });

    setSaving(true);
    try {
      await addDoc(collection(db, "posts"), {
        type: "question",
        title: title.trim(),
        description: description.trim(),
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .slice(0, 3),
        authorUid: user.uid,
        createdAt: serverTimestamp(),
      });

      // reset
      setTitle("");
      setDescription("");
      setTags("");
      setErrors({});
      alert("Question posted!");
    } catch (err) {
      console.error("Question post failed:", err);
      setErrors({ submit: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Question</h2>
      <Form onSubmit={handleSubmit} error={!!Object.keys(errors).length}>
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
          />
          {errors.description && (
            <div className="field-error">{errors.description}</div>
          )}
        </Form.Field>

        <Form.Field>
          <label className="form-label">Tags</label>
          <Input
            className="custom-input"
            placeholder="Add up to 3 comma-separated tags (e.g., React, Firebase)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            error={errors.tags ? { content: errors.tags } : null}
          />
        </Form.Field>

        <Button
          type="submit"
          className="submit-button"
          loading={saving}
          disabled={saving}
        >
          Post
        </Button>

        {!!Object.keys(errors).length && (
          <Message
            error
            header="Please fix the errors below"
            list={Object.values(errors)}
          />
        )}
      </Form>
    </div>
  );
}
