import React, { useState } from "react";
import { Form, TextArea, Input, Button, Message, Image } from "semantic-ui-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { useAuth } from "../auth/AuthContext";
import "./UnifiedForm.css";

export default function ArticleForm() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleText, setArticleText] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const { user } = useAuth();

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!abstract.trim()) e.abstract = "Abstract is required";
    if (!articleText.trim()) e.articleText = "Article text is required";
    if (!tags.trim()) e.tags = "At least one tag is required";
    return e;
  };

  const onPickFile = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    setPreview(f ? URL.createObjectURL(f) : "");
  };

  const uploadImageIfAny = async () => {
    if (!file || !user) return null;
    const path = `posts/${user.uid}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    if (!user) return setErrors({ auth: "You must be logged in." });

    setSaving(true);
    try {
      const imageUrl = await uploadImageIfAny();

      await addDoc(collection(db, "posts"), {
        type: "article",
        title: title.trim(),
        abstract: abstract.trim(),
        content: articleText.trim(),
        tags: tags.split(",").map(t => t.trim()).filter(Boolean).slice(0, 3),
        imageUrl: imageUrl || null,
        authorUid: user.uid,
        createdAt: serverTimestamp(),
      });

      // reset
      setTitle(""); setAbstract(""); setArticleText(""); setTags("");
      setFile(null); setPreview(""); setErrors({});
      alert("Article posted!");
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Article</h2>
      <Form>
        <Form.Field>
          <label className="form-label">Title</label>
          <Input className="custom-input" value={title} onChange={e=>setTitle(e.target.value)}
                 placeholder="Enter a descriptive title"
                 error={errors.title ? { content: errors.title } : null} />
        </Form.Field>

        {/* Image picker + upload */}
        <Form.Field>
          <label className="form-label">Add an image</label>
          <Input type="file" accept="image/*" onChange={onPickFile} />
          {preview && (
            <div style={{ marginTop: 10 }}>
              <Image src={preview} size="small" bordered />
            </div>
          )}
        </Form.Field>

        <Form.Field>
          <label className="form-label">Abstract</label>
          <TextArea className="custom-textarea" value={abstract} onChange={e=>setAbstract(e.target.value)}
                    placeholder="Enter a 1-paragraph abstract" />
          {errors.abstract && <div className="field-error">{errors.abstract}</div>}
        </Form.Field>

        <Form.Field>
          <label className="form-label">Article Text</label>
          <TextArea className="custom-textarea" value={articleText} onChange={e=>setArticleText(e.target.value)}
                    placeholder="Enter the main content of your article" />
          {errors.articleText && <div className="field-error">{errors.articleText}</div>}
        </Form.Field>

        <Form.Field>
          <label className="form-label">Tags</label>
          <Input className="custom-input" value={tags} onChange={e=>setTags(e.target.value)}
                 placeholder="Add up to 3 comma-separated tags (e.g., React, Firebase)"
                 error={errors.tags ? { content: errors.tags } : null} />
        </Form.Field>

        <Button type="button" className="submit-button" loading={saving} onClick={handleSubmit}>
          Post
        </Button>

        {!!Object.keys(errors).length && (
          <Message error header="Please fix the errors below" list={Object.values(errors)} />
        )}
      </Form>
    </div>
  );
}
