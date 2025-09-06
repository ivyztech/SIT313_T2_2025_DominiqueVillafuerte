import React from 'react';
import './UnifiedForm.css'; // Importing the unified CSS file

const PostTypeSelector = ({ selectedType, setSelectedType }) => {
  return (
    <div className="post-type-container">
      <span className="post-type-label">Select Post Type:</span>
      <div className="post-type-option">
        <input
          type="radio"
          id="question"
          name="postType"
          value="question"
          checked={selectedType === 'question'}
          onChange={() => setSelectedType('question')}
        />
        <label htmlFor="question">Question</label>
      </div>
      <div className="post-type-option">
        <input
          type="radio"
          id="article"
          name="postType"
          value="article"
          checked={selectedType === 'article'}
          onChange={() => setSelectedType('article')}
        />
        <label htmlFor="article">Article</label>
      </div>
    </div>
  );
};

export default PostTypeSelector;
