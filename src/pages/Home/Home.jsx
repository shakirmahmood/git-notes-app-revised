import GridOnIcon from '@material-ui/icons/GridOn';
import ListIcon from '@material-ui/icons/List';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Grid from '../../components/Grid/Grid';
import { NoResultsFound } from '../../components/NoResultsFound/NoResultsFound';
import Pagination from '../../components/Pagination/Pagination';
import Spinner from '../../components/Spinner/Spinner';
import CustomTable from '../../components/Table/CustomTable';
import { changeView } from '../../redux/actionCreator';
import { createGistTableData, getState, isGridView, useGists } from './home';
import { useStyles } from './styles';

function Home() {
  const classes = useStyles();
  const history = useHistory();
  const { searchedText, viewType } = useSelector(getState);
  const dispatch = useDispatch();
  const { page } = useParams();
  const { loading, gists } = useGists(searchedText, page, viewType);

  const changePage = (pageNo) => {
    history.push(`/gists/${pageNo}`);
  };

  const switchView = (type) => {
    return () => dispatch(changeView(type));
  };

  const gistItemClicked = (event) => {
    const gistid = event.target.closest('.gist').getAttribute('data-gistid');
    history.push(`/gist-details/${gistid}`);
  };

  const tableData = createGistTableData(
    gists,
    gistItemClicked,
    classes.profilePic
  );

  if (loading) return <Spinner />;

  if (!gists.length) return <NoResultsFound />;

  return (
    <div className={classes.gistsCont}>
      <div className={classes.viewChangeBtns}>
        <GridOnIcon
          className={`${classes.viewChangeBtn}  ${classes.gridBtn} ${
            isGridView(viewType) && classes.selectedView
          }`}
          onClick={switchView('grid')}
        />
        <ListIcon
          className={`${classes.viewChangeBtn} ${
            !isGridView(viewType) && classes.selectedView
          }`}
          onClick={switchView('list')}
        />
      </div>
      {isGridView(viewType) && (
        <Grid gists={gists} cardClicked={gistItemClicked} />
      )}
      {!isGridView(viewType) && <CustomTable tableData={tableData} />}
      {gists.length >= 9 && (
        <Pagination
          pageNo={parseInt(page)}
          changePage={changePage}
          pageSize={9}
        />
      )}
    </div>
  );
}

export default Home;
