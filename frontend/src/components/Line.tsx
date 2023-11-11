import { Line as LineModel } from "../models/line";
import Card from "react-bootstrap/Card";
import styles from '../styles/Line.module.css';
import { formatDate } from "../utils/formatDate";

interface LineProps {
  line: LineModel,
  className?: string,
}

const Line = ({line, className}: LineProps) => {

  const {
    title,
    flow,
    createdAt,
    updatedAt,
  } = line;

  let createdUpdatedText: string;
  if(updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.lineCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{line.title}</Card.Title>
        <Card.Text className={styles.cardText}>{flow}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {createdUpdatedText}
      </Card.Footer>
    </Card>
  )
}

export default Line;