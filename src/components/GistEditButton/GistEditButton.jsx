import { useHistory } from 'react-router-dom';
import EditButton from '../Toolbar/EditButton';

export default function GistEditButton(props) {
  const history = useHistory();
  const { gistId, label, color } = props;

  function editGist() {
    return () => {
      history.push(`/update-gist/${gistId}`);
    };
  }

  return (
    <EditButton
      label={label ? 'Edit' : null}
      color={color}
      gistId={gistId}
      editClicked={editGist()}
    />
  );
}
