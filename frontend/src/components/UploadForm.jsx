import { useState } from 'react';
import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { createPost } from '../reducers/postReducer';

const UploadForm = (props) => {
  const [images, setImages] = useState([]);
  const title = useField('text');
  const project = useField();
  const projects = ['editorial', 'advertising', 'video'];
  const dispatch = useDispatch();

  const addPost = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    for (const image of images) {
      formData.append('file', image);
    }
    formData.append('title', title.fields.value);
    formData.append('project', project.fields.value);
    dispatch(createPost(formData));
    handleReset();
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleReset = () => {
    title.reset();
    project.reset();
    setImages('');
  };

  const Select = ({ value, onChange, optionValues }) => {
    return (
      <select value={value} onChange={onChange}>
        <option>Select project</option>
        {optionValues.map((optionValue, i) => {
          return (
            <option key={`${value}-${optionValue}-${i}`} value={optionValue}>
              {optionValue}
            </option>
          );
        })}
      </select>
    );
  };

  return (
    <div>
      <h5>Upload to server</h5>

      <form onSubmit={addPost} encType="multipart/form">
        <input {...title.fields} />
        <Select {...project.fields} optionValues={projects} />
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          multiple
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadForm;
