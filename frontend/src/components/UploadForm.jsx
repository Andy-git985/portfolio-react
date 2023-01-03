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
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material/';
import { useTheme } from '@mui/material/styles';
import Preview from './Preview';
import { createPost } from '../reducers/postReducer';

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
    dispatch(createPost(formData));
  };

  const removePreview = (updatedObj) => {
    setImages(updatedObj);
  };

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('tablet'));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Upload Form
      </Button>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form">
          <DialogTitle id="responsive-dialog-title">Upload Form</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <div>
              <Button variant="contained" component="label">
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
              >
                Reset
              </Button>
            </div>
            <div>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </div>
          </DialogActions>
        </form>
        <DialogContent>
          {images.length > 0 && (
            <Preview images={images} removePreview={removePreview} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadForm;
