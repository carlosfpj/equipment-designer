import { Line as LineModel } from "../models/line";
import Card from "react-bootstrap/Card";
import styles from '../styles/Line.module.css';

interface LineProps {
  line: LineModel
}

const Line = ({line}: LineProps) => {

  const {
    title,
    flow,
    createdAt,
    updatedAt,
  } = line

  return (
    <Card className={styles.lineCard}>
      <Card.Body>
        <Card.Title>{line.title}</Card.Title>
        <Card.Text className={styles.cardText}>{flow}</Card.Text>
      </Card.Body>
    </Card>
  )
}


export default Line;