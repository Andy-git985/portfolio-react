import { useForm } from 'react-hook-form';
import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { createPost } from '../reducers/postReducer';

const UploadForm = (props) => {
  // const [images, setImages] = useState([]);
  const title = useField('text');
  const project = useField();
  const projects = ['editorial', 'advertising', 'video'];
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const addPost = async (data) => {
    const formData = new FormData();
    for (const image of data.file) {
      formData.append('file', image);
    }
    formData.append('title', data.title);
    formData.append('project', data.project);
    dispatch(createPost(formData));
    console.log(formData);
  };

  // const handleFileChange = (e) => {
  //   setImages(e.target.files);
  // };

  // const handleReset = () => {
  //   title.reset();
  //   project.reset();
  //   setImages('');
  // };

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

      <form onSubmit={handleSubmit(addPost)} encType="multipart/form">
        {/* <input {...title.fields} {...register('title')} /> */}
        <input type="text" {...register('title')}></input>
        {/* <Select
          {...project.fields}
          optionValues={projects}
          {...register('project')}
        /> */}
        <select {...register('project')}>
          <option>Select project</option>
          <option value="editorial">Editorial</option>
          <option value="advertising">Advertising</option>
        </select>
        <input
          type="file"
          name="file"
          // onChange={handleFileChange}
          multiple
          {...register('file')}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadForm;
