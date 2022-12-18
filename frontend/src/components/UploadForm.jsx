import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Select,
  Button,
} from '@mui/material/';
// import CheckIcon from '@mui/icons-material/Check';
import Preview from './Preview';
import { createPost } from '../reducers/postReducer';
import posts from '../services/posts';

const fieldStyle = { width: '150px', margin: '5px' };

const UploadForm = () => {
  const projects = useSelector(({ posts }) => posts).reduce((acc, curr) => {
    if (!acc.includes(curr.project)) {
      return [...acc, curr.project];
    }
    return acc;
  }, []);
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      title: '',
      type: '',
      project: '',
      file: undefined,
    },
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ title: '', type: '', project: '', file: undefined });
    }
  }, [formState, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const image of images) {
      formData.append('file', image.data);
    }
    formData.append('title', data.title);
    formData.append('type', data.type);
    formData.append('project', data.project);
    setImages([]);
    console.log(formData);
    // dispatch(createPost(formData));
  };

  const removePreview = (updatedObj) => {
    setImages(updatedObj);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form">
        <div>
          <TextField
            label="Title"
            variant="outlined"
            {...register('title')}
            style={fieldStyle}
          />
        </div>
        <div>
          <Controller
            name="type"
            render={({ field }) => (
              <>
                <FormControl style={fieldStyle}>
                  <InputLabel>Type</InputLabel>
                  <Select {...field} label="type">
                    <MenuItem value="editorial">Editorial</MenuItem>
                    <MenuItem value="advertising">Advertising</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
            control={control}
            defaultValue=""
          />
        </div>
        <div>
          <Controller
            control={control}
            name="project"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                freeSolo
                options={projects}
                onChange={(event, values) => onChange(values)}
                value={value}
                renderInput={(params) => (
                  <TextField
                    style={fieldStyle}
                    {...params}
                    label="Project"
                    variant="outlined"
                    onChange={onChange}
                  />
                )}
              />
            )}
          />
        </div>
        <div>
          <Button variant="contained" component="label" style={fieldStyle}>
            Upload File
            <input
              type="file"
              hidden
              multiple
              {...register('file')}
              onChange={(event) => {
                setImages([]);
                let arr = [];
                for (const file of event.target.files) {
                  const img = {
                    preview: URL.createObjectURL(file),
                    data: file,
                  };
                  arr.push(img);
                }
                setImages(arr);
                register('file').onChange(event);
              }}
            />
          </Button>
        </div>
        <div>
          <Button
            type="button"
            onClick={() => {
              reset();
              setImages([]);
            }}
            variant="contained"
            style={fieldStyle}
          >
            Reset
          </Button>
        </div>
        <div>
          <Button type="submit" variant="contained" style={fieldStyle}>
            Submit
          </Button>
        </div>
      </form>
      {images.length > 0 && (
        <Preview images={images} removePreview={removePreview} />
      )}
      {/* <CheckIcon /> */}
    </>
  );
};

export default UploadForm;
