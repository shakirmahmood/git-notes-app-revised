import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import { useHistory, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import {
  createGist,
  fileDataTemplate,
  updateGist,
  useFilesData,
} from './createGist';
import { useStyles } from './styles';

export default function CreateGist() {
  const classes = useStyles();

  const history = useHistory();
  const { id } = useParams();

  const { files, setFilesData, loading } = useFilesData(id);
  const { filesData, description } = files;

  const createOrUpdateGist = () => {
    id
      ? updateGist(id, filesData, description, history)
      : createGist(filesData, description, history);
  };

  const addDescription = (event) => {
    setFilesData((filesData) => ({
      ...filesData,
      description: event.target.value,
    }));
  };

  const addFilename = (idx, event) => {
    const filesCopy = JSON.parse(JSON.stringify(files));
    filesCopy.filesData[idx].filename = event.target.value;
    setFilesData(filesCopy);
  };

  const addContent = (idx, event) => {
    const filesCopy = JSON.parse(JSON.stringify(files));
    filesCopy.filesData[idx].content = event.target.value;
    setFilesData(filesCopy);
  };

  const addFile = () => {
    const filesCopy = JSON.parse(JSON.stringify(files));
    filesCopy.filesData.push(fileDataTemplate);
    setFilesData(filesCopy);
  };

  if (loading) return <Spinner />;

  return (
    <div className={classes.createGistCont}>
      <form className={classes.form}>
        <TextField
          value={description}
          placeholder="Enter gist description..."
          variant="outlined"
          onChange={addDescription}
        />
        {filesData.map((fileData, idx) => {
          const { filename, content } = fileData;
          return (
            <>
              <TextField
                key={`${idx}-filename`}
                value={filename}
                placeholder="Enter file name..."
                variant="outlined"
                onChange={(e) => addFilename(idx, e)}
              />
              <TextareaAutosize
                key={`${filename}-${idx}-content`}
                value={content}
                minRows={10}
                maxRows={10}
                aria-label="file content"
                placeholder="Enter file content..."
                onChange={(e) => addContent(idx, e)}
                className={classes.fileContent}
              />
            </>
          );
        })}
        <Button
          onClick={addFile}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Add File
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={createOrUpdateGist}
        >
          {id ? 'Update' : 'Create'} Gist
        </Button>
      </form>
    </div>
  );
}
