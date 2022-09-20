import { Link } from 'react-router-dom';

export default function BreedCard(props) {
  return (
    <article>
      <Link to={`/${props.id}`}>
        <img src={props.picture} alt={props.name} />
      </Link>
      <h4>{props.name}</h4>
      <h5>{props.temperaments}</h5>
    </article>
  );
}
