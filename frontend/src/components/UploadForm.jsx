import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Select,
  Button,
} from '@mui/material/';
import Preview from './Preview';
import { createPost } from '../reducers/postReducer';

const UploadForm = () => {
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
      project: '',
      file: undefined,
    },
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ title: '', project: '', file: undefined });
    }
  }, [formState, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const image of data.file) {
      formData.append('file', image);
    }
    formData.append('title', data.title);
    formData.append('project', data.project);
    setImages([]);
    console.log(formData);
    // dispatch(createPost(formData));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form">
        <div>
          <TextField
            label="Title"
            variant="outlined"
            {...register('title')}
            style={{ width: '150px', margin: '5px' }}
          />
        </div>
        <div>
          <Controller
            name="project"
            render={({ field }) => (
              <>
                <FormControl style={{ width: '150px', margin: '5px' }}>
                  <InputLabel>Project</InputLabel>
                  <Select {...field} label="project">
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
          <Button
            variant="contained"
            component="label"
            style={{ width: '150px', margin: '5px' }}
          >
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
                  const preview = URL.createObjectURL(file);
                  arr.push(preview);
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
            style={{ width: '150px', margin: '5px' }}
          >
            Reset
          </Button>
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            style={{ width: '150px', margin: '5px' }}
          >
            Submit
          </Button>
        </div>
      </form>
      {images.length > 0 && <Preview images={images} />}
    </>
  );
};

export default UploadForm;
