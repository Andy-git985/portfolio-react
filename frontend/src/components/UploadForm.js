import { useState } from 'react';
import { useField } from '../hooks';

const UploadForm = ({ createPost }) => {
  const [image, setImage] = useState('');
  const title = useField('text');

  const addPost = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('file', image);
    formData.append('title', title.fields.value);
    console.log(formData);
    createPost(formData);
    title.reset();
    setImage('');
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <h5>Upload to server</h5>

      <form onSubmit={addPost} encType="multipart/form">
        <input {...title.fields} />
        <input type="file" name="file" onChange={handleFileChange}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadForm;
