import { useState } from 'react';
import { useField } from '../hooks';

const UploadForm = ({ createPost }) => {
  const [image, setImage] = useState('');
  const title = useField('text');
  const project = useField();
  const projects = ['editorial', 'advertising', 'video'];

  const addPost = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('file', image);
    formData.append('title', title.fields.value);
    formData.append('project', project.fields.value);
    console.log(formData);
    createPost(formData);
    handleReset();
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleReset = () => {
    title.reset();
    project.reset();
    setImage('');
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
        <input type="file" name="file" onChange={handleFileChange}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadForm;
