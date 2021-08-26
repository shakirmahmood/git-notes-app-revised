import { useEffect, useState } from 'react';
import { createCellData } from '../../components/Table/util/table.util';
import GistToolbar from '../../components/GistToolbar/GistToolbar';
import { fetchGists } from '../../utils/api';

export const getState = (state) => ({
  searchedText: state.searchedText,
  viewType: state.viewType,
});

export const useGists = (searchedText, page, viewType) => {
  const accessToken = localStorage.getItem('accessToken');
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchGists(
      `https://api.github.com/gists/public?per_page=9&page=${page}`,
      searchedText
    ).then((userGists) => {
      setGists(userGists);
      setLoading(false);
    });
  }, [searchedText, accessToken, page, viewType]);

  return { gists, loading };
};

export const createGistTableData = (
  gists,
  tableRowClicked,
  profilePicStyle
) => {
  return {
    headers: createGistTableHeaders(),
    body: createGistTableBody(gists, tableRowClicked, profilePicStyle),
  };
};

const createGistTableHeaders = () => {
  const headers = ['', 'Name', 'Date', 'Time', 'Description', 'Notebook Name'];
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) headers.push('');
  return headers;
};

const createGistTableBody = (gists, tableRowClicked, profilePicStyle) => {
  const accessToken = localStorage.getItem('accessToken');

  return gists.map((gist) => {
    const {
      id,
      username,
      updatedAt: { date, time },
      profilePic,
      mainFile: { filename },
      description,
    } = gist;

    const row = {
      attributes: {
        key: id,
        'data-gistid': id,
        className: 'gist',
      },
      cells: [
        createCellData(
          <img className={profilePicStyle} src={profilePic} alt="A person" />,
          'center',
          tableRowClicked
        ),
        createCellData(username, '', tableRowClicked),
        createCellData(date, '', tableRowClicked),
        createCellData(time, '', tableRowClicked),
        createCellData(description, '', tableRowClicked),
        createCellData(filename, '', tableRowClicked),
      ],
    };
    if (accessToken)
      row.cells.push(
        createCellData(<GistToolbar gistId={id} color="primary" />, 'center')
      );
    return row;
  });
};

export const isGridView = (viewType) => viewType === 'grid';
