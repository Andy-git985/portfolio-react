import {
  Autocomplete,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Select,
  Button,
} from '@mui/material/';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { updatePost, removePost } from '../reducers/postReducer';

const fieldStyle = { width: '150px', margin: '5px' };

const AdminButtons = ({ image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projects = useSelector(({ posts }) => posts).reduce((acc, curr) => {
    if (!acc.includes(curr.project)) {
      return [...acc, curr.project];
    }
    return acc;
  }, []);

  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      title: image.title,
      type: image.type,
      project: image.project,
    },
  });

  const update = (data) => {
    dispatch(updatePost(image.id, data));
  };

  const remove = () => {
    dispatch(removePost(image.id));
    navigate('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(update)}>
        <div>
          <TextField {...register('title')} style={fieldStyle}></TextField>
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
          <Button variant="contained" type="submit">
            Update
          </Button>
        </div>
      </form>
      <Button variant="contained" onClick={remove}>
        Delete
      </Button>
    </div>
  );
};
export default AdminButtons;
