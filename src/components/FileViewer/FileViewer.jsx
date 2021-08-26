import CodeIcon from '@material-ui/icons/Code';
import { addIndex, map } from 'ramda';
import Spinner from '../Spinner/Spinner';
import { useFilesData } from './fileView';
import useStyles from './styles';

const createRows = (fileData) => {
  if (fileData) {
    const fileContentArray = fileData ? fileData.split('\n') : fileData;
    const mapIndexed = addIndex(map);
    return mapIndexed((line, index) => {
      return (
        <tr key={`fileline-${index}`}>
          <td>{index + 1}</td>
          <td>{line}</td>
        </tr>
      );
    }, fileContentArray);
  }
};

export default function FileViewer(props) {
  const { fileUrl, filename, fileViewerClass } = props;
  const { fileData, loading } = useFilesData(fileUrl);

  const rows = createRows(fileData);
  const classes = useStyles();

  if (loading) return <Spinner />;

  return (
    <div className={`${classes.fileCont} ${fileViewerClass}`}>
      {filename && (
        <div className={classes.fileHeader}>
          <CodeIcon className={`${classes.codeIcon} font-size-10`} />
          {filename}
        </div>
      )}
      <table className={'font-size-15'}>
        <colgroup>
          <col style={{ width: 80 }} />
          <col />
        </colgroup>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
