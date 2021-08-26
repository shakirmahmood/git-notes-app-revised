import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

export default function GridCard({ children, cardClicked, id }) {
  return (
    <Card onClick={cardClicked} data-gistid={id} className="gist">
      <CardActionArea>
        <CardContent>{children}</CardContent>
      </CardActionArea>
    </Card>
  );
}
