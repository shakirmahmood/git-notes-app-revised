import 'font-awesome/css/font-awesome.min.css';
import { useHistory } from 'react-router-dom';
import api, { getOptions } from '../../utils/api';
import ForkButton from '../Toolbar/ForkButton';

export function GistForkButton(props) {
  const { gistId, color, label, forksCount } = props;
  const history = useHistory();

  const fork = () => {
    api
      .post(
        `https://api.github.com/gists/${gistId}/forks`,
        getOptions(true),
        'json'
      )
      .then((gist) => {
        history.push(`/gist-details/${gist.id}`);
      });
  };

  return (
    <ForkButton
      label={label ? 'Fork' : null}
      color={color}
      gistId={gistId}
      forksCount={forksCount}
      fork={fork}
    />
  );
}

export default ForkButton;
